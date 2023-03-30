import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyPluginCallback } from "fastify";
import TaskModel, { TaskDocument } from "../database/schemas/task";
import UserModel, { UserDocument } from "../database/schemas/user";

interface Models {
  TaskModel: mongoose.Model<TaskDocument>;
  UserModel: mongoose.Model<UserDocument>;
}

interface Options {
  uri: string;
}

const ConnectDB: FastifyPluginCallback<Options> = async (
  fastify
): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      fastify.log.info({ actor: "MongoDB" }, "connected");
    });
    mongoose.connection.on("disconnected", () => {
      fastify.log.error({ actor: "MongoDB" }, "disconnected");
    });
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    fastify.decorate("db", {
      models: { TaskModel, UserModel },
      connection: db.connection,
    });
  } catch (error) {
    console.error(error);
  }
};

export default fp(ConnectDB);

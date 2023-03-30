import mongoose, { Schema, Model } from "mongoose";

export type TaskDocument = {
  title: string;
  description: string | null;
  image: string | null;
  deadline: Date | null;
  userId: string;
};

type TaskModel = Model<TaskDocument>;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    deadline: {
      type: Date,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TaskDocument, TaskModel>("Tasks", TaskSchema);

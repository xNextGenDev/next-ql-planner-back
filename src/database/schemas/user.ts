import mongoose, { Schema, Model } from "mongoose";

export type UserDocument = {
  name: string;
};

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserDocument, UserModel>("Users", UserSchema);

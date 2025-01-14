import mongoose, { Schema } from "mongoose";

const snippetSchema = new Schema(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
    code: [
      {
        title: { type: String, required: true },
        lastmodified: { type: String, required: true },
        codeSection: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Snippet =
  mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

export default Snippet;

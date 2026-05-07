import mongoose from "mongoose";

const demoRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["email", "phone"],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    service: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DemoRequest = mongoose.model(
  "DemoRequest",
  demoRequestSchema
);

export default DemoRequest;
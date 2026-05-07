import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
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

    subject: {
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
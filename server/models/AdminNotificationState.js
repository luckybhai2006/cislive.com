import mongoose from "mongoose";

const AdminNotificationStateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    version: { type: Number, default: 1 },
    notifications: { type: Array, default: [] },
    seenContactIds: { type: [String], default: [] },
    seenDemoIds: { type: [String], default: [] },
    deletedNotifIds: { type: [String], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

export default mongoose.model(
  "AdminNotificationState",
  AdminNotificationStateSchema
);


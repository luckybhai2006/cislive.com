import mongoose from "mongoose";

const AdminNotificationStateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    version: { type: Number, default: 1 },
    notifications: { type: Array, default: [] },

    // 🆕 NEW — Per-device seen tracking (instead of global seenContactIds/seenDemoIds)
    deviceStates: {
      type: Map,
      of: new mongoose.Schema(
        {
          seenContactIds: { type: [String], default: [] },
          seenDemoIds: { type: [String], default: [] },
          lastReadAt: { type: Date, default: Date.now },
        },
        { _id: false }
      ),
      default: {},
    },

    // 🆕 NEW — Per-device deleted notifications (for sync)
    deletedNotifs: [
      {
        notifId: { type: String, required: true },
        deviceId: { type: String, required: true },
        deletedAt: { type: Date, default: Date.now },
      },
    ],

    // 🆕 NEW — Global deleted IDs (backward compatible)
    deletedNotifIds: { type: [String], default: [] },

    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

// 🆕 Index for fast device lookup
AdminNotificationStateSchema.index({ "deviceStates.$**": 1 });
AdminNotificationStateSchema.index({
  "deletedNotifs.notifId": 1,
  "deletedNotifs.deviceId": 1,
});

export default mongoose.model(
  "AdminNotificationState",
  AdminNotificationStateSchema
);

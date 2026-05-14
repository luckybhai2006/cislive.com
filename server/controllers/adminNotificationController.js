import AdminNotificationState from "../models/AdminNotificationState.js";

const DEFAULT_KEY = "default";

const normalizeStringArray = (value) =>
  Array.isArray(value) ? value.filter((v) => typeof v === "string" && v) : [];

// 🆕 NEW — Helper to get or create device state
// const getDeviceState = (doc, deviceId) => {
//   if (!doc.deviceStates) doc.deviceStates = new Map();
//   if (!doc.deviceStates.has(deviceId)) {
//     doc.deviceStates.set(deviceId, {
//       seenContactIds: [],
//       seenDemoIds: [],
//       lastReadAt: new Date(),
//     });
//   }
//   return doc.deviceStates.get(deviceId);
// };

export const getAdminNotificationState = async (req, res) => {
  try {
    const { deviceId } = req.query; // 🆕 Accept deviceId from query

    const doc = await AdminNotificationState.findOne({
      key: DEFAULT_KEY,
    }).lean();
    if (!doc) {
      return res.status(200).json({
        key: DEFAULT_KEY,
        version: 1,
        notifications: [],
        seenContactIds: [],
        seenDemoIds: [],
        deletedNotifIds: [],
        deviceStates: {},
        deletedNotifs: [],
        updatedAt: null,
      });
    }

    // 🆕 If deviceId provided, return per-device state
    if (deviceId && doc.deviceStates && doc.deviceStates[deviceId]) {
      const deviceState = doc.deviceStates[deviceId];
      return res.status(200).json({
        ...doc,
        seenContactIds: deviceState.seenContactIds || [],
        seenDemoIds: deviceState.seenDemoIds || [],
      });
    }

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putAdminNotificationState = async (req, res) => {
  try {
    const body = req.body || {};
    const { deviceId } = body; // 🆕 Accept deviceId from body

    // 🆕 Build update object dynamically
    const updateOps = {
      $set: {
        key: DEFAULT_KEY,
        version: typeof body.version === "number" ? body.version : 1,
        notifications: Array.isArray(body.notifications)
          ? body.notifications
          : [],
        deletedNotifIds: normalizeStringArray(body.deletedNotifIds),
        updatedAt: new Date(),
      },
    };

    // 🆕 If deviceId provided, update per-device state instead of global
    if (deviceId) {
      const seenContactIds = normalizeStringArray(body.seenContactIds);
      const seenDemoIds = normalizeStringArray(body.seenDemoIds);

      if (seenContactIds.length > 0 || seenDemoIds.length > 0) {
        updateOps.$set[`deviceStates.${deviceId}`] = {
          seenContactIds,
          seenDemoIds,
          lastReadAt: new Date(),
        };
      }

      // Remove global seen IDs from $set to prevent overwrite
      delete updateOps.$set.seenContactIds;
      delete updateOps.$set.seenDemoIds;
    } else {
      // Fallback: global state (backward compatible)
      updateOps.$set.seenContactIds = normalizeStringArray(body.seenContactIds);
      updateOps.$set.seenDemoIds = normalizeStringArray(body.seenDemoIds);
    }

    // 🆕 Handle batch deleted notifications
    if (body.deletedNotifs && Array.isArray(body.deletedNotifs)) {
      updateOps.$addToSet = {
        deletedNotifs: { $each: body.deletedNotifs },
      };
    }

    const doc = await AdminNotificationState.findOneAndUpdate(
      { key: DEFAULT_KEY },
      updateOps,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🆕 NEW — Batch clear all notifications
export const clearAllNotifications = async (req, res) => {
  try {
    const { deviceId, ids } = req.body;

    if (!deviceId || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "deviceId and ids array required",
      });
    }

    const deletedDocs = ids.map((id) => ({
      notifId: id,
      deviceId,
      deletedAt: new Date(),
    }));

    const doc = await AdminNotificationState.findOneAndUpdate(
      { key: DEFAULT_KEY },
      {
        $addToSet: {
          deletedNotifs: { $each: deletedDocs },
          deletedNotifIds: { $each: ids },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true, new: true }
    ).lean();

    res.status(200).json({
      success: true,
      cleared: ids.length,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({ success: true }); // Already deleted
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🆕 NEW — Mark all as read
export const markAllRead = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "deviceId required",
      });
    }

    await AdminNotificationState.findOneAndUpdate(
      { key: DEFAULT_KEY },
      {
        $set: {
          [`deviceStates.${deviceId}.lastReadAt`]: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import AdminNotificationState from "../models/AdminNotificationState.js";

const DEFAULT_KEY = "default";

const normalizeStringArray = (value) =>
  Array.isArray(value) ? value.filter((v) => typeof v === "string" && v) : [];

export const getAdminNotificationState = async (req, res) => {
  try {
    const doc = await AdminNotificationState.findOne({ key: DEFAULT_KEY }).lean();
    if (!doc) {
      return res.status(200).json({
        key: DEFAULT_KEY,
        version: 1,
        notifications: [],
        seenContactIds: [],
        seenDemoIds: [],
        deletedNotifIds: [],
        updatedAt: null,
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

    const payload = {
      key: DEFAULT_KEY,
      version: typeof body.version === "number" ? body.version : 1,
      notifications: Array.isArray(body.notifications) ? body.notifications : [],
      seenContactIds: normalizeStringArray(body.seenContactIds),
      seenDemoIds: normalizeStringArray(body.seenDemoIds),
      deletedNotifIds: normalizeStringArray(body.deletedNotifIds),
      updatedAt: new Date(),
    };

    const doc = await AdminNotificationState.findOneAndUpdate(
      { key: DEFAULT_KEY },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


import DemoRequest from "../models/DemoRequest.js";

export const createDemoRequest = async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      service,
      message,
    } = req.body;

    if (!name || !service) {
      return res.status(400).json({
        success: false,
        message: "Name and service are required",
      });
    }

    if (type === "email" && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (type === "phone" && !phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    const demo = await DemoRequest.create({
      type,
      name,
      email,
      phone,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Demo request submitted",
      data: demo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllDemos = async (req, res) => {
  try {
    const demoRequests = await DemoRequest.find().sort({ createdAt: -1 });
    res.status(200).json(demoRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/demoController.js

// DELETE - Delete demo request by ID
export const deletedDemo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDemo = await DemoRequest.findByIdAndDelete(id);
    
    if (!deletedDemo) {
      return res.status(404).json({ error: "Demo request not found" });
    }
    
    res.status(200).json({ message: "Demo request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

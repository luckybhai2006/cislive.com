import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { type, name, email, phone, subject, message } = req.body;
    console.log(req.body);
    if (!name || !subject) {
      return res.status(400).json({
        success: false,
        message: "Name and subject are required",
      });
    }

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required",
      });
    }

    const contact = await Contact.create({
      type,
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

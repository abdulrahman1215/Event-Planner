const Event = require("../models/Event");
const generateShareLinks = require("../utils/shareLinks");

//  Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, location, category } = req.body;

    const event = new Event({
      name,
      description,
      date,
      time,
      location,
      category,
      image: req.file ? req.file.filename : "",
      organizer: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get Single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Update Event (Only Organizer)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this event" });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Delete Event (Only Organizer)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  RSVP to Event
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userId = req.user.id;

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "You have already RSVP'd" });
    }

    event.attendees.push(userId);
    await event.save();

    res.json({ message: "RSVP successful", event });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Cancel RSVP
exports.cancelRSVP = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userId = req.user.id;
    event.attendees = event.attendees.filter((id) => id.toString() !== userId);
    await event.save();

    res.json({ message: "RSVP canceled", event });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get Attendees of an Event
exports.getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("attendees", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event.attendees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get Events with Filters
exports.getAllEvents = async (req, res) => {
  try {
    let { date, category, location } = req.query;
    let filter = {};

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const events = await Event.find(filter).populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get Event Details with Share Links
exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const shareLinks = generateShareLinks(event._id, event.name);

    res.json({ event, shareLinks });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ **Add this part at the end**
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRSVP,
  getEventAttendees,
  getEventDetails,
};

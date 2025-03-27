const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRSVP,
  getEventAttendees,
  getEventDetails,
} = require("../controllers/eventController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", getEventById);


router.post("/", authMiddleware, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventDetails);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

router.post("/:id/rsvp", authMiddleware, rsvpEvent);
router.post("/:id/cancel-rsvp", authMiddleware, cancelRSVP);
router.get("/:id/attendees", authMiddleware, getEventAttendees);



module.exports = router;

const cron = require("node-cron");
const sendEmail = require("./emailService");
const Event = require("../models/Event");
const User = require("../models/User");

//  Schedule daily reminders at 8 AM
cron.schedule("0 8 * * *", async () => {
  try {
    console.log(" Running Event Reminder Job...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Find events happening tomorrow
    const events = await Event.find({ date: { $gte: today, $lt: tomorrow } }).populate("attendees", "email name");

    for (const event of events) {
      for (const attendee of event.attendees) {
        const emailText = `Hi ${attendee.name},\n\nReminder: You have an event tomorrow!\n\nEvent: ${event.name}\nDate: ${event.date}\nLocation: ${event.location}\n\nSee you there!`;

        await sendEmail(attendee.email, " Event Reminder", emailText);
      }
    }
  } catch (error) {
    console.error(" Error in Reminder Job:", error);
  }
});

console.log(" Reminder job scheduled.");

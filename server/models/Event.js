const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
},
  date: { 
    type: Date, 
    required: true 
},
  time: { 
    type: String, 
    required: true 
},
  location: { 
    type: String, 
    required: true 
},
  image: { 
    type: 
    String 
},
  category: { 
    type: String, 
    enum: ["personal", "professional", "recreational"], 
    required: true 
},
  organizer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);

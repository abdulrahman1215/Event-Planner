import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to create an event.");
      return;
    }

    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key]);
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      alert("Failed to create event!");
    }
    setLoading(false);
  };

  return (
  
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Create an Event</h2>
      <form className="bg-white shadow-md rounded p-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="w-full p-2 border mb-4"
          value={eventData.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border mb-4"
          value={eventData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          className="w-full p-2 border mb-4"
          value={eventData.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border mb-4"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border mb-4"
          value={eventData.description}
          onChange={handleChange}
          required
        />
        <input type="file" className="w-full p-2 border mb-4" onChange={handleFileChange} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

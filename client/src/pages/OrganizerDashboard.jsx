import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userEvents = res.data.filter(event => event.organizer === user._id);
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [token, user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event._id} className="border p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">📅 {event.date} at {event.time}</p>
              <p className="text-gray-600">📍 {event.location}</p>
              <Link
                to={`/events/${event._id}`}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You haven't created any events yet.</p>
      )}
    </div>
  );
};

export default OrganizerDashboard;

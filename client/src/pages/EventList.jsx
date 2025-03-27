import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by event name..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events
          .filter((event) =>
            event.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((event) => (
            <div key={event._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={event.image || "https://via.placeholder.com/400"}
                alt={event.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-2">{event.name}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
              
              {/* View Details Link */}
              <Link 
                to={`/events/${event._id}`} 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center block"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventsList;

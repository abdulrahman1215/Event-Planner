import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const baseUrl = "http://localhost:5173";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
        setAttendees(res.data.attendees || []);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    if (!token) {
      alert("Please log in to RSVP.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/events/${id}/rsvp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("RSVP Successful!");
      setIsRSVPed(true);
      setAttendees([...attendees, {username: user.username, email: user.email }]);
    } catch (error) {
      alert("RSVP failed!");
    }
  };

  if (!event) return <p className="text-center text-gray-600">Loading...</p>;

  const eventUrl = `${baseUrl}/events/${id}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=Check out this event: ${event.name}&url=${eventUrl}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${eventUrl}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${eventUrl}`;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
      <img
        src={event.image || "https://via.placeholder.com/400"}
        alt={event.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <p className="text-gray-700 mt-4">{event.description}</p>
      <p className="text-gray-600 mt-2">📍 {event.location}</p>
      <p className="text-gray-600">📅 {event.date} at {event.time}</p>

       {/* Social Sharing Buttons */}
       <div className="mt-6 flex space-x-4">
        <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white px-4 py-2 rounded">
          Share on Twitter
        </a>
        <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded">
          Share on Facebook
        </a>
        <a href={linkedinShare} target="_blank" rel="noopener noreferrer" className="bg-blue-800 text-white px-4 py-2 rounded">
          Share on LinkedIn
        </a>
        </div>



      <button
        className={`mt-4 px-4 py-2 rounded ${
          isRSVPed ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
        } text-white`}
        onClick={handleRSVP}
        disabled={isRSVPed}
      >
        {isRSVPed ? "RSVPed" : "RSVP Now"}
      </button>
      
      {/* show RSVP List if User is Organizer */}
      {user && user._id ===event.organizer &&(
        <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">RSVP List</h3>
        <ul className="border p-4 rounded bg-gray-100">
          {attendees.length > 0 ? (
            attendees.map((attendee, index) => (
              <li key={index} className="border-b py-2">
                {attendee.username} ({attendee.email})
              </li>
              ))
            ) : (
              <p>No RSVPs yet.</p>
              )}
            </ul>
          </div>
        )}
    </div>
  );
};

export default EventDetails;

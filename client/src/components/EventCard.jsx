const EventCard = ({ event }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center">
        <img
          src={event.image || "https://via.placeholder.com/150"}
          alt={event.name}
          className="w-full sm:w-1/3 h-40 object-cover rounded-lg"
        />
        <div className="sm:ml-4 w-full">
          <h3 className="text-xl font-bold">{event.name}</h3>
          <p className="text-gray-600">{event.date} at {event.time}</p>
          <p className="text-gray-700">{event.location}</p>
        </div>
      </div>
    );
  };
  
  export default EventCard;
  
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Update navbar when login status changes
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Event Planner</Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/events" className="hover:text-gray-300">Events</Link></li>

          {loggedIn ? (
            <>
              <li><Link to="/create-event" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create Event</Link></li>
              <li><Link to="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Dashboard</Link></li>
              <li><Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-gray-900 p-4 space-y-2">
          <li><Link to="/" className="block py-2 text-white" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/events" className="block py-2 text-white" onClick={() => setIsOpen(false)}>Events</Link></li>

          {loggedIn ? (
            <>
              <li><Link to="/create-event" className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setIsOpen(false)}>Create Event</Link></li>
              <li><Link to="/dashboard" className="block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
              <li><Link to="/profile" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setIsOpen(false)}>Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="block py-2 text-white" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="block py-2 text-white" onClick={() => setIsOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

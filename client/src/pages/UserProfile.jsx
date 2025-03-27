import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setEmailNotifications(res.data.emailNotifications);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, [token]);

  const handleToggleNotifications = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/notifications",
        { emailNotifications: !emailNotifications },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmailNotifications(res.data.emailNotifications);
      alert("Notification preferences updated!");
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  if (!user) return <p className="text-center text-gray-600">Loading profile...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>
      <p className="text-gray-700">👤 {user.username}</p>
      <p className="text-gray-700">📧 {user.email}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Email Notifications</h3>
        <p className="text-gray-600">Receive email reminders for events.</p>
        <button
          className={`mt-2 px-4 py-2 rounded ${
            emailNotifications ? "bg-green-500" : "bg-gray-500"
          } text-white`}
          onClick={handleToggleNotifications}
        >
          {emailNotifications ? "Enabled" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

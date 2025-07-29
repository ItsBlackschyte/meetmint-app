import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch user details
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/api/users/me", {
        withCredentials: true, // if using cookies for auth
      });

      if (res.data.success) {
        console.log("User Info:", res.data.data);
        setUser(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

const fetchRegisteredEvents = async () => {
  try {

    const ress = await axios.get("/api/users/me", {
        withCredentials: true, // if using cookies for auth
      });
    
    const email = ress.data.data.email ;

    if (!email) {
      console.warn("Email not found in user cookie.");
      return;
    }

    const res = await axios.get(`/api/ticket/email/${email}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      console.log("Registered Events:", res.data.data);
      setRegisteredEvents(res.data.data);
    } else {
      console.warn("No registered events found.");
    }
  } catch (err) {
    console.error("Failed to fetch registered events:", err);
  }
};


  // Fetch events created by organizer
  const fetchCreatedEvents = async () => {
    try {
      const res = await axios.get("/api/organizer/events", {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("Created Events:", res.data.data);
        setCreatedEvents(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch created events:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRegisteredEvents();
      if (user.organiser) {
        fetchCreatedEvents();
      }
    }
  }, [user]);

  const handleDeleteEvent = async (eventId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this event?")) return;

      const res = await axios.delete(`/api/organizer/events/${eventId}`, {
        withCredentials: true,
      });

      console.log("Event deleted:", res.data);
      fetchCreatedEvents(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const handleEditEvent = (event) => {
    console.log("Edit Event:", event);
    // Navigate to your edit form with event ID
    navigate(`/edit-event/${event.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Could not fetch user data.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="text-center mb-6">
        <img
          src={user.profilePhotoUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-green-500 mt-1">{user.organiser ? "Organizer" : "User"}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Events You've Registered For</h3>
        {registeredEvents.length > 0 ? (
          registeredEvents.map(event => (
            <div key={event.id} className="border p-4 rounded mb-3">
              <h4 className="font-bold">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No registered events.</p>
        )}
      </div>

      {user.organiser && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Events You Created</h3>
            <button
              onClick={() => navigate("/create-event")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create New Event
            </button>
          </div>
          {createdEvents.length > 0 ? (
            createdEvents.map(event => (
              <div key={event.id} className="border p-4 rounded mb-3">
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="text-blue-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events created yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

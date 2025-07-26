import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fallbackEvents = {
    1: {
      id: 1,
      title: "Music Concert",
      location: "Mumbai",
      date: "2025-08-01",
      price: 500,
      description: "An exciting night of live music with top artists. Enjoy energetic performances, amazing lighting, and a great crowd.",
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 100,
      ticketsAvailable: 100,
    },
    2: {
      id: 2,
      title: "Art Workshop",
      location: "Delhi",
      date: "2025-08-15",
      price: 300,
      description: "Learn painting techniques from expert artists in this hands-on workshop. All skill levels welcome.",
      image: "https://via.placeholder.com/600x300?text=Art+Workshop",
      totalTickets: 50,
      ticketsAvailable: 50,
    },
    3: {
      id: 3,
      title: "Tech Conference",
      location: "Bangalore",
      date: "2025-09-10",
      price: 1000,
      description: "Explore cutting-edge technology trends, keynote talks, and networking with industry leaders.",
      image: "https://via.placeholder.com/600x300?text=Tech+Conference",
      totalTickets: 200,
      ticketsAvailable: 200,
    },
  };

  const event = fallbackEvents[id] || {
    id,
    title: `Event ${id}`,
    location: "Unknown",
    date: "TBD",
    price: 0,
    description: "Event details not found.",
    image: "https://via.placeholder.com/600x300?text=Event+Not+Found",
    totalTickets: 0,
    ticketsAvailable: 0,
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/600x300?text=No+Image+Available";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="h-[400px] rounded-xl overflow-hidden shadow-md">
            <img
              src={event.image}
              alt={event.title}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">About the Event</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/3 h-[400px] flex flex-col justify-between bg-white shadow-md rounded-xl p-6">
          <div className="space-y-2 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">📍 Location:</span> {event.location}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">📅 Date:</span> {event.date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">💰 Price:</span> ₹{event.price}
            </p>
            <p className={`font-semibold ${event.ticketsAvailable > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {event.ticketsAvailable > 0
                ? `🎟️ ${event.ticketsAvailable} of ${event.totalTickets} Tickets Available`
                : '❌ Tickets Sold Out'}
            </p>
          </div>

          <Link
            to={event.ticketsAvailable > 0 ? `/book/${event.id}` : "#"}
            className={`px-6 py-3 text-center rounded-lg transition 
              ${event.ticketsAvailable > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-400 text-white cursor-not-allowed pointer-events-none'}`}
          >
            {event.ticketsAvailable > 0 ? 'Book Now' : 'Sold Out'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

import React, { useState } from "react";
import EventCard from "./EventCard";

const EventPool = () => {
  const events = [
    {
      id: 1,
      title: "Music Concert",
      location: "Mumbai",
      date: "2025-08-01",
      price: 500,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 100,
      ticketsAvailable: 0,
    },
    {
      id: 2,
      title: "Art Workshop",
      location: "Delhi",
      date: "2025-08-15",
      price: 300,
      image: "https://www.cvent.com/sites/default/files/image/2023-10/Event_Experience-Cvent_CONNECT_2023.jpg",
      totalTickets: 50,
      ticketsAvailable: 15,
    },
    {
      id: 3,
      title: "Tech Conference",
      location: "Bangalore",
      date: "2025-09-10",
      price: 1000,
      image: "https://www.cvent.com/sites/default/files/image/2023-10/Event_Experience-Cvent_CONNECT_2023.jpg",
      totalTickets: 200,
      ticketsAvailable: 200,
    },
    {
      id: 4,
      title: "Food Festival",
      location: "Chennai",
      date: "2025-08-20",
      price: 100,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 150,
      ticketsAvailable: 50,
    },
    {
      id: 5,
      title: "Startup Meetup",
      location: "Pune",
      date: "2025-08-25",
      price: 0,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 50,
      ticketsAvailable: 0,
    },
    {
      id: 6,
      title: "Dance Battle",
      location: "Hyderabad",
      date: "2025-08-28",
      price: 250,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 120,
      ticketsAvailable: 10,
    },
    {
      id: 7,
      title: "Comedy Night",
      location: "Ahmedabad",
      date: "2025-08-30",
      price: 400,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 100,
      ticketsAvailable: 80,
    },
    {
      id: 8,
      title: "Photography Expo",
      location: "Jaipur",
      date: "2025-09-05",
      price: 350,
      image: "https://www.globalnexus.biz/wp-content/uploads/2017/08/Corporate-Events-1.jpg",
      totalTickets: 60,
      ticketsAvailable: 20,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const currentEvents = events.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            image={event.image}
            totalTickets={event.totalTickets}
            ticketsAvailable={event.ticketsAvailable}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventPool;

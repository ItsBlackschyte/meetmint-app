import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pricePerTicket = 500;
  const eventDate = "25th August 2025";
  const totalTickets = 100;
  const ticketsAvailable = 12;

  const [tickets, setTickets] = useState(1);

  const handleBooking = (e) => {
    e.preventDefault();
    if (tickets > ticketsAvailable) {
      alert(`Only ${ticketsAvailable} tickets are available.`);
      return;
    }

    alert(`Booked ${tickets} ticket(s) for Event ${id}`);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Tickets for Event {id}</h2>

      <form onSubmit={handleBooking} className="space-y-5">
        <div>
          <label htmlFor="tickets" className="block text-sm font-medium text-gray-700">
            Number of Tickets (Available: {ticketsAvailable})
          </label>
          <input
            id="tickets"
            type="number"
            min="1"
            max={ticketsAvailable}
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="text-sm bg-gray-50 p-4 rounded-md shadow-inner space-y-1">
          <p><strong>Price per Ticket:</strong> ₹{pricePerTicket}</p>
          <p><strong>Total:</strong> ₹{tickets * pricePerTicket}</p>
          <p><strong>Event Date:</strong> {eventDate}</p>
        </div>

        <p className="text-xs text-red-500 mt-1">
          * No refund or cancellation once booked.
        </p>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../utils/axiosInstance";
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import jsPDF from "jspdf";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const generateTicketPDF = (event, tickets, userName) => {
  const doc = new jsPDF();
  const eventDate = new Date(event.startTime).toLocaleDateString();
  const bookingDate = new Date().toLocaleString();

  for (let i = 1; i <= tickets; i++) {
    doc.text("MeetMint Event Ticket", 20, 20);
    doc.text(`Event: ${event.title}`, 20, 30);
    doc.text(`Date: ${eventDate}`, 20, 40);
    doc.text(`Holder Name: ${userName}`, 20, 50);
    doc.text(`Ticket No: ${i}`, 20, 60);
    doc.text(`Issued On: ${bookingDate}`, 20, 70);
    doc.text(`Price: ₹${event.price}`, 20, 80);
    if (i < tickets) doc.addPage();
  }

  doc.save(`ticket-${event.title.replace(/\s+/g, "-")}.pdf`);
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(1);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/event/${id}`)
      .then((res) => {
        setEvent(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setLoading(false);
      });

    const fetchUser = async () => {
      try {
        const token = Cookies.get("auth_token") || localStorage.getItem("auth_token");
        const userRes = await axios.get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = userRes.data.data;
        setUserName(`${data.firstName} ${data.lastName}`);
      } catch (err) {
        console.warn("User fetch failed");
      }
    };
    fetchUser();
  }, [id]);

  const handleSuccessfulPayment = async (paymentDetails) => {
    if (!event) return;

    const token = Cookies.get("auth_token") || localStorage.getItem("auth_token");
    const userId = localStorage.getItem("userId");

    try {
      for (let i = 0; i < tickets; i++) {
        await axios.post(
          "http://localhost:8080/api/ticket",
          { eventId: id, userId, paymentId: paymentDetails.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      generateTicketPDF(event, tickets, userName);
      toast.success(`Successfully booked ${tickets} ticket(s) for ${event.title}`);
      navigate("/");
    } catch (err) {
      console.error("Booking failed after payment:", err);
      toast.error("Booking failed. Please contact support.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

  const availableTickets = event.ticketCount - event.ticketBooked;

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Tickets for {event.title}</h2>

      <form className="space-y-5">
        <div>
          <label htmlFor="tickets" className="block text-sm font-medium text-gray-700">
            Number of Tickets (Available: {availableTickets})
          </label>
          <input
            id="tickets"
            type="number"
            min="1"
            max={availableTickets}
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="text-sm bg-gray-50 p-4 rounded-md shadow-inner space-y-1">
          <p><strong>Price per Ticket:</strong> ₹{event.price}</p>
          <p><strong>Total:</strong> ₹{tickets * event.price}</p>
          <p><strong>Event Date:</strong> {new Date(event.startTime).toLocaleDateString()}</p>
        </div>
        <p className="text-xs text-red-500 mt-1">
          * No refund or cancellation once booked.
        </p>

        <PayPalScriptProvider options={{ "client-id": "Abqpl0NewoD5AytIcyDdaBMQT3wQ9pTuq54qNIFCIH1xIh97HH3BQyV3ngGoJvXfQZo5gWuCGdOJmXIk" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: (event.price * tickets).toFixed(2),
                  },
                }],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              console.log("Payment successful:", details);
              await handleSuccessfulPayment(details);
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              toast.error("Payment failed. Please try again.");
            }}
          />
        </PayPalScriptProvider>
      </form>
    </div>
  );
};

export default BookingPage;

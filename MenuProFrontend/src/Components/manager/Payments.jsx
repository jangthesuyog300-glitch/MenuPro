import { useEffect, useState } from "react";
import "../../Styles/manager/Payments.css";
import axiosInstance from "../../services/axiosInstance";

export default function Payments() {
  const restaurantId = localStorage.getItem("restaurantId");

  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await axiosInstance.get(`/payments/restaurant/${restaurantId}`);
        setPayments(res.data || []);
      } catch (e) {
        setError(e.response?.data || "Unable to load payments");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="payments-container">
      <h1>Payments</h1>

      {payments.map((p) => (
        <div key={p.id} className="payment-card">
          <p><b>Booking:</b> {p.bookingId}</p>
          <p><b>Customer:</b> {p.customer}</p>
          <p><b>Amount:</b> ₹{p.amount}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Status:</b> {p.status}</p>
          <p><b>Date:</b> {new Date(p.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import BookTableForm from "../Components/Booking/BookingForm";
import "../Styles/BookTablePage.css";

export default function BookTablePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = (bookingData) => {
    const ok = window.confirm(
      `Confirm booking for ${bookingData.people} people
On ${bookingData.date}
From ${bookingData.startTime} to ${bookingData.endTime}?`
    );

    if (!ok) return;

    console.log("Booking sent to backend:", {
      restaurantId: id,
      ...bookingData,
    });

    // 🔁 BACKEND (future)
    /*
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurantId: id, ...bookingData })
    })
    .then(res => res.json())
    .then(data => navigate(`/payment/${data.bookingId}`));
    */

    navigate("/payment/TEMP123");
  };

  return (
    <div className="book-table-page">

      {/* LEFT SIDE */}
      <div className="menu-section">
        <h2>Menu</h2>
        <p>Select menu after confirming booking.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="booking-section">
        <BookTableForm onBook={handleBooking} />
      </div>

    </div>
  );
}

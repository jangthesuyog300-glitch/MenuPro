import { useParams } from "react-router-dom";
import { useState } from "react";
import "../Styles/BookTablePage.css";

export default function BookTablePage() {
  const { id } = useParams(); // 🔥 restaurant id
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [menu, setMenu] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking table for:", {
      restaurantId: id,
      people,
      date,
      time,
    });

    // 🔁 BACKEND FLOW (future)
    /*
    fetch("/api/book-table", {...})
      .then(() =>
        fetch(`/api/restaurants/${id}/menu`)
          .then(res => res.json())
          .then(data => setMenu(data))
      );
    */

    // TEMP MENU
    setMenu([
      { id: 1, name: "Paneer Butter Masala", price: 250 },
      { id: 2, name: "Butter Naan", price: 40 },
      { id: 3, name: "Dal Fry", price: 180 },
    ]);
  };

  return (
    <div className="book-page">

      <h1>Book a Table</h1>

      {/* BOOKING FORM */}
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Number of People"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>

      {/* MENU SECTION */}
      {menu.length > 0 && (
        <div className="menu-section">
          <h2>Available Menu</h2>
          {menu.map(item => (
            <div key={item.id} className="menu-item">
              <span>{item.name}</span>
              <strong>₹ {item.price}</strong>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

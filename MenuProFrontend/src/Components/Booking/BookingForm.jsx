import { useState } from "react";

export default function BookTableForm({ onBook }) {

  const today = new Date().toISOString().split("T")[0];

  const [people, setPeople] = useState(2);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");

  const handleSubmit = (e) => {
    e.preventDefault();

    onBook({
      people,
      date,
      startTime,
      endTime,
    });
  };

  const getTimeLabel = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 18 || hour < 6 ? "🌙 Night" : "🌞 Day";
  };

  return (
    <div className="book-form">
      <h3>Book a Table</h3>

      <form onSubmit={handleSubmit}>

        {/* PEOPLE */}
        <label>Number of People</label>
        <div className="people-selector">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              type="button"
              className={`people-btn ${people === num ? "active" : ""}`}
              onClick={() => setPeople(num)}
            >
              {num === 6 ? "6+" : num}
            </button>
          ))}
        </div>

        {/* DATE */}
        <label>Date</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* START TIME */}
        <label>
          Start Time <span className="time-label">{getTimeLabel(startTime)}</span>
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        {/* END TIME */}
        <label>
          End Time <span className="time-label">{getTimeLabel(endTime)}</span>
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Book Table</button>
      </form>
    </div>
  );
}

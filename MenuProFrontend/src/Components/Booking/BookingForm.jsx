import { useState } from "react";

export default function BookTableForm({ onBook }) {

  const today = new Date().toISOString().split("T")[0];

  const [people, setPeople] = useState(2);
  const [customPeople, setCustomPeople] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");

  const handleSubmit = (e) => {
    e.preventDefault();

    onBook({
      people: people === "custom" ? customPeople : people,
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

        {/* PEOPLE SELECTOR */}
        <label>Number of People</label>
        <div className="people-scroll">

          {[...Array(15)].map((_, i) => {
            const num = i + 1;
            return (
              <button
                key={num}
                type="button"
                className={`people-pill ${people === num ? "active" : ""}`}
                onClick={() => setPeople(num)}
              >
                {num}
              </button>
            );
          })}

          <button
            type="button"
            className={`people-pill ${people === "custom" ? "active" : ""}`}
            onClick={() => setPeople("custom")}
          >
            15+
          </button>

        </div>

        {/* CUSTOM PEOPLE INPUT */}
        {people === "custom" && (
          <input
            type="number"
            min="16"
            placeholder="Enter number of people"
            value={customPeople}
            onChange={(e) => setCustomPeople(e.target.value)}
            required
          />
        )}

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

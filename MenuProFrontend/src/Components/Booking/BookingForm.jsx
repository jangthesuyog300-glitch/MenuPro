import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

export default function BookingForm({ restaurantId, onBook }) {
  const [slots, setSlots] = useState([]);
  const [tables, setTables] = useState([]);
  const [slotId, setSlotId] = useState("");
  const [tableId, setTableId] = useState("");
  const [error, setError] = useState("");
  const [tablesLoaded, setTablesLoaded] = useState(false);

  // ✅ PUBLIC – load timeslots
  useEffect(() => {
    axiosInstance
      .get(`/timeslots/restaurant/${restaurantId}`)
      .then(r => setSlots(r.data))
      .catch(() => setError("Failed to load time slots"));
  }, [restaurantId]);

  // const handleBook = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setError("Please login first to continue booking.");
  //     return;
  //   }

  //   if (!tablesLoaded) {
  //     const res = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
  //     setTables(res.data);
  //     setTablesLoaded(true);
  //     setError("Tables loaded. Please select one.");
  //     return;
  //   }

  //   if (!tableId) {
  //     setError("Please select a table.");
  //     return;
  //   }

  //   onBook({ tableId, slotId });
  // };


  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null") {
      setError("Please login first to continue booking.");
      return;
    }

    if (!tablesLoaded) {
      const res = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
      setTables(res.data);
      setTablesLoaded(true);
      setError("Tables loaded. Please select one.");
      return;
    }

    if (!slotId) {
      setError("Please select a time slot.");
      return;
    }

    if (!tableId) {
      setError("Please select a table.");
      return;
    }

    const bookingDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    onBook({
      tableId: Number(tableId),
      timeSlotId: Number(slotId),
      bookingDate,
    });
  };



  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Time slot select: add value */}
      <select value={slotId} onChange={(e) => setSlotId(e.target.value)}>
        <option value="">Select Time Slot</option>
        {slots.map((s) => (
          <option key={s.timeSlotId} value={s.timeSlotId}>
            {s.startTime} - {s.endTime}
          </option>
        ))}
      </select>

      {/* ✅ Table select: add value + fix default option value */}
      <select
        value={tableId}
        disabled={!tablesLoaded}
        onChange={(e) => setTableId(e.target.value)}
      >
        <option value="">
          {!tablesLoaded ? "Login required (click Book/Pay)" : "Select Table"}
        </option>

        {tables.map((t) => (
          <option key={t.tableId ?? t.id} value={t.tableId ?? t.id}>
            Table {t.tableId ?? t.id} ({t.seats} seats)
          </option>
        ))}
      </select>

      <button onClick={handleBook}>
        {tablesLoaded ? "Continue to Pay" : "Book / Pay"}
      </button>
    </>
  );

}

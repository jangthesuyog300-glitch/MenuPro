import { useEffect, useState } from "react";
import "../../Styles/manager/Bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setBookings([
      {
        id: 1,
        name: "Rahul Sharma",
        phone: "9876543210",
        date: "2026-01-28",
        time: "7:00 PM",
        guests: 4,
        tableNo: 5,
        status: "Pending",
        payment: "Unpaid",
      },
      {
        id: 2,
        name: "Amit Patil",
        phone: "9123456780",
        date: "2026-01-28",
        time: "8:30 PM",
        guests: 2,
        tableNo: 2,
        status: "Confirmed",
        payment: "Paid",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    const booking = bookings.find((b) => b.id === id);

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    const newLog = {
      bookingId: id,
      name: booking.name,
      action: newStatus,
      time: new Date().toLocaleString(),
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="bookings-container">
      <h1>Bookings Management</h1>

      {/* BOOKINGS TABLE */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Table</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.guests}</td>
              <td>{b.tableNo}</td>
              <td className={b.status.toLowerCase()}>{b.status}</td>
              <td>{b.payment}</td>
              <td>
                <button onClick={() => updateStatus(b.id, "Confirmed")}>
                  Confirm
                </button>
                <button onClick={() => updateStatus(b.id, "Cancelled")}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BOOKING LOG */}
      <h2 style={{ marginTop: "40px" }}>Booking Activity Log</h2>

      <table className="log-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Action</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="4">No activity yet</td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{log.bookingId}</td>
                <td>{log.name}</td>
                <td className={log.action.toLowerCase()}>{log.action}</td>
                <td>{log.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

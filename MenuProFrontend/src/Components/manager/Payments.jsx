import { useEffect, useState } from "react";
import "../../Styles/manager/Payments.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setPayments([
      {
        id: 1,
        bookingId: 101,
        customer: "Rahul Sharma",
        amount: 2500,
        method: "UPI",
        status: "Pending",
        date: "2026-01-27",
      },
      {
        id: 2,
        bookingId: 102,
        customer: "Amit Patil",
        amount: 1800,
        method: "Card",
        status: "Paid",
        date: "2026-01-27",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    const payment = payments.find((p) => p.id === id);

    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const newLog = {
      paymentId: id,
      customer: payment.customer,
      action: newStatus,
      time: new Date().toLocaleString(),
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="payments-container">
      <h1>Payments Management</h1>

      {/* PAYMENTS TABLE */}
      <table className="payments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Amount (₹)</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.bookingId}</td>
              <td>{p.customer}</td>
              <td>₹ {p.amount}</td>
              <td>{p.method}</td>
              <td className={p.status.toLowerCase()}>{p.status}</td>
              <td>{p.date}</td>
              <td>
                <button onClick={() => updateStatus(p.id, "Paid")}>
                  Mark Paid
                </button>
                <button onClick={() => updateStatus(p.id, "Failed")}>
                  Fail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAYMENT LOG */}
      <h2>Payment Activity Log</h2>

      <table className="log-table">
        <thead>
          <tr>
            <th>Payment ID</th>
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
                <td>{log.paymentId}</td>
                <td>{log.customer}</td>
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

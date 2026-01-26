import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/component/Payment.css";

export default function RazorpayDemo({ booking, cart, onCancel }) {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false); // Track payment status

  const tableCharge = booking?.tableCharge || 0; // ₹100 table booking charge

  // Calculate subtotal for food items
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // GST 5% on food items + table charge
  const gst = Math.round((subtotal + tableCharge) * 0.05);

  // Total payable
  const total = subtotal + tableCharge + gst;

  // Handle Pay click
  const handlePay = () => {
    // Here you would integrate Razorpay API for real payment
    // For demo, we just mark as paid
    setPaid(true);
  };

  return (
    <div className="payment-overlay">
      <div className="payment-card">

        {/* HEADER */}
        <div className="payment-header">
          <h2>{paid ? "✅ Payment Successful" : "💳 Confirm & Pay"}</h2>
          {!paid && <button className="close-btn" onClick={onCancel}>✖</button>}
        </div>

        {paid ? (
          // ✅ Payment Success Message
          <div className="payment-success">
            <p>🎉 Your payment of ₹{total} was successful!</p>

            {/* Booking Details */}
            <div className="payment-section">
              <h4>📅 Table Booking</h4>
              <div className="info-grid">
                <span>Date</span><b>{booking?.date}</b>
                <span>Time</span><b>{booking?.startTime} – {booking?.endTime}</b>
                <span>Guests</span><b>{booking?.people}</b>
                <span>Table Charge</span><b>₹{tableCharge}</b>
              </div>
            </div>

            {/* Order Summary */}
            <div className="payment-section">
              <h4>🛒 Order Summary</h4>
              {cart.length === 0 && <p className="empty-cart">Your cart was empty</p>}
              {cart.map(item => (
                <div key={item.id} className="cart-row">
                  <span className="item-name">{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            {/* Bill */}
            <div className="payment-section bill">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Table Booking Charge</span>
                <span>₹{tableCharge}</span>
              </div>
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="bill-row total">
                <b>Total Paid</b>
                <b>₹{total}</b>
              </div>
            </div>

            {/* Go Home Button */}
            <div className="payment-footer">
              <button className="home-btn" onClick={() => navigate("/")}>
                🏠 Go to Homepage
              </button>
            </div>
          </div>
        ) : (
          // ⚡ Payment Form / Confirm & Pay
          <>
            {/* Booking Details */}
            <div className="payment-section">
              <h4>📅 Table Booking</h4>
              <div className="info-grid">
                <span>Date</span><b>{booking?.date}</b>
                <span>Time</span><b>{booking?.startTime} – {booking?.endTime}</b>
                <span>Guests</span><b>{booking?.people}</b>
                <span>Table Charge</span><b>₹{tableCharge}</b>
              </div>
            </div>

            {/* Cart */}
            <div className="payment-section">
              <h4>🛒 Order Summary</h4>
              {cart.length === 0 && <p className="empty-cart">Your cart is empty</p>}
              {cart.map(item => (
                <div key={item.id} className="cart-row">
                  <span className="item-name">{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            {/* Bill */}
            <div className="payment-section bill">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Table Booking Charge</span>
                <span>₹{tableCharge}</span>
              </div>
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="bill-row total">
                <b>Total Payable</b>
                <b>₹{total}</b>
              </div>
            </div>

            {/* Footer */}
            <div className="payment-footer">
              <p className="demo-text">🔒 Secure demo payment (no real money deducted)</p>
              <button
                className="pay-btn"
                disabled={cart.length === 0 && tableCharge === 0}
                onClick={handlePay}
              >
                Pay ₹{total}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

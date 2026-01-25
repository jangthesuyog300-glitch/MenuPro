export default function ConfirmDialog({
    bookingData,
    addMenu,
    setAddMenu,
    onConfirm,
    onCancel
  }) {
    return (
      <div className="confirm-overlay">
        <div className="confirm-box">
  
          <h3>Confirm Booking</h3>
  
          <p>
            Book table for <b>{bookingData.people}</b> people
          </p>
          <p>
            On <b>{bookingData.date}</b> from{" "}
            <b>{bookingData.startTime}</b> to{" "}
            <b>{bookingData.endTime}</b>
          </p>
  
          {/* 🔘 RADIO OPTION */}
          <label className="radio-option">
            <input
              type="radio"
              checked={addMenu === true}
              onChange={() => setAddMenu(true)}
            />
            Add Menu & Order Food
          </label>
  
          <label className="radio-option">
            <input
              type="radio"
              checked={addMenu === false}
              onChange={() => setAddMenu(false)}
            />
            Book Table Only
          </label>
  
          <div className="confirm-actions">
            <button onClick={onConfirm}>Confirm</button>
            <button className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
  
        </div>
      </div>
    );
  }
  
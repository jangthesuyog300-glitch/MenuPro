import "../../Styles/manager/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="manager-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p>Today’s restaurant overview</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>₹12,450</h3>
          <p>Revenue Today</p>
        </div>

        <div className="kpi-card">
          <h3>38</h3>
          <p>Total Orders</p>
        </div>

        <div className="kpi-card">
          <h3>6</h3>
          <p>Active Tables</p>
        </div>

        <div className="kpi-card">
          <h3>4.5 ⭐</h3>
          <p>Average Rating</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">

        {/* Orders Status */}
        <div className="dashboard-card">
          <h2>Orders Status</h2>
          <ul className="status-list">
            <li>🟡 Pending: <strong>5</strong></li>
            <li>🍳 Preparing: <strong>8</strong></li>
            <li>🚚 Out for Delivery: <strong>6</strong></li>
            <li>✅ Completed: <strong>19</strong></li>
          </ul>
        </div>

        {/* Table Availability */}
        <div className="dashboard-card">
          <h2>Table Availability</h2>
          <ul className="status-list">
            <li>🟢 Available: <strong>10</strong></li>
            <li>🔴 Occupied: <strong>6</strong></li>
            <li>📅 Reserved: <strong>4</strong></li>
          </ul>
        </div>

        {/* Top Selling Items */}
        <div className="dashboard-card">
          <h2>Top Selling Items</h2>
          <ul className="simple-list">
            <li>🍕 Margherita Pizza – 12 orders</li>
            <li>🍔 Chicken Burger – 9 orders</li>
            <li>🍝 Alfredo Pasta – 7 orders</li>
            <li>🥗 Caesar Salad – 5 orders</li>
          </ul>
        </div>

        {/* Staff on Duty */}
        <div className="dashboard-card">
          <h2>Staff On Duty</h2>
          <ul className="simple-list">
            <li>👨‍🍳 Chefs: 3</li>
            <li>🧑‍🍽️ Waiters: 5</li>
            <li>🧹 Cleaners: 2</li>
            <li>📦 Delivery Staff: 4</li>
          </ul>
        </div>
      </div>

      {/* Weekly Revenue */}
      <div className="dashboard-card full-width">
        <h2>Weekly Revenue Overview</h2>
        <div className="revenue-bar">
          <span style={{ height: "60%" }}>Mon</span>
          <span style={{ height: "80%" }}>Tue</span>
          <span style={{ height: "55%" }}>Wed</span>
          <span style={{ height: "90%" }}>Thu</span>
          <span style={{ height: "75%" }}>Fri</span>
          <span style={{ height: "95%" }}>Sat</span>
          <span style={{ height: "85%" }}>Sun</span>
        </div>
      </div>

    </div>
  );
}

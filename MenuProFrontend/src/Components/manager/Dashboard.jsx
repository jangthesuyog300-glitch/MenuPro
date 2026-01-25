import "../../Styles/manager/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="card">Bookings Today: 0</div>
        <div className="card">Revenue Today: ₹0</div>
        <div className="card">Food Items: 0</div>
        <div className="card">Tables: 0</div>
      </div>
    </div>
  );
}

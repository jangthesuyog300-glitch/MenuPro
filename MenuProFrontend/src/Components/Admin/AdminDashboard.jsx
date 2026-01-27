import "../../Styles/Admin/AdminDashboard.css";

export default function AdminDashboard() {
  // Dummy counts (later from API)
  const stats = {
    restaurants: 12,
    managers: 12,
    active: 10,
    inactive: 2,
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>Total Restaurants</h2>
          <p>{stats.restaurants}</p>
        </div>

        <div className="card">
          <h2>Total Managers</h2>
          <p>{stats.managers}</p>
        </div>

        <div className="card active">
          <h2>Active Restaurants</h2>
          <p>{stats.active}</p>
        </div>

        <div className="card inactive">
          <h2>Inactive Restaurants</h2>
          <p>{stats.inactive}</p>
        </div>
      </div>
    </div>
  );
}

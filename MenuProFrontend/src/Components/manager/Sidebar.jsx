import { Link } from "react-router-dom";
import "../../Styles/manager/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Manager Panel</h2>
      <ul>
        <li><Link to="/manager">Dashboard</Link></li>
        <li><Link to="/manager/restaurant">My Restaurant</Link></li>
        <li><Link to="/manager/food">Food Menu</Link></li>
        <li><Link to="/manager/tables">Tables</Link></li>
        <li><Link to="/manager/bookings">Bookings</Link></li>
        <li><Link to="/manager/payments">Payments</Link></li>
      </ul>
    </div>
  );
}

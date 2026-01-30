// import { Link } from "react-router-dom";
// import "../../Styles/manager/Sidebar.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>Manager Panel</h2>
//       <ul>
//         <li><Link to="/manager">Dashboard</Link></li>
//         <li><Link to="/manager/restaurant">My Restaurant</Link></li>
//         <li><Link to="/manager/food">Food Menu</Link></li>
//         <li><Link to="/manager/tables">Tables</Link></li>
//         <li><Link to="/manager/bookings">Bookings</Link></li>
//         <li><Link to="/manager/payments">Payments</Link></li>
//       </ul>
//     </div>
//   );
// }



import { Link } from "react-router-dom";
import { useState } from "react";
import "../../Styles/manager/Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h2>Manager Panel</h2>}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {/* <li><Link to="/manager">🏠 {!collapsed && "Dashboard"}</Link></li> */}
        <li><Link to="/manager/bookings">📅 {!collapsed && "Dashboard / Bookings"}</Link></li>
        {/* <li><Link to="/manager/restaurant">🏪 {!collapsed && "My Restaurant"}</Link></li> */}
        <li><Link to="/manager/food">🍔 {!collapsed && "Food Menu"}</Link></li>
        <li><Link to="/manager/tables">🪑 {!collapsed && "Tables"}</Link></li>
        {/* <li><Link to="/manager/payments">💳 {!collapsed && "Payments"}</Link></li> */}
      </ul>
    </div>
  );
}

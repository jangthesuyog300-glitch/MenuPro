import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../Styles/Admin/AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/restaurants">Restaurants</Link>
        <Link to="/admin/managers">Managers</Link>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

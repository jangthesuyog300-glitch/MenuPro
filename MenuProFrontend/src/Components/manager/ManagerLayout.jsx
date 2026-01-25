


import { Outlet } from "react-router-dom";
import "../../Styles/manager/ManagerLayout.css";
import Sidebar from "./Sidebar";

export default function ManagerLayout() {
  return (
    <div className="manager-layout">
      <Sidebar />
      <div className="manager-content">
        <Outlet />
      </div>
    </div>
  );
}

import "../../Styles/manager/ManagerLayout.css";
import Sidebar from "./Sidebar";


export default function ManagerLayout({ children }) {
  return (
    <div className="manager-layout">
      <Sidebar />
      <div className="manager-content">
        {children}
      </div>
    </div>
  );
}

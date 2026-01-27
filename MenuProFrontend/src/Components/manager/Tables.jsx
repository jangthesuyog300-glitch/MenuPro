import { useEffect, useState } from "react";
import "../../Styles/manager/Tables.css";

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    setTables([
      { id: 1, seats: 4, status: "Available" },
      { id: 2, seats: 2, status: "Occupied" },
      { id: 3, seats: 6, status: "Reserved" },
      { id: 4, seats: 4, status: "Available" },
      { id: 5, seats: 8, status: "Occupied" },
      { id: 6, seats: 2, status: "Available" },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="tables-container">
      <h1>Restaurant Tables Management</h1>

      <div className="tables-grid">
        {tables.map((table) => (
          <div key={table.id} className={`table-card ${table.status.toLowerCase()}`}>
            <h2>Table {table.id}</h2>
            <p>Seats: {table.seats}</p>
            <p className="status">{table.status}</p>

            <div className="actions">
              <button onClick={() => updateStatus(table.id, "Available")}>
                Set Available
              </button>
              <button onClick={() => updateStatus(table.id, "Reserved")}>
                Reserve
              </button>
              <button onClick={() => updateStatus(table.id, "Occupied")}>
                Occupy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

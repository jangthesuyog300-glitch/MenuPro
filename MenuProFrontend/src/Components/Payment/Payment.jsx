import { useEffect, useMemo, useState } from "react";
import "../../Styles/manager/Bookings.css"; // reuse same UI file OR create PaymentLogs.css
import axiosInstance from "../../services/axiosInstance";

export default function PaymentLogs() {
  const restaurantId = localStorage.getItem("restaurantId");

  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");

        // ✅ Your controller: GET api/payments/restaurant/{restaurantId}
        const res = await axiosInstance.get(`/payments/restaurant/${restaurantId}`);
        setLogs(res.data || []);
      } catch (e) {
        setError(e.response?.data || "Unable to load payment logs");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  const statusClass = (status = "") => {
    const s = status.toLowerCase();
    if (s === "success") return "badge badge--confirmed";
    if (s === "failed") return "badge badge--cancelled";
    if (s === "pending") return "badge badge--pending";
    return "badge";
  };

  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return logs.filter((p) => {
      const matchesStatus =
        statusFilter === "all" ? true : (p.status || "").toLowerCase() === statusFilter;

      const matchesQuery =
        !q ||
        String(p.bookingId || "").includes(q) ||
        String(p.id || "").includes(q) ||
        (p.customer || "").toLowerCase().includes(q) ||
        (p.method || "").toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [logs, query, statusFilter]);

  const totals = useMemo(() => {
    const successTotal = filteredLogs
      .filter((x) => (x.status || "").toLowerCase() === "success")
      .reduce((sum, x) => sum + Number(x.amount || 0), 0);

    const allTotal = filteredLogs.reduce((sum, x) => sum + Number(x.amount || 0), 0);

    return { successTotal, allTotal, count: filteredLogs.length };
  }, [filteredLogs]);

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="bookings-page">
      <div className="page-header" style={{ alignItems: "center" }}>
        <div>
          <h1 className="page-title">Payment Logs</h1>
          <p className="page-subtitle">All payments received for this restaurant</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer, booking id, method..."
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #00000020",
              minWidth: 260,
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #00000020",
            }}
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-left">
          <div className="summary-title">
            <span className="summary-restaurant">Restaurant #{restaurantId}</span>
            <span className="summary-meta">Showing {totals.count} payments</span>
          </div>

          <div className="summary-badges">
            <span className="pill">Success Total: ₹{totals.successTotal}</span>
            <span className="pill">All Amount Total: ₹{totals.allTotal}</span>
          </div>
        </div>

        <div className="summary-right">
          <div className="summary-stat">
            <div className="stat-label">Payments</div>
            <div className="stat-value">{totals.count}</div>
          </div>
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No payments found</div>
          <div className="empty-text">Try changing filters or search.</div>
        </div>
      ) : (
        <div className="booking-grid">
          {filteredLogs.map((p) => (
            <div key={p.id} className="booking-card-v2">
              <div className="booking-top">
                <div className="customer">
                  <div className="avatar">
                    {(p.customer || "U").trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="customer-info">
                    <div className="customer-name">{p.customer || "Customer"}</div>
                    <div className="booking-id" style={{ marginTop: 4 }}>
                      Payment ID: <b>#{p.id}</b> • Booking ID: <b>#{p.bookingId}</b>
                    </div>
                  </div>
                </div>

                <div className="booking-tags">
                  <span className={statusClass(p.status)}>{p.status || "—"}</span>
                  <span className="badge">{p.method || "—"}</span>
                </div>
              </div>

              <div className="booking-meta">
                <div className="meta-item">💰 Amount: ₹{p.amount}</div>
                <div className="meta-item">
                  🗓 {p.date ? new Date(p.date).toLocaleString() : "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

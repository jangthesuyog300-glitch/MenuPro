// Backend URL
const API_BASE =
  import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://localhost:44315";

async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  let payload;

  if (contentType.includes("application/json")) {
    payload = await res.json().catch(() => null);
  } else {
    payload = await res.text().catch(() => "");
  }

  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && (payload.message || payload.title)) ||
      (typeof payload === "string" && payload) ||
      `Request failed (${res.status})`;

    const err = new Error(msg);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export async function registerUser(data) {
  const body = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role || "User", // User | Manager | Admin
  };

  // ✅ RestaurantId ONLY for Manager
  if (body.role === "Manager") {
    body.restaurantId = Number(data.restaurantId);
  }
  // ❌ Admin/User -> DO NOT send restaurantId at all

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

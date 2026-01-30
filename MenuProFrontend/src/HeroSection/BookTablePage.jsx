// ✅ src/pages/BookTablePage.jsx (FULL COPY-PASTE)
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookTableForm from "../Components/Booking/BookingForm";
import MenuList from "../Components/MenuList";
import RazorpayDemo from "../Components/Payment/Payment";
import ViewCartButton from "../Components/Cart/ViewCartButton";
import CartDrawer from "../Components/Cart/CartDrawer";
import "../Styles/BookTablePage.css";
import { getMenuByRestaurant } from "../services/menuService";

import { createBooking } from "../services/bookingService";
import { addBookingFood } from "../services/bookingFoodService";
import { createPayment } from "../services/paymentService";

export default function BookTablePage() {
  const { id } = useParams(); // restaurantId
  const navigate = useNavigate();

  if (!id) return <h1 style={{ color: "red" }}>Restaurant ID missing in URL</h1>;

  // ✅ must be set at login
  const token = localStorage.getItem("token");
  // const userIdRaw = localStorage.getItem("userId");

  // const isLoggedIn =
  //   token && token !== "undefined" && token !== "null" && token.trim() !== "";


  const getUserIdFromToken = (token) => {
    if (!token || token === "undefined" || token === "null") return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.sub ? Number(payload.sub) : null;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken(token);


  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [bookingDraft, setBookingDraft] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ If userId missing -> redirect to login
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // 🍽 Fetch Menu
  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenuByRestaurant(id);
      setMenu(data);
    };
    fetchMenu();
  }, [id]);

  // ➕ Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // ➖ Remove qty
  const removeFromCart = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  // ❌ Delete from cart
  const deleteFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  // 📅 Booking submit
  const handleBooking = (bookingData) => {
    const tableBookingCharge = 100; // ₹100 fixed table charge

    setBookingDraft({
      ...bookingData,
      restaurantId: Number(id),
      userId: Number(userId),
      tableCharge: tableBookingCharge,
    });

    setShowPayment(true);
  };

  // ✅ After Payment success callback
  const handlePaymentSuccess = async () => {
    if (!bookingDraft) return;

    try {
      setSaving(true);

      const foodTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      const totalAmount = foodTotal + (bookingDraft.tableCharge || 0);

      // 1) Create Booking
      const createdBooking = await createBooking({
        userId: bookingDraft.userId,
        restaurantId: bookingDraft.restaurantId,
        tableId: bookingDraft.tableId,
        timeSlotId: bookingDraft.timeSlotId,
        bookingDate: bookingDraft.bookingDate || new Date().toISOString(),
        bookingStatus: "Confirmed",
        bookingAmount: totalAmount,
      });

      // 2) Save BookingFoods
      for (const item of cart) {
        await addBookingFood({
          bookingId: createdBooking.bookingId,
          foodItemId: item.id,
          quantity: item.qty,
          price: item.price,
        });
      }

      // 3) Save Payment
      await createPayment({
        bookingId: createdBooking.bookingId,
        amount: totalAmount,
        paymentType: "Combined",
        paymentStatus: "Success",
        paymentDate: new Date().toISOString(),
      });
// ==============================================================================================================
      console.log("💳 Creating payment:", {
        bookingId: createdBooking.bookingId,
        amount: totalAmount,
        paymentType: "Combined",
        paymentStatus: "Success",
        paymentDate: new Date().toISOString(),
      });

      setCart([]);
      setShowPayment(false);
      navigate("/history");
    } catch (e) {
      console.error(e);
      alert(e.response?.data || "Failed to save booking. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book-table-page">
      {/* 🛒 VIEW CART BUTTON */}
      <ViewCartButton cart={cart} onClick={() => setShowCart(true)} />

      {/* LEFT: MENU */}
      <div className="menu-section">
        <h2>Menu</h2>
        <MenuList menu={menu} onAddToCart={addToCart} />
      </div>

      {/* RIGHT: BOOKING */}
      <div className="booking-section">
        <BookTableForm restaurantId={Number(id)} onBook={handleBooking} />
      </div>

      {/* 🧾 CART DRAWER */}
      {showCart && (
        <CartDrawer
          cart={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onDelete={deleteFromCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* 💳 PAYMENT */}
      {showPayment && (
        <RazorpayDemo
          booking={bookingDraft}
          cart={cart}
          onSuccess={handlePaymentSuccess} // ✅ now works
          onCancel={() => setShowPayment(false)}
        />
      )}

      {saving && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#000",
            color: "#fff",
            padding: 10,
          }}
        >
          Saving booking...
        </div>
      )}
    </div>
  );
}

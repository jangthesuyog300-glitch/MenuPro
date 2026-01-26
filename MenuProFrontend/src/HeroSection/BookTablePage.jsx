



// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import BookTableForm from "../Components/Booking/BookingForm";
// import MenuList from "../Components/MenuList";
// import "../Styles/BookTablePage.css";

// // adding the Service to import the data 
// import { getMenuByRestaurant } from "../services/menuService";



// export default function BookTablePage() {
//   const { id } = useParams();

//   if (!id) {
//     return <h1 style={{ color: "red" }}>Restaurant ID missing in URL</h1>;
//   }
//   const navigate = useNavigate();

//   const [menu, setMenu] = useState([]);

//     useEffect(() => {
//       // Temporary Printing the Id
//       console.log("Restaurant ID from URL:", id);
//       const fetchMenu = async () => {
//         try {
//           const data = await getMenuByRestaurant(id);
//           setMenu(data);
//         } catch (error) {
//           console.error("Failed to fetch menu:", error);
//         }
//       };
    
//       fetchMenu();
//     }, [id]);
  

//   const handleBooking = (bookingData) => {
//     const ok = window.confirm(
//       `Confirm booking for ${bookingData.people} people
// On ${bookingData.date}
// From ${bookingData.startTime} to ${bookingData.endTime}?`
//     );

//     if (!ok) return;

//     console.log("Booking sent to backend:", {
//       restaurantId: id,
//       ...bookingData,
//     });

//     navigate("/payment/TEMP123");
//   };

//   return (
//     <div className="book-table-page">

//       {/* LEFT SIDE MENU */}
//       <div className="menu-section">
//         <h2>Menu</h2>
//         <MenuList menu={menu} />
//       </div>

//       {/* RIGHT SIDE BOOKING */}
//       <div className="booking-section">
//         <BookTableForm onBook={handleBooking} />
//       </div>

//     </div>
//   );
// }





// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import BookTableForm from "../Components/Booking/BookingForm";
// import MenuList from "../Components/MenuList";
// import Cart from "../Components/Cart";
// import RazorpayDemo from "../Components/Payment/Payment";
// import "../Styles/BookTablePage.css";
// import { getMenuByRestaurant } from "../services/menuService";

// export default function BookTablePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   if (!id) {
//     return <h1 style={{ color: "red" }}>Restaurant ID missing in URL</h1>;
//   }

//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [booking, setBooking] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);

//   // 🍽 Fetch Menu
//   useEffect(() => {
//     const fetchMenu = async () => {
//       const data = await getMenuByRestaurant(id);
//       setMenu(data);
//     };
//     fetchMenu();
//   }, [id]);

//   // ➕ ADD TO CART
//   const addToCart = (item) => {
//     setCart(prev => {
//       const found = prev.find(i => i.id === item.id);
//       if (found) {
//         return prev.map(i =>
//           i.id === item.id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   // ➖ DECREASE QTY
//   const removeFromCart = (itemId) => {
//     setCart(prev =>
//       prev
//         .map(i =>
//           i.id === itemId ? { ...i, qty: i.qty - 1 } : i
//         )
//         .filter(i => i.qty > 0)
//     );
//   };

//   // ❌ REMOVE ITEM COMPLETELY
//   const deleteFromCart = (itemId) => {
//     setCart(prev => prev.filter(i => i.id !== itemId));
//   };

//   // 📅 BOOK TABLE
//   const handleBooking = (bookingData) => {
//     setBooking(bookingData);
//     setShowPayment(true);
//   };

//   // 💳 PAYMENT SUCCESS
//   const handlePaymentSuccess = () => {
//     navigate("/payment/confirm?status=success");
//   };

//   return (
//     <div className="book-table-page">

//       {/* LEFT: MENU + CART */}
//       <div className="menu-section">
//         <h2>Menu</h2>

//         <MenuList
//           menu={menu}
//           onAddToCart={addToCart}
//         />

//         <Cart
//           cart={cart}
//           onAdd={addToCart}
//           onRemove={removeFromCart}
//           onDelete={deleteFromCart}
//         />
//       </div>

//       {/* RIGHT: BOOKING */}
//       <div className="booking-section">
//         <BookTableForm onBook={handleBooking} />
//       </div>

//       {/* 💳 PAYMENT GATEWAY */}
//       {showPayment && (
//         <RazorpayDemo
//           booking={booking}
//           cart={cart}
//           onSuccess={handlePaymentSuccess}
//           onCancel={() => setShowPayment(false)}
//         />
//       )}

//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookTableForm from "../Components/Booking/BookingForm";
import MenuList from "../Components/MenuList";
import RazorpayDemo from "../Components/Payment/Payment";
import ViewCartButton from "../Components/Cart/ViewCartButton";
import CartDrawer from "../Components/Cart/CartDrawer";
import "../Styles/BookTablePage.css";
import { getMenuByRestaurant } from "../services/menuService";

export default function BookTablePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <h1 style={{ color: "red" }}>Restaurant ID missing in URL</h1>;
  }

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [booking, setBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
    setCart(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // ➖ Remove qty
  const removeFromCart = (itemId) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  // ❌ Delete from cart
  const deleteFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  // 📅 Booking + Table Charge
  const handleBooking = (bookingData) => {
    const tableBookingCharge = 100; // ₹100 fixed table charge
    setBooking({
      ...bookingData,
      tableCharge: tableBookingCharge
    });
    setShowPayment(true);
  };

  // 💳 Payment success
  const handlePaymentSuccess = () => {
    navigate("/payment/confirm?status=success");
  };

  return (
    <div className="book-table-page">

      {/* 🛒 VIEW CART BUTTON */}
      <ViewCartButton
        cart={cart}
        onClick={() => setShowCart(true)}
      />

      {/* LEFT: MENU */}
      <div className="menu-section">
        <h2>Menu</h2>

        <MenuList
          menu={menu}
          onAddToCart={addToCart}
        />
      </div>

      {/* RIGHT: BOOKING */}
      <div className="booking-section">
        <BookTableForm onBook={handleBooking} />
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
          booking={booking}
          cart={cart}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      )}

    </div>
  );
}

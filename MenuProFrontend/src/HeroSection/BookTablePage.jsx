



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookTableForm from "../Components/Booking/BookingForm";
import MenuList from "../Components/MenuList";
import "../Styles/BookTablePage.css";

// adding the Service to import the data 
import { getMenuByRestaurant } from "../services/menuService";



export default function BookTablePage() {
  const { id } = useParams();

  if (!id) {
    return <h1 style={{ color: "red" }}>Restaurant ID missing in URL</h1>;
  }
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);

    useEffect(() => {
      // Temporary Printing the Id
      console.log("Restaurant ID from URL:", id);
      const fetchMenu = async () => {
        try {
          const data = await getMenuByRestaurant(id);
          setMenu(data);
        } catch (error) {
          console.error("Failed to fetch menu:", error);
        }
      };
    
      fetchMenu();
    }, [id]);
  

  const handleBooking = (bookingData) => {
    const ok = window.confirm(
      `Confirm booking for ${bookingData.people} people
On ${bookingData.date}
From ${bookingData.startTime} to ${bookingData.endTime}?`
    );

    if (!ok) return;

    console.log("Booking sent to backend:", {
      restaurantId: id,
      ...bookingData,
    });

    navigate("/payment/TEMP123");
  };

  return (
    <div className="book-table-page">

      {/* LEFT SIDE MENU */}
      <div className="menu-section">
        <h2>Menu</h2>
        <MenuList menu={menu} />
      </div>

      {/* RIGHT SIDE BOOKING */}
      <div className="booking-section">
        <BookTableForm onBook={handleBooking} />
      </div>

    </div>
  );
}
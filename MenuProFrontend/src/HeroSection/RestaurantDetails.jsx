// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "../Styles/RestaurantDetails.css";

// import Overview from "../Components/Overview";
// import OrderOnline from "../Components/OrderOnline";
// import Reviews from "../Components/Reviews";
// import Photos from "../Components/Photos";
// import Menu from "../Components/Menu";

// import { getRestaurantById } from "../services/restaurantService";

// export default function RestaurantDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [restaurant, setRestaurant] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     if (!id) return;

//     getRestaurantById(id)
//       .then(res => {
//         setRestaurant(res.data);
//       })
//       .catch(err => {
//         console.error("Failed to load restaurant", err);
//       });
//   }, [id]);

//   if (!restaurant) {
//     return <p className="loading">Loading...</p>;
//   }

//   return (
//     <div className="restaurant-details-page">

//       {/* HEADER */}
//       <div className="restaurant-header">
//         <img
//           src={`https://localhost:44315/${restaurant.imagePath}`}
//           alt={restaurant.name}
//         />

//         <div className="header-info">
//           <h1>{restaurant.name}</h1>
//           <p>{restaurant.description}</p>
//           <p className="location">📍 {restaurant.location}</p>
//           <span className="rating">⭐ {restaurant.rating}</span>

//           <div className="action-buttons">
//             <button
//               onClick={() =>
//                 window.open(
//                   `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`,
//                   "_blank"
//                 )
//               }
//             >
//               📍 Location
//             </button>

//             <button
//               onClick={() =>
//                 navigator.share
//                   ? navigator.share({
//                       title: restaurant.name,
//                       text: restaurant.description,
//                       url: window.location.href,
//                     })
//                   : alert("Sharing not supported")
//               }
//             >
//               🔗 Share
//             </button>

//             <button onClick={() => setActiveTab("reviews")}>
//               ⭐ Reviews
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="tabs-bar">
//         {["overview", "order", "reviews", "photos", "menu"].map(tab => (
//           <button
//             key={tab}
//             className={activeTab === tab ? "active" : ""}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* BODY */}
//       <div className="restaurant-body">

//         <div className="left-content">
//           {activeTab === "overview" && <Overview restaurant={restaurant} />}
//           {activeTab === "order" && <OrderOnline menu={restaurant.menu} />}
//           {activeTab === "reviews" && <Reviews reviews={restaurant.reviews} />}
//           {activeTab === "photos" && <Photos photos={restaurant.photos} />}
//           {activeTab === "menu" && <Menu menu={restaurant.menu} />}
//         </div>

//         {/* BOOKING */}
//         <div className="booking-sidebar">
//           <h3>Book a Table</h3>
//           <p>Reserve your seat instantly</p>
//           <button
//             className="book-btn"
//             onClick={() => navigate(`/restaurant/${id}/book`)}
//           >
//             Book a Table
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }







import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/RestaurantDetails.css";

import Overview from "../Components/Overview";
import OrderOnline from "../Components/OrderOnline";
import Reviews from "../Components/Reviews";
import Photos from "../Components/Photos";
import Menu from "../Components/Menu";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // ✅ HARDCODED DATA
    const hardcodedRestaurant = {
      restaurantId: id,
      name: "Spice Villa",
      description: "Authentic Indian cuisine with modern flavors",
      location: "Pune, Maharashtra",
      rating: 4.5,
      imagePath: "images/spice-villa.jpg",

      menu: [
        { id: 1, name: "Paneer Butter Masala", price: 250 },
        { id: 2, name: "Butter Naan", price: 40 },
      ],

      reviews: [
        { id: 1, user: "Rahul", comment: "Amazing food!", rating: 5 },
        { id: 2, user: "Anita", comment: "Great ambiance", rating: 4 },
      ],

      photos: [
        "images/food1.jpg",
        "images/food2.jpg",
      ]
    };

    setRestaurant(hardcodedRestaurant);
  }, [id]);

  if (!restaurant) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="restaurant-details-page">

      {/* HEADER */}
      <div className="restaurant-header">
        <img
          src={`/${restaurant.imagePath}`}
          alt={restaurant.name}
        />

        <div className="header-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p className="location">📍 {restaurant.location}</p>
          <span className="rating">⭐ {restaurant.rating}</span>

          <div className="action-buttons">
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`,
                  "_blank"
                )
              }
            >
              📍 Location
            </button>

            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({
                      title: restaurant.name,
                      text: restaurant.description,
                      url: window.location.href,
                    })
                  : alert("Sharing not supported")
              }
            >
              🔗 Share
            </button>

            <button onClick={() => setActiveTab("reviews")}>
              ⭐ Reviews
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-bar">
        {["overview", "order", "reviews", "photos", "menu"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="restaurant-body">

        <div className="left-content">
          {activeTab === "overview" && <Overview restaurant={restaurant} />}
          {activeTab === "order" && <OrderOnline menu={restaurant.menu} />}
          {activeTab === "reviews" && <Reviews reviews={restaurant.reviews} />}
          {activeTab === "photos" && <Photos photos={restaurant.photos} />}
          {activeTab === "menu" && <Menu menu={restaurant.menu} />}
        </div>

        {/* BOOKING */}
        <div className="booking-sidebar">
          <h3>Book a Table</h3>
          <p>Reserve your seat instantly</p>
          <button
            className="book-btn"
            onClick={() => navigate(`/restaurant/${id}/book`)}
          >
            Book a Table
          </button>
        </div>

      </div>
    </div>
  );
}

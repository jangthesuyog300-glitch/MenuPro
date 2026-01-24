export default function Overview({ restaurant }) {
    return (
      <div>
        <h3>About the Restaurant</h3>
        <p>{restaurant.description}</p>
  
        <h4>Location</h4>
        <p>📍 {restaurant.location}</p>
  
        <h4>Rating</h4>
        <p>⭐ {restaurant.rating}</p>
      </div>
    );
  }
  
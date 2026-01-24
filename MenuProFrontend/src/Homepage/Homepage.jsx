import React from 'react';
import RestaurantCard from './CardForHotels/Card';


export default function Homepage() {
    const restaurantData = {
        name: "Spice Delight",
        location: "Pune, India",
        rating: 4.5,
        isActive: true,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
      };
    
      return (<>
        <div style={{ padding: "30px" }}>
          <RestaurantCard {...restaurantData} />
        </div>
        </>
      );
}

// import "../Styles/MenuCard.css";

// export default function MenuCard({ item }) {
//   return (
//     <div className={`menu-card ${!item.isAvailable ? "disabled" : ""}`}>

//       {/* IMAGE */}
//       <div className="menu-image">
//         <img src={item.imageUrl} alt={item.name} />
//         {!item.isAvailable && <span className="badge">Not Available</span>}
//       </div>

//       {/* INFO */}
//       <div className="menu-info">
//         <h4>{item.name}</h4>
//         <p className="price">₹ {item.price}</p>

//         <div className="meta">
//           {item.isVeg && <span className="veg">🟢 Veg</span>}
//           {!item.isVeg && <span className="nonveg">🔴 Non-Veg</span>}
//         </div>
//       </div>

//     </div>
//   );
// }


export default function MenuCard({ item, onAdd }) {
  return (
    <div className={`menu-card ${!item.isAvailable ? "disabled" : ""}`}>

      <img src={item.imageUrl} alt={item.name} />

      <div className="menu-info">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>

        {item.isAvailable ? (
          <button onClick={onAdd}>
            ➕ Add
          </button>
        ) : (
          <span className="sold-out">Sold Out</span>
        )}
      </div>
    </div>
  );
}

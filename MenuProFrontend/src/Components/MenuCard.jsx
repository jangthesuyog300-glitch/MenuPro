


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

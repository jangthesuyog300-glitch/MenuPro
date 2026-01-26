export default function OrderOnline({ menu }) {
  if (!menu || menu.length === 0) {
    return <p>No items available for online order.</p>;
  }

  return (
    <div>
      <h3>Order Online</h3>

      {menu.map(item => (
        <div key={item.id} className="menu-item">
          <h4>{item.name}</h4>
          <p>₹ {item.price}</p>
          <button disabled={!item.isAvailable}>
            {item.isAvailable ? "Add" : "Unavailable"}
          </button>
        </div>
      ))}
    </div>
  );
}

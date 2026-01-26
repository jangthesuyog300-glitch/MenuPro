export default function Cart({ cart, onAdd, onRemove, onDelete }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart">
      <h3>🛒 Your Cart</h3>

      {cart.length === 0 && <p>No items added</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-row">

          <div>
            <strong>{item.name}</strong>
            <p>₹{item.price}</p>
          </div>

          <div className="cart-controls">
            <button onClick={() => onRemove(item.id)}>➖</button>
            <span>{item.qty}</span>
            <button onClick={() => onAdd(item)}>➕</button>
            <button onClick={() => onDelete(item.id)}>❌</button>
          </div>

          <div>
            ₹{item.price * item.qty}
          </div>

        </div>
      ))}

      {cart.length > 0 && (
        <>
          <hr />
          <h4>Total: ₹{total}</h4>
        </>
      )}
    </div>
  );
}

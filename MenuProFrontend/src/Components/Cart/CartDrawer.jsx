import "../../Styles/component/CartDrawer.css";
export default function CartDrawer({ cart, onAdd, onRemove, onDelete, onClose }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">

        <div className="cart-header">
          <h3>🛒 Your Bill</h3>
          <button className="cart-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <p>₹{item.price}</p>
              </div>

              <div className="cart-controls">
                <button onClick={() => onRemove(item.id)}>➖</button>
                <span>{item.qty}</span>
                <button onClick={() => onAdd(item)}>➕</button>
                <button className="delete-btn" onClick={() => onDelete(item.id)}>❌</button>
              </div>

              <div className="item-total">₹{item.price * item.qty}</div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <b>Total: ₹{total}</b>
        </div>
      </div>
    </div>
  );
}

export default function ViewCartButton({ cart, onClick }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!cart.length) return null;

  return (
    <button className="view-cart-btn" onClick={onClick}>
      🛒 View Cart · ₹{total}
    </button>
  );
}

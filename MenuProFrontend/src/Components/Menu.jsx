export default function Menu({ menu }) {
    if (!menu || menu.length === 0) {
      return <p>Menu not available.</p>;
    }
  
    return (
      <div>
        <h3>Menu</h3>
  
        {menu.map(item => (
          <div key={item.id} className="menu-card">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <strong>₹ {item.price}</strong>
          </div>
        ))}
      </div>
    );
  }
  
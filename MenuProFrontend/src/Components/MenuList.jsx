import MenuCard from "./MenuCard";

export default function MenuList({ menu, onAddToCart }) {

  if (!menu || menu.length === 0) {
    return <p>No menu available.</p>;
  }

  return (
    <div className="menu-list">
      {menu.map(item => {
        const mappedItem = {
          id: item.foodItemId,
          name: item.foodName,
          price: item.price,
          isAvailable: item.isAvailable,
          imageUrl: item.imageUrl || "/images/default-food.jpg",
          isVeg: true
        };

        return (
          <MenuCard
            key={mappedItem.id}
            item={mappedItem}
            onAdd={() => onAddToCart(mappedItem)}
          />
        );
      })}
    </div>
  );
}

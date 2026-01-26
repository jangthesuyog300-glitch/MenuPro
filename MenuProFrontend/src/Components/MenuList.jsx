import MenuCard from "./MenuCard";

export default function MenuList({ menu }) {

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
          isVeg: true // adjust later if backend supports it
        };

        return (
          <MenuCard
            key={mappedItem.id}
            item={mappedItem}
          />
        );
      })}
    </div>
  );
}

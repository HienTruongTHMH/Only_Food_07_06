import FoodCard from "./FoodCard";

export default function SuperDelicious() {
  const items = [
    {
      src: "/images/spinach and cheese pasta.png",
      title: "Spinach and Cheese Pasta",
    },
    { src: "/images/donut 1.png", title: "Fancy Glazed Donuts" },
    { src: "/images/cheese burger.png", title: "Cheese Burger" },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Super Delicious</h2>
      <div className="w-full grid grid-cols-3 gap-10">
        {items.map((item) => (
          <FoodCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
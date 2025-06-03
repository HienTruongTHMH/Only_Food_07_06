import FoodCard from "./FoodCard";

export default function SweetTooth() {
  const items = [
    {
      src: "/images/strawberry milkshake.png",
      title: "Strawberry Milkshake",
    },
    {
      src: "/images/chocolate banana cake.png",
      title: "Chocolate Banana Cake",
    },
    { src: "/images/berry biscuit 1.png", title: "Berry Biscuit" },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Sweet Tooth</h2>
      <div className="w-full grid grid-cols-3 gap-10">
        {items.map((item) => (
          <FoodCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
import Image from "next/image";
import React from "react";

const RelatedRecipes = () => {
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
    {
      src: "/images/spinach and cheese pasta.png",
      title: "Spinach and Cheese Pasta",
    },
    { src: "/images/donut 1.png", title: "Fancy Glazed Donuts" },
    { src: "/images/cheese burger.png", title: "Cheese Burger" },
    { src: "/images/donut 1.png", title: "Fancy Glazed Donut 1" },
    { src: "/images/cheese burger.png", title: "Cheese Burger 1" },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
      <div className="w-full grid grid-cols-4 space-y-8 space-x-5">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <div className="relative h-[150px] w-full rounded-lg overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                objectFit="cover"
                className="hover:scale-110 transition-all duration-700"
              />
            </div>
            <p className="text-left font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;
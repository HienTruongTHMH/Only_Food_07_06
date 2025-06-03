import React from "react";
import Image from "next/image";

const CollectionSections = () => {
  const items = [
    {
      src: "/images/spinach and cheese pasta.png",
      title: "Spinach and Cheese Pasta",
      price: "$12.99",
    },
    {
      src: "/images/donut 1.png",
      title: "Fancy Glazed Donuts",
      price: "$12.99",
    },
    {
      src: "/images/cheese burger.png",
      title: "Cheese Burger",
      price: "$12.99",
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Hand-Picked Collections</h2>
      <div className="w-full grid grid-cols-2 gap-5">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center border border-[#D9D9D9] rounded-sm"
          >
            <div className="relative h-[220px] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                objectFit="cover"
                className="hover:scale-110 transition-all duration-700"
              />
            </div>
            <div className="flex flex-col justify-between w-full p-5">
              <h1 className="font-bold text-2xl">{item.title}</h1>
              <div className="flex flex-row justify-end">
                <p className="text-right border px-2">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSections;
"use client";

import Image from "next/image";
import React, { useState } from "react";
import items from "@/data/recipes.json";

const LastRecipes = () => {
  const [lastRecipes, setLastRecipes] = useState(items.slice(0, 4));
  const [showMore, setShowMore] = useState(false);

  const handleLoadMore = (isShowMore: boolean) => {
    setShowMore(isShowMore);
    setLastRecipes(items.slice(0, isShowMore ? items.length : 4));
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
      <div className="w-full grid grid-cols-4 space-y-8 space-x-5">
        {lastRecipes.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
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
      <div className="flex justify-center">
        <button
          className="border border-black text-black px-10 py-2 rounded-md hover:bg-gray-200"
          onClick={() => handleLoadMore(!showMore)}
        >
          {showMore ? "Show Less" : "Load More"}
        </button>
      </div>
    </section>
  );
};

export default LastRecipes;

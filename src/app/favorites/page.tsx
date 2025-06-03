"use client";

import FoodCard from "@/components/FoodCard";
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function FavoritePage() {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const handleSelectAll = () => {
    if (selectedRecipes.length === recipes.length) {
      setSelectedRecipes([]);
    } else {
      setSelectedRecipes(recipes.map((recipe) => recipe.id.toString()));
    }
  };

  const handleDelete = () => {
    console.log("Deleting recipes:", selectedRecipes);
    setSelectedRecipes([]);
    setSelectMode(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Sort</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <span className="font-medium">({recipes.length} Recipes)</span>

          <button
            onClick={() => setSelectMode(!selectMode)}
            className="flex items-center gap-2 text-gray-700 bg-transparent border-none cursor-pointer hover:text-orange-500"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Select
          </button>
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-transparent border-none cursor-pointer"
          >
            <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
              {selectedRecipes.length === recipes.length && (
                <div className="w-2 h-2 bg-blue-500 rounded-sm" />
              )}
            </div>
            All
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedRecipes.length === 0}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:text-gray-400 bg-transparent border-none cursor-pointer disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3,6 5,6 21,6" />
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <FoodCard key={recipe.id} src={recipe.src} title={recipe.title} />
        ))}
      </div>
      <div className="flex justify-center items-center mb-10 mt-20">
        <button className="border text-black px-8 py-2 rounded-md">
          Load More
        </button>
      </div>
    </div>
  );
}
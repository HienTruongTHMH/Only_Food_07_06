"use client";

import { prisma } from '@/lib/prisma';
import { useState, useEffect } from "react";

async function getStats() {
  const recipeCount = await prisma.recipe.count();
  const categoryCount = await prisma.category.count();
  return { recipeCount, categoryCount };
}

async function getCategories() {
  return prisma.category.findMany();
}

async function getRecipes() {
  return prisma.recipe.findMany({ 
    take: 5,
    select: {
      id: true,
      title: true,
      image: true,
      category: true,
      ingredients: true,
      instructions: true
    }
  });
}

async function DatabaseStats() {
  const recipeCount = await prisma.recipe.count();
  const categoryCount = await prisma.category.count();
  
  return (
    <div className="bg-green-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold text-green-800 mb-4">📊 Database Stats</h2>
      <p className="text-green-700">✅ Database Connected: YES</p>
      <p className="text-green-700">📝 Total Recipes: {recipeCount}</p>
      <p className="text-green-700">📂 Total Categories: {categoryCount}</p>
    </div>
  );
}

function CategoriesList({ categories }: { categories: { id: string; name: string }[] }) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold text-blue-800 mb-4">📂 Categories</h2>
      {categories.length > 0 ? (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="text-blue-700">
              • {cat.name} (ID: {cat.id})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">❌ No categories found!</p>
      )}
    </div>
  );
}

function RecipesList({ recipes }: { recipes: any[] }) {
  return (
    <div className="mt-6 bg-yellow-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">🍽️ Recent Recipes</h2>
      {recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-bold text-yellow-800">{recipe.title}</h3>
              <p className="text-yellow-700">ID: {recipe.id}</p>
              <p className="text-yellow-700">Category: {recipe.category}</p>
              <p className="text-yellow-700">Ingredients: {recipe.ingredients?.length || 0}</p>
              <p className="text-yellow-700">Instructions: {recipe.instructions?.length || 0}</p>
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="w-32 h-32 object-cover rounded mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-700">
          <p>❌ No recipes found! Need to run crawler.</p>
          <pre className="bg-gray-800 text-green-400 p-3 rounded mt-2">
{`npm run crawl
# or  
npx tsx scripts/crawl-and-save.ts`}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    // Debug information
    setDebugInfo({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      // Add other debug info as needed
    });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Database Debug Page</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DatabaseStats recipeCount={recipeCount} categoryCount={categoryCount} />
        <CategoriesList categories={categories} />
      </div>
      <RecipesList recipes={recipes} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Debug Information</h1>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    </div>
  );
}

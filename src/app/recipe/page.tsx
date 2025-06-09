import { getRecipes, getCategories } from "@/data/recipe-service";
import FoodCard from "@/components/FoodCard";
import Link from "next/link";

export default async function RecipesPage() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories()
  ]);

  // Tạo mapping cho category names
  const categoryMap = {
    'trang-mieng': 'Tráng Miệng',
    'mon-chinh': 'Món Chính', 
    'canh-soup': 'Canh & Soup',
    'do-uong': 'Đồ Uống',
    'mon-an-vat': 'Món Ăn Vặt'
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          All Recipes
        </h1>
        <p className="text-gray-600 text-lg">
          Discover hundreds of delicious and easy-to-make recipes
        </p>
      </div>

      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600">
              <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              Home Page
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Tất Cả Công Thức</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Category Filter Pills */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/recipe"
            className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 font-medium"
          >
            Tất Cả
          </Link>
          {Object.entries(categoryMap).map(([key, name]) => (
            <Link
              key={key}
              href={`/recipe/category/${key}`}
              className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors duration-200 font-medium"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {recipes.length > 0 && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{recipes.length}</span> recipes
          </p>
        </div>
      )}

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              servings={recipe.servings}
              category={recipe.category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-600 mb-6">
            Currently, there are no recipes available. Please check back later to discover new dishes!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back to Home Page
          </a>
        </div>
      )}
    </main>
  );
}

export const metadata = {
  title: 'Tất Cả Công Thức - Only Food',
  description: 'Khám phá hàng trăm công thức nấu ăn ngon và dễ làm từ món chính, tráng miệng, canh soup đến đồ uống và món ăn vặt.',
};
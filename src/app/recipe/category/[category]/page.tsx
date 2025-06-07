import { getRecipesByCategory } from "@/data/recipe-service";
import FoodCard from "@/components/FoodCard";
import { notFound } from "next/navigation";

// Định nghĩa các category hợp lệ
const validCategories = {
  'trang-mieng': 'Tráng Miệng',
  'mon-chinh': 'Món Chính', 
  'canh-soup': 'Canh & Soup',
  'do-uong': 'Đồ Uống',
  'mon-an-vat': 'Món Ăn Vặt'
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  // Kiểm tra category có hợp lệ không
  if (!Object.keys(validCategories).includes(category)) {
    notFound();
  }
  
  // Lấy recipes theo category
  const recipes = await getRecipesByCategory(category);
  const categoryTitle = validCategories[category as keyof typeof validCategories];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {categoryTitle}
        </h1>
        <p className="text-gray-600 text-lg">
          Khám phá các công thức nấu ăn tuyệt vời trong danh mục {categoryTitle.toLowerCase()}
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
              Trang Chủ
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Công Thức</span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{categoryTitle}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Recipes Grid */}
      {recipes.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-gray-900">{recipes.length}</span> công thức nấu ăn
            </p>
          </div>
          
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
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có công thức nấu ăn
          </h3>
          <p className="text-gray-600 mb-6">
            Hiện tại chưa có công thức nào trong danh mục {categoryTitle.toLowerCase()}. 
            Hãy quay lại sau để khám phá những món ăn mới nhé!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Về trang chủ
          </a>
        </div>
      )}
    </main>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  return Object.keys(validCategories).map((category) => ({
    category,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryTitle = validCategories[category as keyof typeof validCategories];
  
  if (!categoryTitle) {
    return {
      title: 'Không tìm thấy trang',
    };
  }

  return {
    title: `${categoryTitle} - Only Food`,
    description: `Khám phá các công thức nấu ăn ${categoryTitle.toLowerCase()} ngon và dễ làm tại Only Food.`,
  };
}
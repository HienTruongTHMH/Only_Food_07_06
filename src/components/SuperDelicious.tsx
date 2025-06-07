import FoodCard from "./FoodCard";
import { Recipe } from "@/types/recipe";

interface SuperDeliciousProps {
  recipes: Recipe[];
}

export default function SuperDelicious({ recipes }: SuperDeliciousProps) {
  // Lấy 3 món ăn đầu tiên hoặc fallback data nếu không có
  const displayRecipes = recipes.slice(0, 3);

  if (displayRecipes.length === 0) {
    // Fallback data nếu không có dữ liệu từ database
    const fallbackItems = [
      {
        id: "fallback-1",
        title: "Spinach and Cheese Pasta",
        image: "/images/spinach and cheese pasta.png",
        prepTime: 30,
        servings: 4,
        category: "mon-chinh"
      },
      {
        id: "fallback-2", 
        title: "Fancy Glazed Donuts",
        image: "/images/donut 1.png",
        prepTime: 45,
        servings: 6,
        category: "trang-mieng"
      },
      {
        id: "fallback-3",
        title: "Cheese Burger", 
        image: "/images/cheese burger.png",
        prepTime: 25,
        servings: 2,
        category: "mon-chinh"
      }
    ];

    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Món Ngon Mới Nổi</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fallbackItems.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Món Ngon Mới Nổi</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRecipes.map((recipe) => (
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
    </section>
  );
}
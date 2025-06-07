import FoodCard from "./FoodCard";
import { Recipe } from "@/types/recipe";
import { getDessertRecipes } from "@/data/recipe-service"; // Import hàm lấy dữ liệu món tráng miệng

interface SweetToothProps {
  recipes: Recipe[];
}

export default async function SweetTooth({ recipes }: SweetToothProps) {
  // Lấy 3 món tráng miệng đầu tiên
  const displayRecipes = recipes.slice(0, 3);

  // if (displayRecipes.length === 0) {
  //   // Fallback data nếu không có dữ liệu từ database
  //   const fallbackItems = [
  //     {
  //       id: "sweet-1",
  //       title: "Strawberry Milkshake",
  //       image: "/images/strawberry milkshake.png",
  //       prepTime: 10,
  //       servings: 2,
  //       category: "trang-mieng"
  //     },
  //     {
  //       id: "sweet-2",
  //       title: "Chocolate Banana Cake",
  //       image: "/images/chocolate banana cake.png", 
  //       prepTime: 60,
  //       servings: 8,
  //       category: "trang-mieng"
  //     },
  //     {
  //       id: "sweet-3",
  //       title: "Berry Biscuit",
  //       image: "/images/berry biscuit 1.png",
  //       prepTime: 45,
  //       servings: 12,
  //       category: "trang-mieng"
  //     },
  //   ];

  //   return (
  //     <section className="mt-12">
  //       <h2 className="text-2xl font-bold mb-6">Món Tráng Miệng</h2>
  //       <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {fallbackItems.map((item) => (
  //           <FoodCard key={item.id} {...item} />
  //         ))}
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Món Tráng Miệng</h2>
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
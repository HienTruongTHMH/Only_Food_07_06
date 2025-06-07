import { Calendar, MessageSquare, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <div className="flex items-center space-x-5 text-sm text-black mt-2">
        <div className="flex flex-row gap-1 items-center">
          {/* <Image src="/avatar.svg" alt="chef" width={24} height={24} />
          <span className="text-xs">Chef OnlyFood</span> */}
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">
            {recipe.createdAt
              ? new Date(recipe.createdAt).toLocaleDateString("vi-VN")
              : "Recently"}
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Clock className="w-4 h-4" />
          <span className="text-xs">{recipe.prepTime} phút</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Users className="w-4 h-4" />
          <span className="text-xs">{recipe.servings} người</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">25</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <span className="text-yellow-500">★★★★★</span>
        </div>
      </div>
      {/* <p className="mt-4 text-black">
        Một công thức tuyệt vời được tạo ra với tình yêu và sự chăm chút. Hãy
        thưởng thức và chia sẻ với những người thân yêu!
      </p> */}
    </div>
  );
}
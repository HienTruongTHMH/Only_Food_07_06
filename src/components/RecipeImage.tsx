import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeImageProps {
  recipe: Recipe;
}

export default function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className="my-8">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    </div>
  );
}
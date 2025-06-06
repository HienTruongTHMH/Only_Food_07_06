import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeImageProps {
  recipe: Recipe;
}

export default function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className="mt-6 relative w-full aspect-[16/9]">
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
      />
    </div>
  );
}
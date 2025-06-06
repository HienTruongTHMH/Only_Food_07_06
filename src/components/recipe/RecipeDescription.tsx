import { Circle } from "lucide-react";
import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeDescriptionProps {
  recipe: Recipe;
}

export default function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Ingredients */}
        <div className="space-y-8">
          {/* Ingredients Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nguyên liệu
            </h2>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recipe Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin món ăn
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Thời gian chuẩn bị:</span>
                <span className="font-medium">{recipe.prepTime} phút</span>
              </div>
              <div className="flex justify-between">
                <span>Số người ăn:</span>
                <span className="font-medium">{recipe.servings} người</span>
              </div>
              <div className="flex justify-between">
                <span>Độ khó:</span>
                <span className="font-medium">Trung bình</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cách làm
          </h2>
          <div className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Step Text */}
                <div className="flex-1 pt-1">
                  <p className="text-gray-700 leading-relaxed">
                    {instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
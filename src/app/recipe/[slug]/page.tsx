import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeImage from "@/components/recipe/RecipeImage";
import RelatedRecipes from "@/components/recipe/RelatedRecipes";
import CommentsSection from "@/components/recipe/RecipeComments";
import RecipeDescription from "@/components/recipe/RecipeDescription";
import { getRecipeBySlug } from "@/data/recipes";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug); // Add await!

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại trang chủ
      </Link>

      {/* Header với ảnh */}
      <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden mb-6">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Tiêu đề và thông tin cơ bản */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {recipe.title}
        </h1>

        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{recipe.prepTime} phút</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>{recipe.servings} người</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nguyên liệu */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Nguyên liệu</h2>
          <ul className="space-y-3">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hướng dẫn */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Hướng dẫn cách làm</h2>
          <ol className="space-y-4">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1 leading-relaxed">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
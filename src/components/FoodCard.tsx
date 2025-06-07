import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

interface FoodCardProps {
  id: string;
  title: string;
  image: string;
  prepTime?: number;
  servings?: number;
  category?: string;
}

export default function FoodCard({ 
  id, 
  title, 
  image, 
  prepTime = 30, 
  servings = 4 
}: FoodCardProps) {
  // Sử dụng id trực tiếp cho URL
  const recipeUrl = `/recipe/${id}`;

  return (
    <Link href={recipeUrl} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{prepTime} phút</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{servings} người</span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
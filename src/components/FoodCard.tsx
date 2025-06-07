"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Heart } from "lucide-react";
import { useRecentViews } from "@/contexts/RecentViewsContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface FoodCardProps {
  id: string;
  title: string;
  image: string;
  prepTime?: number;
  servings?: number;
  category?: string;
  slug?: string;
  difficulty?: string;
}

export default function FoodCard({ 
  id, 
  title, 
  image, 
  prepTime = 30, 
  servings = 4,
  category = "Món chính",
  slug,
  difficulty = "Dễ"
}: FoodCardProps) {
  const { addToRecentViews } = useRecentViews();
  const { toggleFavorite, isFavorited } = useFavorites();
  const { user } = useAuth();
  const [isToggling, setIsToggling] = useState(false);
  
  // Sử dụng slug nếu có, ngược lại dùng id
  const recipeUrl = `/recipe/${slug || id}`;

  const handleClick = () => {
    // Add to recent views when clicked
    addToRecentViews({
      id,
      title,
      image,
      prepTime,
      servings,
      category,
      difficulty,
      slug: slug || id
    });
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    
    if (!user) {
      // You can show a toast or redirect to login
      alert('Vui lòng đăng nhập để thêm vào yêu thích');
      return;
    }

    setIsToggling(true);
    await toggleFavorite(id);
    setIsToggling(false);
  };

  return (
    <Link href={recipeUrl} className="block group" onClick={handleClick}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            disabled={isToggling}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
              isToggling ? 'opacity-50' : ''
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                user && isFavorited(id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>
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
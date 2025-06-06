import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

interface FoodCardProps {
  src: string;
  title: string;
  slug?: string;
}

export default function FoodCard({ src, title, slug }: FoodCardProps) {
  const CardContent = () => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>4 servings</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/recipe/${slug}`} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
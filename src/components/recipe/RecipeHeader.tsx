import { Calendar, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function RecipeHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Strawberry Cream Cheesecake</h1>
      <div className="flex items-center space-x-5 text-sm text-black mt-2">
        <div className="flex flex-row gap-1 items-center">
          <Image src="/avatar.svg" alt="sun" width={24} height={24} />
          <span className="text-xs">Don Tri</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Yesterday</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">25</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <span className="text-yellow-500">★★★★★</span>
        </div>
      </div>
      <p className="mt-4 text-black">
        One thing I learned when living in Canarsie section of Brooklyn, NY was
        how to cook a good Italian meal. Here is a recipe I created after having
        this dish in a restaurant. Hope you enjoy it!
      </p>
    </div>
  );
}
import { Clock, Users, ChefHat } from "lucide-react";
import Image from "next/image";

export default function RecipeDescription() {
  return (
    <div className="bg-blue-100 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
        <Image
          src="/images/Mighty Super Cheesecake.png"
          alt="Mighty Super Cheesecake"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Mighty Super Cheesecake
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Look no further for a creamy and ultra smooth classic cheesecake recipe!{" "}
            No one can deny its simple decadence.
          </p>
        </div>

        {/* Recipe Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6 border-y border-gray-200">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">PREP TIME</p>
            <p className="text-sm sm:text-base font-semibold">15 Minutes</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">COOK TIME</p>
            <p className="text-sm sm:text-base font-semibold">15 Minutes</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">SERVES</p>
            <p className="text-sm sm:text-base font-semibold">6 People</p>
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-white rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Nutrition Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div>
              <p className="text-lg sm:text-xl font-bold text-orange-500">219</p>
              <p className="text-xs sm:text-sm text-gray-500">Calories</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold">10g</p>
              <p className="text-xs sm:text-sm text-gray-500">Total Fat</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold">22g</p>
              <p className="text-xs sm:text-sm text-gray-500">Protein</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold">8g</p>
              <p className="text-xs sm:text-sm text-gray-500">Carbohydrate</p>
            </div>
          </div>
        </div>

        {/* Print Recipe Button */}
        <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
          <ChefHat className="w-5 h-5" />
          Print Recipe
        </button>
      </div>
    </div>
  );
}
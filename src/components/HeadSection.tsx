import { MoveRight, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-blue-100 rounded-xl flex flex-col lg:flex-row items-center min-h-[300px] lg:h-[400px] overflow-hidden mt-5">
      <div className="w-full lg:w-3/5 relative h-[200px] lg:h-full order-2 lg:order-1">
        <Image
          src={"/images/CheeseCake.png"}
          alt="Cheesecake"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full lg:w-2/5 p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
        <div className="flex flex-row space-x-2 mb-3 lg:mb-5">
          <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF642F]" />
          <p className="text-xs sm:text-sm">85% would make this again</p>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Mighty Super Cheesecake
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-700">
          Look no further for a creamy and ultra smooth classic cheesecake
          recipe! No one can deny its simple decadence.
        </p>
        <div className="flex flex-row space-x-2 justify-end items-end">
          <button className="mt-4 p-2 bg-white rounded-full text-orange-600 font-bold">
            <MoveRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
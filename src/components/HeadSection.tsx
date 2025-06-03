import { MoveRight, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-blue-100 rounded-xl flex items-center h-[400px] overflow-hidden mt-5">
      <div className="w-3/5 relative h-full">
        <Image
          src={"/images/CheeseCake.png"}
          alt="Cheesecake"
          fill
          objectFit="cover"
        />
      </div>
      <div className="w-2/5 p-8">
        <div className="flex flex-row space-x-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#FF642F]" />
          <p className="text-sm">85% would make this again</p>
        </div>
        <h1 className="text-3xl font-bold">Mighty Super Cheesecake</h1>
        <p className="mt-2 text-gray-700">
          Look no further for a creamy and ultra smooth classic cheesecake
          recipe! No one can deny its simple decadence.
        </p>
        <div className="flex flex-row space-x-2 justify-end items-end">
          <button className="mt-4 p-2 bg-white rounded-full text-orange-600 font-bold">
            <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

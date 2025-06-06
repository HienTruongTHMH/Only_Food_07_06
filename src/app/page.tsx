import { Suspense } from "react";
import HeadSection from "@/components/HeadSection";
import PopularCategories from "@/components/PopularCategories";
import SuperDelicious from "@/components/SuperDelicious";
import SweetTooth from "@/components/SweetTooth";

function LoadingSection() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <HeadSection />
      
      <Suspense fallback={<LoadingSection />}>
        <PopularCategories />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <SuperDelicious />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <SweetTooth />
      </Suspense>
    </main>
  );
}
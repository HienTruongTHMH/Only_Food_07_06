import Image from "next/image";
import { getCategories } from "@/data/recipe-service";

export default async function PopularCategories() {
  const categories = await getCategories();

  return (
    <section className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Danh mục phổ biến</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className="relative aspect-square w-full rounded-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover hover:scale-110 transition-all duration-700"
              />
            </div>
            <p className="text-center text-sm sm:text-base">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

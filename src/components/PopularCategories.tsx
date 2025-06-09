import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/data/recipe-service";

export default async function PopularCategories() {
  const categories = await getCategories();

  return (
    <section className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Categories</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        {categories.map((category) => (
          <Link 
            key={category.slug} 
            href={`/recipe/category/${category.slug}`}
            className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform w-full max-w-[180px]"
          >
            <div className="relative aspect-square w-full rounded-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover hover:scale-110 transition-all duration-700"
              />
            </div>
            <p className="text-center text-sm sm:text-base">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function FoodCard({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <Link href={`/recipe/${title}`} className="w-full cursor-pointer">
      <div className="relative h-[200px] overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={title}
          fill
          objectFit="cover"
          className="hover:scale-110 transition-all duration-700"
        />
      </div>
      <div className="mt-2">
        <p className="text-orange-500">★★★★★</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
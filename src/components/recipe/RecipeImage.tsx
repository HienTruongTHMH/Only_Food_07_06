import Image from "next/image";

export default function RecipeImage() {
  return (
    <div className="mt-6 relative w-full aspect-[16/9]">
      <Image
        src="/images/CheeseCake.png"
        alt="Strawberry Cheesecake"
        fill
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}
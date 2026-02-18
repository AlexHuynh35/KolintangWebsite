import Image from "next/image";

type FactProps = {
  title: string;
  description: string;
  imageUrl: string;
  onLeft: boolean;
};

export default function FactCard({ title, description, imageUrl, onLeft }: FactProps) {
  return (
    <div className={`max-w-4xl mx-auto my-6 flex ${onLeft ? "flex-row" : "flex-row-reverse"}`}>
      <div className="hidden md:block w-1/3 p-6">
        <div className="relative w-full aspect-1/1">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 pt-9 flex flex-col">
        <div className={`w-full mx-auto mb-4 flex ${onLeft ? "flex-row" : "flex-row-reverse"} items-center justify-center gap-x-4`}>
          <div className="h-2 bg-green-600 rounded flex-[0.25]" />
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700">{title}</h2>
          <div className="h-2 bg-green-600 rounded flex-[1]" />
        </div>
        <blockquote className={`text-xl text-balance ${onLeft ? "text-left" : "text-right"} italic text-green-700`}>
          {description}
        </blockquote>
      </div>
    </div>
  );
}

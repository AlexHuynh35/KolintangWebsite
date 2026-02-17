import Image from "next/image";

type PersonCardProps = {
  name: string;
  position: string;
  imageUrl: string;
};

export default function PersonCard({ name, position, imageUrl }: PersonCardProps) {
  return (
    <div className="relative group aspect-[5/3] flex flex-row items-center rounded-lg p-4 gap-4 hover:p-0 hover:pr-4 shadow bg-white hover:bg-green-800 hover:scale-105">
      <div className="relative w-1/2 aspect-[3/4]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-lg group-hover:rounded-r-none"
        />
      </div>
      <div className="relative w-1/2 flex flex-col justify-center text-center">
        <h3 className="text-xl font-semibold text-green-800 group-hover:text-white">{name}</h3>
        <p className="text-md text-gray-600 group-hover:text-white">{position}</p>
      </div>
    </div>
  );
}

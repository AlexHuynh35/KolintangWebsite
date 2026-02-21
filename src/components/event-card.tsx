import Image from "next/image";

type FactProps = {
  title: string;
  description: string;
  videoUrl: string;
};

export default function EventCard({ title, description, videoUrl }: FactProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col">
      <div className="w-full pb-6 flex flex-row items-center justify-center gap-x-4">
        <div className="h-2 bg-green-600 rounded flex-[0.5]" />
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700">{title}</h2>
        <div className="h-2 bg-green-600 rounded flex-[0.5]" />
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <div className="w-full md:w-1/2 aspect-video">
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full object-cover rounded-lg"
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <blockquote className="text-xl text-balance text-left text-green-700">
            {description}
          </blockquote>
        </div>
      </div>
    </div>
  );
}

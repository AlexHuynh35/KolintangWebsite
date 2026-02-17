type SectionTitleProps = {
  title: string;
  onLeft: boolean;
};

export default function SectionTitle({ title, onLeft }: SectionTitleProps) {
  return (
    <div className="w-full h-40 my-6">
      {onLeft ? (
        <div className="relative w-full h-full flex flex-row bg-black">
          <div className="absolute inset-0 bg-[url('/media/general/kolintang.jpeg')] bg-cover bg-center flex items-center [clip-path:polygon(0%_0%,69%_0%,59%_100%,0%_100%)] [transform:translateZ(0)]">
            <div className="w-2/5 h-1/2 flex items-center justify-center text-center text-xl md:text-3xl text-white bg-green-800 rounded-r-full">{title}</div>
          </div>
          <div className="absolute inset-0 bg-green-800 [clip-path:polygon(71%_0%,100%_0%,100%_100%,61%_100%)] [transform:translateZ(0)]"></div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-row bg-black">
          <div className="absolute inset-0 bg-[url('/media/general/kolintang.jpeg')] bg-cover bg-center flex flex-row-reverse items-center [clip-path:polygon(41%_0%,100%_0%,100%_100%,31%_100%)] [transform:translateZ(0)]">
            <div className="w-2/5 h-1/2 flex items-center justify-center text-center text-xl md:text-3xl text-white bg-green-800 rounded-l-full">{title}</div>
          </div>
          <div className="absolute inset-0 bg-green-800 [clip-path:polygon(0%_0%,39%_0%,29%_100%,0%_100%)] [transform:translateZ(0)]"></div>
        </div>
      )}
    </div>
  );
}

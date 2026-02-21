import Image from 'next/image';

export default function Hero() {
  return (
    <div id="hero" className="relative w-full">
      <div className="h-20 bg-black" />
      <div className="relative w-full h-[300px] md:h-[350px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-10" />
        <Image
          src="/media/general/kolintang.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute -bottom-20 w-80 md:w-160 h-30 flex items-center justify-center text-center text-3xl md:text-5xl text-white font-bold bg-green-800 rounded-r-full z-20">Cita Lomendehe</div>
      </div>
      <div className="relative h-20 bg-black">
        <div className="absolute inset-0 bg-green-800 z-10 [clip-path:polygon(0%_0%,69%_0%,64%_100%,0%_100%)] [transform:translateZ(0)]" />
        <div className="absolute inset-0 bg-green-600 z-10 [clip-path:polygon(71%_0%,100%_0%,100%_100%,66%_100%)] [transform:translateZ(0)]" />
      </div>
    </div>
  );
}
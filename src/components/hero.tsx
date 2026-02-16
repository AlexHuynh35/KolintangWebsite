import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full">
      <div className="h-20 bg-black" />
      <div className="relative w-full h-[300px] md:h-[350px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
        <Image
          src="/kolintang.jpeg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  );
}
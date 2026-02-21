import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-9 text-center">
        {/* Title / Organization Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Cita Lomendehe</h2>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Home */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              <Link href="/" className="hover:underline">Home</Link>
            </h3>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              <Link href="/about" className="hover:underline">About</Link>
            </h3>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              <Link href="/book" className="hover:underline">Booking</Link>
            </h3>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex justify-center space-x-4">
            <Link href="#" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
              <Image
                src="/media/icons/Facebook.jpg"
                alt="Facebook"
                width={32}
                height={32}
                className="rounded filter invert brightness-0"
              />
            </Link>
            <Link href="#" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
              <Image
                src="/media/icons/Instagram.jpg"
                alt="Instagram"
                width={32}
                height={32}
                className="rounded filter invert brightness-0"
              />
            </Link>
            <Link href="#" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
              <Image
                src="/media/icons/Youtube.jpg"
                alt="YouTube"
                width={32}
                height={32}
                className="rounded filter invert brightness-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
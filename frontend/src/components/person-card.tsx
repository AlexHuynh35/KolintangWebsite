"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Social, SocialType } from "@/data/people";

type PersonCardProps = {
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  socials: Social[];
};

export default function PersonCard({ name, position, description, imageUrl, socials }: PersonCardProps) {
  const [flipped, setFlipped] = useState<boolean>(false);

  function getSocialImage(type: SocialType) {
    return type == "facebook" ? "/media/icons/Facebook.jpg" : "/media/icons/Instagram.jpg"
  }

  return (
    <div onClick={() => setFlipped(!flipped)}>
      {!flipped ? (
        <div className="relative group aspect-[5/3] flex flex-row items-center rounded-lg p-4 gap-4 hover:p-0 hover:pr-4 shadow bg-white hover:bg-accent-dark hover:scale-105">
          <div className="relative w-1/2 aspect-[3/4]">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover rounded-lg group-hover:rounded-r-none"
            />
          </div>
          <div className="relative w-1/2 flex flex-col justify-center text-center">
            <h3 className="text-xl font-semibold text-accent-medium group-hover:text-white">{name}</h3>
            <p className="text-md text-gray-800 group-hover:text-white">{position}</p>
          </div>
        </div>
      ) : (
        <div className="relative group aspect-[5/3] flex flex-col justify-center items-center rounded-lg p-4 gap-4 shadow bg-white hover:bg-accent-dark hover:scale-105">
          <h3 className="text-xl font-semibold text-accent-medium group-hover:text-white">{name}</h3>
          <p className="text-md text-gray-800 group-hover:text-white">{description}</p>
          <div className="flex flex-row gap-4">
            {socials.map((social) =>
              <Link key={social.type} href={social.link} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                <Image
                  src={getSocialImage(social.type)}
                  alt={social.type}
                  width={32}
                  height={32}
                  className="rounded"
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import NotificationBanner from "@/partials/NotificationBanner";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

const images = [
  "/images/african-man.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
  "/images/african-man.jpg",
  "/images/woman-music.jpg",
];

function Page() {
  return (
    <main>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <NotificationBanner />
        <ParallaxScroll images={images} />
      </div>
    </main>
  );
}

export default Page;

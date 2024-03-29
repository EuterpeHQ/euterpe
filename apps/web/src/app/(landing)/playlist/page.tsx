import React from "react";

function Page() {
  return (
    <div className="flex h-screen flex-col items-center">
      <iframe
        className="flex flex-1 rounded-none bg-background"
        title="Spotify Playlist"
        src="https://open.spotify.com/embed/playlist/1UbCDNgvQYsMLMLFIHZfbX?utm_source=generator&theme=0"
        width="100%"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Page;

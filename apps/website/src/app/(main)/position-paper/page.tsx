import React from "react";
import Article from "@/partials/Article";

function Page() {
  const article = {
    slug: "position-paper",
    title: "Position Paper",
    image:
      "https://i.pinimg.com/474x/fb/1d/38/fb1d3843580fdf26c2c817a090f7de83.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  };
  return (
    <>
      <Article {...article} />
    </>
  );
}

export default Page;

"use server";
import Article from "@/partials/Article";

const articles = [
  {
    slug: "empowering-5000-music-artists",
    title: "Empowering 5,000 artists",
    image:
      "https://i.pinimg.com/564x/9e/7f/94/9e7f94361ba601097f50657a73024402.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
  {
    slug: "piecemeal-defi-for-musicians",
    title: "Piecemeal DeFi for Musicians",
    image:
      "https://i.pinimg.com/564x/0a/ec/2f/0aec2f08ff39e335b2e50a92720cc5c5.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
  {
    slug: "record-label-codependency",
    title: "Record Label Codependency",
    image:
      "https://i.pinimg.com/564x/78/0a/0e/780a0ed7dd9750046e7d6dbb962c1b41.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
  {
    slug: "a-new-kind-of-music-dream",
    title: "A New Kind of Music Dream",
    image:
      "https://i.pinimg.com/564x/3f/e4/bc/3fe4bca3cbe505ba57a08791b4ddc097.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
  {
    slug: "getting-started-with-harmonies",
    title: "Getting started with Harmonies",
    image:
      "https://i.pinimg.com/564x/f0/ac/5f/f0ac5f498b5d6a0cfaac8caa87cb7f00.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
  {
    slug: "bringing-smart-finance-to-everyone",
    title: "Bringing Smart Finance to everyone",
    image:
      "https://i.pinimg.com/564x/c7/51/48/c75148d8ff9319ea1016f21d6462abaa.jpg",
    author: "Euterpe",
    date: "August 29, 2024",
  },
];

export async function getAllArticles() {
  return articles;
}

export async function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

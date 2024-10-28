import React from "react";
import Article from "@/partials/Article";
import { type Article as ArticleType } from "@/types/entities";
import { getArticleBySlug } from "@/lib/actions/resources";

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  return (
    <>
      <Article {...(article as ArticleType)} />
    </>
  );
}

export default Page;

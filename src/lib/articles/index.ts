import type { TypeId } from "../content";
import { GUIDE_ARTICLES } from "./guides";
import { RELATIONSHIP_ARTICLES } from "./relationships";
import { STUDY_ARTICLES } from "./study";
import { WORK_ARTICLES } from "./work";
import type { Article } from "./types";

export * from "./types";

/** 公開中の記事（日本語のみ） */
export const ARTICLES: readonly Article[] = [...GUIDE_ARTICLES, ...STUDY_ARTICLES, ...WORK_ARTICLES, ...RELATIONSHIP_ARTICLES];

export const getArticle = (slug: string): Article | undefined => ARTICLES.find((a) => a.slug === slug);

export const articlesForType = (typeId: TypeId): Article[] => ARTICLES.filter((a) => a.typeId === typeId);

/**
 * 同じタイプの別テーマ → 同じテーマの別タイプ、の順で関連記事を選ぶ。
 * 伝え方ガイドは、ほかのガイド → タイプ別の人間関係、の順
 */
export const relatedArticles = (article: Article, limit = 4): Article[] => {
  if (article.typeId === null) {
    const guides = ARTICLES.filter((a) => a.topic === "guide" && a.slug !== article.slug);
    const relationships = ARTICLES.filter((a) => a.topic === "relationships");
    return [...guides, ...relationships].slice(0, limit);
  }
  const sameType = ARTICLES.filter((a) => a.typeId === article.typeId && a.slug !== article.slug);
  const sameTopic = ARTICLES.filter((a) => a.topic === article.topic && a.typeId !== article.typeId);
  return [...sameType, ...sameTopic].slice(0, limit);
};

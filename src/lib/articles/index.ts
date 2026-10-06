import type { TypeId } from "../content";
import { STUDY_ARTICLES } from "./study";
import { WORK_ARTICLES } from "./work";
import type { Article } from "./types";

export * from "./types";

/** 公開中の記事（日本語のみ） */
export const ARTICLES: readonly Article[] = [...STUDY_ARTICLES, ...WORK_ARTICLES];

export const getArticle = (slug: string): Article | undefined => ARTICLES.find((a) => a.slug === slug);

export const articlesForType = (typeId: TypeId): Article[] => ARTICLES.filter((a) => a.typeId === typeId);

/** 同じタイプの別テーマ → 同じテーマの別タイプ、の順で関連記事を選ぶ */
export const relatedArticles = (article: Article, limit = 4): Article[] => {
  const sameType = ARTICLES.filter((a) => a.typeId === article.typeId && a.slug !== article.slug);
  const sameTopic = ARTICLES.filter((a) => a.topic === article.topic && a.typeId !== article.typeId);
  return [...sameType, ...sameTopic].slice(0, limit);
};

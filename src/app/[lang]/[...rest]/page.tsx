import { notFound } from "next/navigation";

/** 存在しないURLを [lang] のレイアウト内の404ページで表示するための受け皿 */
export default function CatchAll() {
  notFound();
}

import styles from "./Comment.module.css";
import { Parser as HtmlToReactParser } from "html-to-react";
import { formatDateFromNow } from "../../../utils/format-date";
import { memo } from "react";

type CommentProps = {
  author: string;
  content: string;
  createdAt: Date;
};

export const Comment = memo(function Comment({ author, content, createdAt }: CommentProps) {
  const htmlToReactParser = new HtmlToReactParser();

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentMetadata}>
        <span className={styles.authorName}>{author}</span>
        <span className={styles.authorName}>{formatDateFromNow(createdAt)}</span>
      </div>
      <div>
        <p>{htmlToReactParser.parse(content)}</p>
      </div>
    </div>
  );
});

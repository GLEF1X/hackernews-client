import { type ArticleComment } from "../services/api/types";
import type { DataNode } from "antd/es/tree";

type Id = number;

type CommentType = Omit<ArticleComment, "kids"> & {
  kids?: Array<CommentType | number>;
};

export class CommentNode implements DataNode {
  public readonly id: number;
  public readonly title: string;
  public readonly key: string;
  public readonly parentId?: number;
  public readonly isLeaf: boolean;
  public readonly authorNickname: string;

  // @ts-ignore
  public children: CommentNode[] | Id[];

  public constructor(
    id: number,
    title: string,
    key: string,
    authorNickname: string,
    children?: CommentNode[] | Id[],
    parentId?: number
  ) {
    this.id = id;
    this.children = children ?? [];
    this.title = title;
    this.key = key;
    this.authorNickname = authorNickname;
    this.parentId = parentId;
    this.isLeaf = !this.children.length;
  }

  public static fromComment(comment: CommentType) {
    return new CommentNode(
      comment.id,
      comment.text,
      comment.id.toString(),
      comment.by,
      // @ts-ignore
      comment.kids,
      comment.parent
    );
  }

  public get isChildrenLoaded(): boolean {
    return !(this.children as any[]).every((v) => typeof v === "number" && isFinite(v));
  }

  public get isRootNode(): boolean {
    return !!this.parentId;
  }
}

export const updateChildrenOfCommentNode = (
  treeNodes: CommentNode[],
  id: number,
  childrenNodesToInsert: CommentNode[]
): CommentNode[] =>
  treeNodes.map((node) => {
    if (node.id === id) {
      return new CommentNode(
        node.id,
        node.title,
        node.key,
        node.authorNickname,
        childrenNodesToInsert,
        node.parentId
      );
    }

    // Comments are loaded, so they are not just ids(numbers)
    if (node.isChildrenLoaded) {
      const subNodes = node.children as CommentNode[];

      return new CommentNode(
        node.id,
        node.title,
        node.key,
        node.authorNickname,
        updateChildrenOfCommentNode(subNodes, id, childrenNodesToInsert),
        node.parentId
      );
    }
    return node;
  });

export const convertCommentsToCommentNodes = (comments: CommentType[]): CommentNode[] =>
  comments.map((comment) => {
    const treeNode = CommentNode.fromComment(comment);

    if (!treeNode.isChildrenLoaded) {
      return treeNode;
    }

    const commentChildren = comment.kids as ArticleComment[];

    return new CommentNode(
      treeNode.id,
      treeNode.title,
      treeNode.key,
      treeNode.authorNickname,
      convertCommentsToCommentNodes(commentChildren),
      treeNode.parentId
    );
  });

export function findNodeInTree(treeNodes: CommentNode[], id: number): CommentNode | null {
  const stack = Array.from(treeNodes);

  while (stack.length) {
    const node = stack.shift() as CommentNode;

    if (node.id === id) {
      return node;
    }
    if (node.children && node.children.length > 0 && node.isChildrenLoaded) {
      const nodeChildren = node.children as CommentNode[];

      stack.push(...nodeChildren);
    }
  }

  return null;
}

import { type ArticleComment } from "../services/api/types";

type Id = number;

type CommentType = Omit<ArticleComment, "kids"> & {
  kids?: Array<CommentType | number>;
};

export class CommentNode {
  public isLeaf: boolean;
  public id: number;
  public children: CommentNode[] | Id[];
  public title: string;
  public key: string;
  public parentId?: number;

  public constructor(
    id: number,
    title: string,
    key: string,
    children?: CommentNode[] | Id[],
    parentId?: number
  ) {
    this.id = id;
    this.children = children ?? [];
    this.title = title;
    this.key = key;
    this.parentId = parentId;
    this.isLeaf = !this.children.length;
  }

  public static fromComment(comment: CommentType) {
    return new CommentNode(
      comment.id,
      comment.id.toString(),
      comment.id.toString(),
      // @ts-ignore
      comment.kids,
      comment.parent
    );
  }

  get isChildrenLoaded(): boolean {
    return !(this.children as any[]).every((v) => typeof v === "number" && isFinite(v));
  }

  get isRootNode(): boolean {
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
      return new CommentNode(node.id, node.title, node.key, childrenNodesToInsert, node.parentId);
    }

    // Comments are loaded, so they are not just ids(numbers)
    if (node.isChildrenLoaded) {
      const subNodes = node.children as CommentNode[];

      return new CommentNode(
        node.id,
        node.title,
        node.key,
        updateChildrenOfCommentNode(subNodes, id, childrenNodesToInsert),
        node.parentId
      );
    }
    return node;
  });

export const convertCommentsToCommentNodes = (comments: CommentType[]): CommentNode[] =>
  comments.map((comment) => {
    const treeNode = CommentNode.fromComment(comment);

    // In some cases comment.kids might be fulfilled with both
    // TreeNode and id's since there is no guarantee
    if (!comment.kids || !comment.kids.length || comment.kids.some(isFinite)) {
      return treeNode;
    }

    const commentChildren = comment.kids as ArticleComment[];

    return new CommentNode(
      treeNode.id,
      treeNode.title,
      treeNode.key,
      convertCommentsToCommentNodes(commentChildren),
      treeNode.parentId
    );
  });

export function findNodeInTree(treeNodes: CommentNode[], id: number): CommentNode | undefined {
  for (const node of treeNodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children && node.children.length > 0 && node.isChildrenLoaded) {
      const nodeChildren = node.children as CommentNode[];

      return findNodeInTree(nodeChildren, id);
    }
  }
}

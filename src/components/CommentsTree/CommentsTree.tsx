import * as React from "react";
import { useGetComments } from "../../hooks/api/useGetComments";
import {
  CommentNode,
  convertCommentsToCommentNodes,
  findNodeInTree,
  updateChildrenOfCommentNode,
} from "../../utils/tree";
import { Tree } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { newsQueryKeys } from "../../hooks/api/query-keys";
import { useApiClient } from "../../services/api/api-client";
import { EventDataNode } from "antd/es/tree";
import { Parser as HtmlToReactParser } from "html-to-react";

export default React.memo(function CommentsTree({
  commentIds,
  articleId,
}: {
  commentIds: number[];
  articleId: number;
}) {
  const { data } = useGetComments(commentIds, articleId, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const queryClient = useQueryClient();
  const apiClient = useApiClient();
  const comments = data ?? [];

  const onExpandNode = ({ key }: EventDataNode<CommentNode>) =>
    queryClient.prefetchQuery(
      newsQueryKeys.getComments(articleId),
      async () => {
        const parentCommentId = parseInt(key);
        const node = findNodeInTree(comments, parentCommentId);

        if (!node || node.isLeaf || node.isChildrenLoaded) {
          return comments;
        }

        const childrenIds = node.children as number[];
        const commentChildren = await apiClient.getComments(childrenIds);

        return updateChildrenOfCommentNode(
          comments,
          parentCommentId,
          convertCommentsToCommentNodes(commentChildren)
        );
      },
      { staleTime: 0, cacheTime: 0 }
    );

  const titleRender = (nodeData: CommentNode): React.ReactNode => {
    const htmlToReactParser = new HtmlToReactParser();
    const nodeText = nodeData.title as string;

    const x = htmlToReactParser.parse(nodeText);

    console.log(x);
    return x;
  };

  return (
    <Tree
      loadData={onExpandNode}
      treeData={comments}
      showIcon={false}
      //@ts-expect-error
      titleRender={titleRender}
    />
  );
});

import * as React from "react";
import { useGetComments } from "../../hooks/api/useGetComments";
import {
  convertCommentsToCommentNodes,
  findNodeInTree,
  updateChildrenOfCommentNode,
} from "../../utils/tree";
import { Tree } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { newsQueryKeys } from "../../hooks/api/query-keys";
import { useApiClient } from "../../services/api/api-client";

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

  const onExpandNode = ({ key }: { key: string }) =>
    queryClient.prefetchQuery(
      newsQueryKeys.getComments(articleId),
      async () => {
        const node = findNodeInTree(comments, parseInt(key));

        if (!node || node.isLeaf || node.isChildrenLoaded) {
          console.log(`Node ${key} was not found or it's a leaf or children already loaded.`);
          return comments;
        }

        const childrenIds = node.children as number[];
        const childrenComments = await apiClient.getComments(childrenIds);

        return updateChildrenOfCommentNode(
          comments,
          parseInt(key),
          convertCommentsToCommentNodes(childrenComments)
        );
      },
      { staleTime: 0, cacheTime: 0 }
    );

  return <Tree loadData={onExpandNode} treeData={comments} />;
});

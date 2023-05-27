import { Skeleton } from "antd";
import React from "react";

export function CommentsTreeSkeleton() {
  return (
    <div>
      {Array(3)
        .fill(null)
        .map(() => (
          <Skeleton active style={{ marginBottom: "5px" }} />
        ))}
    </div>
  );
}

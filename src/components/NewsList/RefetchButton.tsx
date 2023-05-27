import * as React from "react";
import { useState } from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { UseQueryResult } from "@tanstack/react-query";

type RefetchButtonProps = {
  refetch: UseQueryResult["refetch"];
};

export const RefetchButton = React.memo(function RefetchButton({ refetch }: RefetchButtonProps) {
  const [isRefetchingManually, setIsRefetchingManually] = useState<boolean>(false);

  const refetchNewsManually = () => {
    setIsRefetchingManually(true);
    refetch({ throwOnError: true })
      .then(() => {
        setIsRefetchingManually(false);
      })
      .catch(() => setIsRefetchingManually(false));
  };

  return (
    <>
      <Button
        icon={<ReloadOutlined />}
        type="primary"
        size="large"
        loading={isRefetchingManually}
        onClick={refetchNewsManually}
        style={{
          position: "fixed",
          right: "24px",
          cursor: "pointer",
          zIndex: 99,
          insetInlineEnd: "24px",
          insetBlockEnd: "48px",
          border: "none",
          borderRadius: "100%",
        }}
      />
    </>
  );
});

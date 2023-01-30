import React from "react";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTabs from "@/common/components/BaseTabs/BaseTabs";
import MyRequests from "../components/MyRequests/MyRequests";

const MyWorkspace: React.FC = () => {
  return (
    <BaseSection>
      <BaseTabs
        isFitted
        tabs={[
          { label: "My requests", panel: <MyRequests /> },
          { label: "My proposals", panel: "Soon" },
        ]}
      />
    </BaseSection>
  );
};

export default MyWorkspace;

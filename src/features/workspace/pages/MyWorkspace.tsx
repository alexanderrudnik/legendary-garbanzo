import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTabs from "@/common/components/BaseTabs/BaseTabs";
import React from "react";

const MyWorkspace: React.FC = () => {
  return (
    <BaseSection>
      <BaseTabs
        variant="enclosed-colored"
        isFitted
        tabs={[
          { label: "User settings", panel: "Soon" },
          { label: "Workspace settings", panel: "Soon" },
          { label: "Notification settings", panel: "Soon" },
        ]}
      />
    </BaseSection>
  );
};

export default MyWorkspace;

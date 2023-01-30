import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTabs from "@/common/components/BaseTabs/BaseTabs";
import React from "react";

const Settings: React.FC = () => {
  return (
    <BaseSection>
      <BaseTabs
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

export default Settings;

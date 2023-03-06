import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTabs from "@/common/components/BaseTabs/BaseTabs";
import React from "react";
import NotificationSettings from "../components/NotificationSettings/NotificationSettings";
import UserSettings from "../components/UserSettings/UserSettings";
import WorkspaceSettings from "../components/WorkspaceSettings/WorkspaceSettings";

const Settings: React.FC = () => {
  return (
    <BaseSection>
      <BaseTabs
        isFitted
        tabs={[
          { label: "User settings", panel: <UserSettings /> },
          { label: "Workspace settings", panel: <WorkspaceSettings /> },
          { label: "Notification settings", panel: <NotificationSettings /> },
        ]}
      />
    </BaseSection>
  );
};

export default Settings;

import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import React from "react";
import UpdateEmail from "../UpdateEmail/UpdateEmail";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import UpdatePersonalInfo from "../UpdatePersonalInfo/UpdatePersonalInfo";

const UserSettings: React.FC = () => {
  return (
    <BaseFlex gap="0rem" flexDirection="column">
      <BaseSection>
        <UpdateEmail />
      </BaseSection>

      <BaseSection>
        <UpdatePassword />
      </BaseSection>
      <BaseSection>
        <UpdatePersonalInfo />
      </BaseSection>
    </BaseFlex>
  );
};

export default UserSettings;

import React from "react";
import { Outlet } from "react-router-dom";

import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";

import AuthBG from "@/app/assets/images/auth-bg.webp";

const AuthLayout: React.FC = () => {
  return (
    <BaseSection
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage={AuthBG}
      backgroundSize="cover"
    >
      <BaseCenter width="100%" maxWidth={400}>
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      </BaseCenter>
    </BaseSection>
  );
};

export default AuthLayout;

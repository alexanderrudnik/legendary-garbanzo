import React from "react";
import { Outlet } from "react-router-dom";

import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";

import AuthBGLight from "@/app/assets/images/auth-bg-light.webp";
import AuthBGDark from "@/app/assets/images/auth-bg-dark.webp";
import { useColorModeValue } from "@chakra-ui/react";
import BaseCard from "@/common/components/BaseCard/BaseCard";

const AuthLayout: React.FC = () => {
  const bg = useColorModeValue(AuthBGLight, AuthBGDark);
  const cardBG = useColorModeValue(
    "var(--chakra-colors-white)",
    "var(--chakra-colors-gray-700)"
  );

  return (
    <main>
      <BaseSection
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundImage={bg}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <BaseCenter width="100%" maxWidth={400}>
          <BaseContainer>
            <BaseCard background={cardBG} variant="filled">
              <Outlet />
            </BaseCard>
          </BaseContainer>
        </BaseCenter>
      </BaseSection>
    </main>
  );
};

export default AuthLayout;

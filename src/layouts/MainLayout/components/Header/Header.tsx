import React from "react";
import { Flex } from "@chakra-ui/react";
import BaseMenu from "@/common/components/BaseMenu/BaseMenu";
import { useMe } from "@/common/hooks/useMe";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import { authService } from "@/services/auth/authService";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import { RouteEnum } from "@/common/models/RouteEnum";

const Header: React.FC = () => {
  const { data: user } = useMe();

  const signOut = () => {
    authService.signOut();
  };

  return (
    <BaseBox
      zIndex={999}
      as="header"
      position="sticky"
      padding="1rem 0"
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)"
    >
      <BaseContainer>
        <Flex justify="end">
          <BaseMenu
            trigger={`${user?.firstName} ${user?.lastName}`}
            items={[
              {
                label: "Invite a user",
                href: RouteEnum.INVITE,
              },
              {
                label: "Sign out",
                onClick: () => signOut(),
                danger: true,
              },
            ]}
          />
        </Flex>
      </BaseContainer>
    </BaseBox>
  );
};

export default Header;
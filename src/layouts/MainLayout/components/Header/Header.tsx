import React, { useMemo } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import BaseMenu from "@/common/components/BaseMenu/BaseMenu";
import { useMe } from "@/common/hooks/useMe";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import { authService } from "@/services/auth/authService";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import { RouteEnum } from "@/common/models/RouteEnum";
import BaseImage from "@/common/components/BaseImage/BaseImage";
import logo from "@/app/assets/images/logo.png";
import { Link } from "react-router-dom";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import { useColorMode, useColorModeValue, useTheme } from "@chakra-ui/react";

const Header: React.FC = () => {
  const { data: user } = useMe();

  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  const { toggleColorMode, colorMode } = useColorMode();

  const shadow = useColorModeValue(
    "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)",
    "0px 0px 4px rgba(255, 255, 255, 0.04), 0px 4px 8px rgba(255, 255, 255, 0.06)"
  );

  const signOut = () => {
    authService.signOut();
  };

  const theme = useTheme();

  const menu = useMemo(
    () => [
      {
        label: "Invite a user",
        href: RouteEnum.INVITE,
      },
      {
        label: `Toggle ${colorMode === "dark" ? "light" : "dark"}`,
        onClick: () => toggleColorMode(),
      },
      {
        label: "Sign out",
        onClick: () => signOut(),
        danger: true,
      },
    ],
    [colorMode, toggleColorMode]
  );

  const name = useMemo(() => `${user?.firstName} ${user?.lastName}`, [user]);

  return (
    <BaseBox
      zIndex={999}
      as="header"
      position="sticky"
      padding="1rem 0"
      boxShadow={shadow}
    >
      <BaseContainer>
        <BaseFlex justify="space-between" align="center">
          <Link to={RouteEnum.HOME}>
            <BaseImage
              transition="all 0.3s ease"
              _hover={{
                filter: `drop-shadow(5px 5px 5px ${theme.colors.primary[500]})`,
              }}
              width={200}
              src={logo}
              alt="logo"
            />
          </Link>

          <BaseButton
            display={{
              md: "none",
            }}
            variant="ghost"
            onClick={onOpen}
          >
            <HamburgerIcon />

            <MenuDrawer
              isOpen={isOpen}
              onClose={onClose}
              name={name}
              menu={menu}
            />
          </BaseButton>

          <BaseBox
            display={{
              base: "none",
              md: "block",
            }}
          >
            <BaseMenu trigger={name} items={menu} />
          </BaseBox>
        </BaseFlex>
      </BaseContainer>
    </BaseBox>
  );
};

export default Header;

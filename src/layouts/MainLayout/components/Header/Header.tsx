import React, { useMemo } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import BaseMenu from "@/common/components/BaseMenu/BaseMenu";
import { useMe } from "@/common/hooks/useMe";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
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
import { storageService } from "@/services/storage/storageService";
import { StorageEnum } from "@/common/models/StorageEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";

const Header: React.FC = () => {
  const { data: user } = useMe();

  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  const { toggleColorMode, colorMode } = useColorMode();

  const theme = useTheme();

  const shadow = useColorModeValue(
    "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)",
    "none"
  );

  const bg = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  const signOut = () => {
    storageService.remove(StorageEnum.ACCESS_TOKEN);
    queryClient.setQueryData(QueryKeysEnum.ME, () => undefined);
  };

  const nav = useMemo(
    () => [
      {
        label: "Requests",
        href: RouteEnum.REQUESTS,
      },
      {
        label: "Proposals",
        href: RouteEnum.PROPOSALS,
      },
      {
        label: "Contact us",
        href: RouteEnum.CONTACT_US,
      },
    ],
    []
  );

  const menu = useMemo(
    () => [
      {
        label: "My workspace",
        href: RouteEnum.MY_WORKSPACE,
      },
      {
        label: "Notifications",
      },
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
      background={bg}
    >
      <BaseContainer>
        <BaseFlex justify="space-between" align="center">
          <BaseFlex
            align="center"
            gap={{
              base: "2rem",
              xl: "10rem",
            }}
          >
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

            <BaseFlex
              display={{
                base: "none",
                md: "flex",
              }}
              gap={{
                base: "2rem",
                xl: "5rem",
              }}
            >
              {nav.map((item) => (
                <Link key={item.label} to={item.href}>
                  <BaseButton
                    variant="unstyled"
                    _hover={{ color: "primary.500" }}
                  >
                    {item.label}
                  </BaseButton>
                </Link>
              ))}
            </BaseFlex>
          </BaseFlex>

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
              menu={[...nav, ...menu]}
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

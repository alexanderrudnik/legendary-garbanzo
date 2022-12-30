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

const Header: React.FC = () => {
  const { data: user } = useMe();

  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  const signOut = () => {
    authService.signOut();
  };

  const menu = useMemo(
    () => [
      {
        label: "Invite a user",
        href: RouteEnum.INVITE,
      },
      {
        label: "Sign out",
        onClick: () => signOut(),
        danger: true,
      },
    ],
    []
  );

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
    ],
    []
  );

  const name = useMemo(() => `${user?.firstName} ${user?.lastName}`, [user]);

  return (
    <BaseBox
      zIndex={999}
      as="header"
      position="sticky"
      padding="1rem 0"
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)"
    >
      <BaseContainer>
        <BaseFlex gap="5rem" align="center">
          <Link to={RouteEnum.HOME}>
            <BaseImage width={200} src={logo} alt="logo" />
          </Link>

          <BaseFlex flexGrow={1} justify="space-between" align="center">
            <BaseFlex
              display={{
                base: "none",
                md: "flex",
              }}
              gap="2rem"
            >
              {nav.map((item, i) => (
                <Link key={i} to={item.href}>
                  <BaseButton variant="link" _hover={{ color: "primary" }}>
                    {item.label}
                  </BaseButton>
                </Link>
              ))}
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
        </BaseFlex>
      </BaseContainer>
    </BaseBox>
  );
};

export default Header;

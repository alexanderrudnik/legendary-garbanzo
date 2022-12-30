import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import BaseButton from "../BaseButton/BaseButton";
import { Link } from "react-router-dom";
import BaseText from "../BaseText/BaseText";

interface Props extends Omit<MenuProps, "children"> {
  trigger: React.ReactNode;
  items: {
    href?: string;
    label: string;
    onClick?: () => void;
    danger?: boolean;
  }[];
}

const BaseMenu: React.FC<Props> = ({ trigger, items, ...props }) => {
  return (
    <Menu {...props}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={BaseButton}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            {trigger}
          </MenuButton>
          <MenuList>
            {items.map((item, i) => (
              <MenuItem
                key={i}
                {...(item.onClick && { onClick: item.onClick })}
              >
                {item.href ? (
                  <Link to={item.href}>
                    <BaseText color="error">{item.label}</BaseText>
                  </Link>
                ) : (
                  <BaseText color="red">{item.label}</BaseText>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default BaseMenu;

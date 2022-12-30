import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseDrawer from "@/common/components/BaseDrawer/BaseDrawer";
import BaseList from "@/common/components/BaseList/BaseList";
import { MenuItem } from "@/common/components/BaseMenu/BaseMenu";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  menu: MenuItem[];
}

const MenuDrawer: React.FC<Props> = ({ isOpen, onClose, name, menu }) => {
  const navigate = useNavigate();

  const handleClick = (onClick?: () => void, href?: string) => () => {
    onClose();

    if (onClick) {
      onClick();
    }

    if (href) {
      navigate(href);
    }
  };

  return (
    <BaseDrawer isOpen={isOpen} onClose={onClose} header={name}>
      <BaseList spacing="1rem">
        {menu.map((item, i) => (
          <BaseButton
            key={i}
            width="100%"
            {...(item.danger && { color: "red" })}
            variant="ghost"
            onClick={handleClick(item.onClick, item.href)}
          >
            {item.label}
          </BaseButton>
        ))}
      </BaseList>
    </BaseDrawer>
  );
};

export default MenuDrawer;

import React from "react";
import BaseButton from "../BaseButton/BaseButton";
import BaseFlex from "../BaseFlex/BaseFlex";
import BasePopover, { BasePopoverProps } from "../BasePopover/BasePopover";
import BaseText from "../BaseText/BaseText";

interface Props extends Omit<BasePopoverProps, "children"> {
  text: string;
  onOk: () => void;
  isLoading?: boolean;
}

const BasePopconfirm: React.FC<Props> = ({
  text,
  onOk,
  isLoading,
  ...props
}) => {
  return (
    <BasePopover {...props}>
      <BaseFlex flexDirection="column" gap="0.5rem">
        <BaseText>{text}</BaseText>
        <BaseFlex gap="0.5rem">
          <BaseButton
            isLoading={isLoading}
            onClick={() => {
              onOk();
            }}
          >
            OK
          </BaseButton>
          <BaseButton variant="outline" onClick={props.onClose}>
            Cancel
          </BaseButton>
        </BaseFlex>
      </BaseFlex>
    </BasePopover>
  );
};

export default BasePopconfirm;

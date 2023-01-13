import React from "react";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseText from "@/common/components/BaseText/BaseText";
import { IRequest } from "@/services/request/types";
import { CopyIcon } from "@chakra-ui/icons";
import BaseTooltip from "@/common/components/BaseTooltip/BaseTooltip";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";

interface Props {
  contact: IRequest["contact"] | null;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const {
    isOpen: isOpenEmailTooltip,
    onClose: onCloseEmailTooltip,
    onOpen: onOpenEmailTooltip,
  } = useBaseDisclosure();
  const {
    isOpen: isOpenTelegramTooltip,
    onClose: onCloseTelegramTooltip,
    onOpen: onOpenTelegramTooltip,
  } = useBaseDisclosure();

  const copyToClipboard = async (
    text: string,
    variant: "email" | "telegram"
  ) => {
    await navigator.clipboard.writeText(text);

    if (variant === "email") {
      onOpenEmailTooltip();

      setTimeout(() => {
        onCloseEmailTooltip();
      }, 1000);
    } else {
      onOpenTelegramTooltip();

      setTimeout(() => {
        onCloseTelegramTooltip();
      }, 1000);
    }
  };

  return (
    <BaseFlex gap="1rem" direction="column">
      {contact?.email && (
        <BaseFlex gap="0.5rem" align="center">
          <BaseText>Email:</BaseText>
          <BaseText>
            <b>{contact?.email}</b>
          </BaseText>
          <BaseTooltip isOpen={isOpenEmailTooltip} label="Copied!">
            <BaseButton
              variant="link"
              onClick={() => copyToClipboard(contact.email, "email")}
              aria-label="copy"
            >
              <CopyIcon />
            </BaseButton>
          </BaseTooltip>
        </BaseFlex>
      )}

      {contact?.telegram && (
        <BaseFlex gap="0.5rem" align="center">
          <BaseText>Telegram:</BaseText>
          <BaseText>
            <b>{contact?.telegram}</b>
          </BaseText>
          <BaseTooltip isOpen={isOpenTelegramTooltip} label="Copied!">
            <BaseButton
              variant="link"
              onClick={() => copyToClipboard(contact.telegram!, "telegram")}
              aria-label="copy"
            >
              <CopyIcon />
            </BaseButton>
          </BaseTooltip>
        </BaseFlex>
      )}
    </BaseFlex>
  );
};

export default Contact;

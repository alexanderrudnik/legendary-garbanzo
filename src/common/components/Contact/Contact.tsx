import React from "react";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseText from "@/common/components/BaseText/BaseText";
import { IRequest } from "@/services/request/types";
import { CopyIcon } from "@chakra-ui/icons";
import BaseTooltip from "@/common/components/BaseTooltip/BaseTooltip";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { Proposal } from "@/services/proposal/types";

interface Props {
  contact: IRequest["contact"] | Proposal["contact"] | null;
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
            <a
              target="_blank"
              rel="noreferrer"
              href={`mailto:${contact?.email}`}
            >
              <BaseButton variant="link">{contact?.email}</BaseButton>
            </a>
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
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://t.me/${contact?.telegram}`}
            >
              <BaseButton variant="link">
                https://t.me/{contact?.telegram}
              </BaseButton>
            </a>
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

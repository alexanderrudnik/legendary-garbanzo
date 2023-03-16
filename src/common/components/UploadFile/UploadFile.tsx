import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useRef } from "react";
import BaseBox from "../BaseBox/BaseBox";
import BaseButton from "../BaseButton/BaseButton";
import BaseInput from "../BaseInput/BaseInput";
import BaseText from "../BaseText/BaseText";

interface Props {
  accept: string;
  value: File | undefined;
  onChange: (value: File | undefined) => void;
  onDelete: () => void;
}

const UploadFile: React.FC<Props> = ({
  accept,
  value,
  onChange,
  onDelete,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    inputRef?.current?.click();
  };

  console.log(value);

  return (
    <>
      <BaseInput
        ref={inputRef}
        type="file"
        accept={accept}
        display="none"
        onChange={(event) => onChange(event.target.files?.[0])}
        {...props}
      />
      <BaseButton
        leftIcon={<AttachmentIcon />}
        variant="outline"
        onClick={handleClick}
      >
        Choose file
      </BaseButton>
      <BaseBox position="relative">
        {value && (
          <BaseButton
            colorScheme="red"
            variant="link"
            position="absolute"
            top="0"
            right="0"
            transform="translate(50%,-100%)"
            onClick={onDelete}
          >
            <CloseIcon />
          </BaseButton>
        )}
        <BaseText
          maxWidth={{
            base: "100px",
            md: "300px",
          }}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {value?.name}
        </BaseText>
      </BaseBox>
    </>
  );
};

export default UploadFile;

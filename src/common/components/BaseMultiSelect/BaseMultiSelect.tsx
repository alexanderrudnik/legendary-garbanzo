import { ChevronDownIcon } from "@chakra-ui/icons";
import { useColorModeValue, useTheme } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import React from "react";
import BaseInputGroup from "../BaseInputGroup/BaseInputGroup";
import BaseInputRightElement from "../BaseInputRightElement/BaseInputRightElement";

interface Props {
  placeholder: string;
  value: string[];
  onChange: (values: string[]) => void;
  onBlur: () => void;
  invalid: boolean;
}

const BaseAutoComplete: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  invalid,
}) => {
  const theme = useTheme();

  const focusBorderColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  const errorBorderColor = useColorModeValue("#E53E3E", "#FC8181");

  const backgroundColor = useColorModeValue(
    theme.colors.gray[100],
    theme.colors.whiteAlpha[50]
  );

  const hoverBackgroundColor = useColorModeValue(
    theme.colors.gray[200],
    theme.colors.whiteAlpha[100]
  );

  return (
    <AutoComplete multiple creatable value={value} onChange={onChange}>
      <BaseInputGroup>
        <AutoCompleteInput
          background={backgroundColor}
          aria-invalid={invalid}
          _invalid={{
            borderColor: errorBorderColor,
          }}
          variant="filled"
          _focus={{
            borderColor: focusBorderColor,
            background: "transparent",
          }}
          _hover={{ background: hoverBackgroundColor }}
          placeholder={placeholder}
          onBlur={onBlur}
        >
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))
          }
        </AutoCompleteInput>
        <BaseInputRightElement
          children={<ChevronDownIcon fontSize="1.25rem" />}
        />
      </BaseInputGroup>
      <AutoCompleteList>
        <AutoCompleteCreatable />
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default BaseAutoComplete;

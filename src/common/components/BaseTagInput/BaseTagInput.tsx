import React, { useCallback, useMemo, useState } from "react";
import {
  useColorModeValue,
  useMultiStyleConfig,
  useTheme,
} from "@chakra-ui/react";
import BaseInput, { BaseInputProps } from "../BaseInput/BaseInput";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseTag from "../BaseTag/BaseTag";
import { useComponentVisible } from "@/common/hooks/useComponentVisible";
import BaseBox from "../BaseBox/BaseBox";
import BaseText from "../BaseText/BaseText";

interface Props extends Omit<BaseInputProps, "value" | "onChange"> {
  defaultValues: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

const BaseTagInput = React.forwardRef<any, Props>(
  (
    { value = [], onChange, isInvalid, onBlur, defaultValues, ...props },
    ref
  ) => {
    const {
      setIsComponentVisible,
      ref: popupRef,
      isComponentVisible,
    } = useComponentVisible(false);

    const [inputValue, setInputValue] = useState("");

    const theme = useTheme();

    const color = useColorModeValue(
      theme.colors.primary[500],
      theme.colors.primary[200]
    );

    const popupBg = useColorModeValue(
      "var(--chakra-colors-white)",
      "var(--chakra-colors-gray-700)"
    );

    const themeInput = useMultiStyleConfig("Input", {
      ...theme.components.Input.defaultProps,
      ...props,
      focusBorderColor: color,
    });

    const handleAdd = useCallback(
      (text: string) => {
        const trimmedValue = text.trim();

        if (trimmedValue) {
          if (!value?.includes(trimmedValue)) {
            onChange([...value, trimmedValue]);
          }
        }
        setInputValue("");
      },
      [onChange, value]
    );

    const handleOpenPopup = useCallback(() => {
      setIsComponentVisible(true);
    }, [setIsComponentVisible]);

    const filteredDefaultValues = useMemo(
      () =>
        inputValue
          ? defaultValues.filter((value) =>
              value
                .trim()
                .toLowerCase()
                .includes(inputValue.trim().toLowerCase())
            )
          : defaultValues,
      [defaultValues, inputValue]
    );

    return (
      <BaseBox position="relative">
        <BaseFlex
          aria-invalid={isInvalid}
          ref={ref}
          flexDirection="column"
          sx={{
            ...themeInput.field,
            height: "unset",
            minHeight: themeInput.field.h as any,
          }}
          gap="0.5rem"
          justifyContent="center"
          onClick={handleOpenPopup}
        >
          {value.length ? (
            <BaseFlex gap="0.5rem" wrap="wrap">
              {value.map((item, i) => (
                <BaseTag
                  key={i}
                  close
                  onClose={() => {
                    const newValue = [...value];
                    newValue.splice(i, 1);

                    onChange(newValue);
                  }}
                >
                  {item}
                </BaseTag>
              ))}
            </BaseFlex>
          ) : null}
          <BaseInput
            onFocus={handleOpenPopup}
            {...props}
            height="100%"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === "Tab" ||
                event.key === " "
              ) {
                handleAdd(inputValue);
              }
            }}
            onBlur={onBlur}
            variant="unstyled"
          />
        </BaseFlex>
        {filteredDefaultValues.length ? (
          <BaseBox
            zIndex={99999}
            border="1px solid"
            borderColor="inherit"
            borderRadius="var(--chakra-radii-md)"
            boxShadow="var(--chakra-shadows-sm)"
            background={popupBg}
            ref={popupRef}
            display={isComponentVisible ? "block" : "none"}
            position="absolute"
            top="calc(100% + 10px)"
            left="0px"
            width="100%"
            maxHeight="150px"
            overflowY="auto"
            padding="1rem 0"
          >
            <BaseFlex flexDirection="column">
              {filteredDefaultValues.map((defaultValue) => (
                <BaseBox
                  key={defaultValue}
                  tabIndex={0}
                  role="button"
                  padding="0.5rem 1rem"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(defaultValue);
                  }}
                  {...(value.includes(defaultValue) && {
                    background: "blackAlpha.300 !important",
                  })}
                  _hover={{
                    background: "blackAlpha.200",
                  }}
                >
                  <BaseText>{defaultValue}</BaseText>
                </BaseBox>
              ))}
            </BaseFlex>
          </BaseBox>
        ) : null}
      </BaseBox>
    );
  }
);

export default BaseTagInput;

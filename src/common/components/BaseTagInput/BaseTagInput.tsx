import React, { useCallback, useState } from "react";
import {
  useColorModeValue,
  useMultiStyleConfig,
  useTheme,
} from "@chakra-ui/react";
import BaseInput, { BaseInputProps } from "../BaseInput/BaseInput";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseTag from "../BaseTag/BaseTag";

interface Props extends Omit<BaseInputProps, "value" | "onChange"> {
  value: string[];
  onChange: (value: string[]) => void;
}

const BaseTagInput = React.forwardRef<any, Props>(
  ({ value = [], onChange, isInvalid, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");

    const theme = useTheme();

    const color = useColorModeValue(
      theme.colors.primary[500],
      theme.colors.primary[200]
    );

    const themeInput = useMultiStyleConfig("Input", {
      ...theme.components.Input.defaultProps,
      ...props,
      focusBorderColor: color,
    });

    const handleAdd = useCallback(() => {
      const trimmedValue = inputValue.trim();

      if (trimmedValue) {
        if (!value?.includes(trimmedValue)) {
          onChange([...value, trimmedValue]);
        }
      }
      setInputValue("");
    }, [inputValue, onChange, value]);

    return (
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
              handleAdd();
            }
          }}
          onBlur={(event) => {
            if (props.onBlur) {
              props.onBlur(event);
            }

            handleAdd();
          }}
          variant="unstyled"
        />
      </BaseFlex>
    );
  }
);

export default BaseTagInput;

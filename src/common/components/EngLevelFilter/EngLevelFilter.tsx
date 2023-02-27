import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseText from "../BaseText/BaseText";

interface Props {
  value: keyof typeof EngLevelEnum | "";
  onChange: (value: keyof typeof EngLevelEnum) => void;
}

const EngLevelFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex flexDirection="column" gap="0.5rem">
      <BaseText>English level</BaseText>
      <BaseSelect
        variant="filled"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as keyof typeof EngLevelEnum)
        }
        placeholder="Any"
      >
        {(Object.keys(EngLevelEnum) as Array<keyof typeof EngLevelEnum>).map(
          (key) => (
            <option key={key} value={key}>
              {EngLevelEnum[key]}
            </option>
          )
        )}
      </BaseSelect>
    </BaseFlex>
  );
};

export default EngLevelFilter;

import { PositionEnum } from "@/common/models/PositionEnum";
import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseText from "../BaseText/BaseText";

interface Props {
  value: keyof typeof PositionEnum | "";
  onChange: (value: keyof typeof PositionEnum) => void;
}

const PositionFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex flexDirection="column" gap="0.5rem">
      <BaseText>Position</BaseText>
      <BaseSelect
        variant="filled"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as keyof typeof PositionEnum)
        }
        placeholder="Any"
      >
        {(Object.keys(PositionEnum) as Array<keyof typeof PositionEnum>).map(
          (key) => (
            <option key={key} value={key}>
              {PositionEnum[key]}
            </option>
          )
        )}
      </BaseSelect>
    </BaseFlex>
  );
};

export default PositionFilter;

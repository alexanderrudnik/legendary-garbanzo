import { FiltersOwn } from "@/common/models/Filters";
import React from "react";
import BaseCheckbox from "../BaseCheckbox/BaseCheckbox";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseText from "../BaseText/BaseText";

const options = [
  {
    label: "My",
    value: "my",
  },
  {
    label: "Not my",
    value: "notMy",
  },
];

interface Props {
  value: FiltersOwn;
  onChange: (value: FiltersOwn) => void;
}

const MyFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex flexDirection="column" gap="0.5rem">
      <BaseText>Own</BaseText>
      <BaseSelect
        variant="filled"
        placeholder="All"
        value={value}
        onChange={(event) => onChange(event.target.value as FiltersOwn)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </BaseSelect>
    </BaseFlex>
  );
};

export default MyFilter;

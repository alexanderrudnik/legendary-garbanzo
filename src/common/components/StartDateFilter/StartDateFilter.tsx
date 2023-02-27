import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseText from "../BaseText/BaseText";
import BaseInput from "../BaseInput/BaseInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StartDateFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex gap="0.5rem" flexDirection="column">
      <BaseText>Start date</BaseText>
      <BaseInput
        type="Date"
        variant="filled"
        placeholder="Enter start date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </BaseFlex>
  );
};

export default StartDateFilter;

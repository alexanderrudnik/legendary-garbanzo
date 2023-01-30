import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseInput from "../BaseInput/BaseInput";
import BaseText from "../BaseText/BaseText";

interface Props {
  value: [string, string];
  onChange: (value: [string, string]) => void;
}

const RateFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex flexDirection="column" gap="0.5rem">
      <BaseText>Min. and max. rate (USD)</BaseText>
      <BaseFlex gap="0.5rem">
        <BaseInput
          variant="filled"
          value={value[0]}
          type="number"
          placeholder="From"
          onChange={(event) => onChange([event.target.value, value[1]])}
        />
        <BaseInput
          variant="filled"
          value={value[1]}
          type="number"
          placeholder="To"
          onChange={(event) => onChange([value[0], event.target.value])}
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default RateFilter;

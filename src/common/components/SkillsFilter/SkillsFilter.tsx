import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseTagInput from "../BaseTagInput/BaseTagInput";
import BaseText from "../BaseText/BaseText";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const SkillsFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex gap="0.5rem" flexDirection="column">
      <BaseText>Skills</BaseText>
      <BaseTagInput
        placeholder="Type skills"
        value={value}
        onChange={onChange}
      />
    </BaseFlex>
  );
};

export default SkillsFilter;

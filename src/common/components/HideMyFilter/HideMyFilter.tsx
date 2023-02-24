import React from "react";
import BaseCheckbox from "../BaseCheckbox/BaseCheckbox";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const HideMyFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseCheckbox
      isChecked={value}
      onChange={(event) => onChange(event.target.checked)}
    >
      Hide my posts
    </BaseCheckbox>
  );
};

export default HideMyFilter;

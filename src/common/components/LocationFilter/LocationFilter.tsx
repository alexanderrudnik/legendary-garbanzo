import { LOCATIONS } from "@/common/constants/locations";
import React from "react";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseText from "../BaseText/BaseText";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const LocationFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <BaseFlex gap="0.5rem" flexDirection="column">
      <BaseText>Location</BaseText>
      <BaseSelect
        variant="filled"
        placeholder="Any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {LOCATIONS.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </BaseSelect>
    </BaseFlex>
  );
};

export default LocationFilter;

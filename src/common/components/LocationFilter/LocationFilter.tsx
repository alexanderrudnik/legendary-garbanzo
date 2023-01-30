import React from "react";
import countryList from "country-list";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseText from "../BaseText/BaseText";

const countries = countryList.getData();

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
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </BaseSelect>
    </BaseFlex>
  );
};

export default LocationFilter;

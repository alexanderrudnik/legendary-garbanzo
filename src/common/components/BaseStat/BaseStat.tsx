import React from "react";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
  helpText?: React.ReactNode;
}

const BaseStat: React.FC<Props> = ({ label, value, helpText }) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>

      <StatNumber>{value}</StatNumber>

      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  );
};

export default BaseStat;

import React from "react";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
  helpText?: React.ReactNode;
  isValueBold?: boolean;
}

const BaseStat: React.FC<Props> = ({ label, value, helpText, isValueBold }) => {
  return (
    <Stat>
      <StatLabel color="gray">{label}</StatLabel>

      <StatNumber fontWeight={isValueBold ? 700 : 400}>{value}</StatNumber>

      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  );
};

export default BaseStat;

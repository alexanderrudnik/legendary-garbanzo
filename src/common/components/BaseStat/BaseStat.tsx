import React from "react";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
  isValueBold?: boolean;
  helpText?: React.ReactNode;
}

const BaseStat: React.FC<Props> = ({
  label,
  value,
  helpText,
  isValueBold = false,
}) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>

      <StatNumber fontWeight={isValueBold ? 700 : 400}>{value}</StatNumber>

      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  );
};

export default BaseStat;

import React from "react";
import { WarningIcon } from "@chakra-ui/icons";
import BaseFlex from "../BaseFlex/BaseFlex";
import BaseText from "../BaseText/BaseText";

const NotFound: React.FC = () => {
  return (
    <BaseFlex flexDirection="column" gap="1rem" align="center">
      <WarningIcon fontSize="5rem" color="orange" />
      <BaseText>Not found</BaseText>
    </BaseFlex>
  );
};

export default NotFound;

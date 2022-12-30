import React from "react";
import BaseCenter from "../BaseCenter/BaseCenter";
import BaseImage from "../BaseImage/BaseImage";
import logoBig from "@/app/assets/images/logo-big.png";
import { keyframes } from "@emotion/react";
import BaseContainer from "../BaseContainer/BaseContainer";

const animation = keyframes`
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
`;

const Loading: React.FC = () => {
  return (
    <BaseContainer>
      <BaseCenter height="100vh">
        <BaseImage
          src={logoBig}
          alt="Logo"
          animation={`${animation} 1s infinite reverse`}
        />
      </BaseCenter>
    </BaseContainer>
  );
};

export default Loading;

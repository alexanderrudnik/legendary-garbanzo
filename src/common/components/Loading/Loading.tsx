import React from "react";
import BaseCenter from "../BaseCenter/BaseCenter";
import BaseImage from "../BaseImage/BaseImage";
import logoBig from "@/app/assets/images/logo-big.png";
import { keyframes } from "@emotion/react";
import BaseContainer from "../BaseContainer/BaseContainer";

const animation = keyframes`
0% {
  opacity: 1;
}

50% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

const Loading: React.FC = () => {
  return (
    <BaseContainer>
      <BaseCenter height="100vh">
        <BaseImage
          src={logoBig}
          alt="Logo"
          animation={`${animation} 2s linear reverse infinite`}
        />
      </BaseCenter>
    </BaseContainer>
  );
};

export default Loading;

import React from "react";
import BaseCenter from "../BaseCenter/BaseCenter";
import BaseSpinner from "../BaseSpinner/BaseSpinner";

const Loading: React.FC = () => {
  return (
    <BaseCenter height="100vh">
      <BaseSpinner />
    </BaseCenter>
  );
};

export default Loading;

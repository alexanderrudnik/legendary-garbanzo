import React from "react";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTabs from "@/common/components/BaseTabs/BaseTabs";
import Proposals from "../components/Proposals/Proposals";
import Requests from "../components/Requests/Requests";

const Home: React.FC = () => {
  return (
    <BaseSection>
      <BaseTabs
        isFitted
        variant="enclosed-colored"
        tabs={[
          { label: "Requests", panel: <Requests /> },
          { label: "Proposals", panel: <Proposals /> },
        ]}
      />
    </BaseSection>
  );
};

export default Home;

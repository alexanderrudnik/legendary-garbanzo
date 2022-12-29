import React from "react";
import { Outlet } from "react-router-dom";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";

const MainLayout: React.FC = () => {
  return (
    <main>
      <BaseContainer>
        <Outlet />
      </BaseContainer>
    </main>
  );
};

export default MainLayout;

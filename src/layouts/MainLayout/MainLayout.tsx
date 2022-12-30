import React from "react";
import { Outlet } from "react-router-dom";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import Header from "./components/Header/Header";
import withAuth from "@/common/hocs/withAuth";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      </main>
    </>
  );
};

export default withAuth(MainLayout);

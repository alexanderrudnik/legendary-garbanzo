import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import Header from "./components/Header/Header";
import withAuth from "@/common/hocs/withAuth";

import CreateWorkspace from "@/features/workspace/components/CreateWorkspace/CreateWorkspace";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { useMe } from "@/common/hooks/useMe";
import BaseModal from "@/common/components/BaseModal/BaseModal";

const MainLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useBaseDisclosure();
  const { data: user } = useMe();

  useEffect(() => {
    if (!user?.workspace) {
      onOpen();
    }
  }, [user?.workspace, onOpen]);

  return (
    <>
      <Header />
      <main>
        <BaseContainer>
          <Outlet />
          <BaseModal
            close={false}
            header="Let us know more about you"
            isOpen={isOpen}
            onClose={() => {}}
          >
            <CreateWorkspace cb={onClose} />
          </BaseModal>
        </BaseContainer>
      </main>
    </>
  );
};

export default withAuth(MainLayout);

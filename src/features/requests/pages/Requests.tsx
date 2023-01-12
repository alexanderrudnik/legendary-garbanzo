import React from "react";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import CreateRequest from "../components/CreateRequest/CreateRequest";

const Requests: React.FC = () => {
  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpen}>
          Add new request
        </BaseButton>

        <BaseModal header="Create request" isOpen={isOpen} onClose={onClose}>
          <CreateRequest />
        </BaseModal>
      </BaseSection>

      <BaseSection>list</BaseSection>
    </>
  );
};

export default Requests;

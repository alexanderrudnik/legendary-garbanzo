import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import React from "react";
import CreateRequest from "../components/CreateRequest/CreateRequest";

const Requests: React.FC = () => {
  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpen}>
          Add new request
        </BaseButton>

        <CreateRequest isOpen={isOpen} onClose={onClose} />
      </BaseSection>

      <BaseSection>list</BaseSection>
    </>
  );
};

export default Requests;

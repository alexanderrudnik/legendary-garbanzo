import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import React from "react";
import CreateProposal from "../components/CreateProposal/CreateProposal";

const Proposals: React.FC = () => {
  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpen}>
          Add new proposal
        </BaseButton>

        <CreateProposal isOpen={isOpen} onClose={onClose} />
      </BaseSection>

      <BaseSection>list</BaseSection>
    </>
  );
};

export default Proposals;

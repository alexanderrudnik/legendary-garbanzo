import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import Contact from "@/common/components/Contact/Contact";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { Proposal } from "@/services/proposal/types";
import React, { useState } from "react";
import CreateProposal from "../components/CreateProposal/CreateProposal";
import ProposalCard from "../components/ProposalCard/ProposalCard";
import { useProposals } from "../hooks/useProposals";

const Proposals: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);

  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useBaseDisclosure();
  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  const { data: proposals, isLoading } = useProposals();

  console.log(proposals);

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpenCreateModal}>
          Add new proposal
        </BaseButton>

        <BaseModal
          header="Create proposal"
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
        >
          <CreateProposal cb={onCloseCreateModal} />
        </BaseModal>
      </BaseSection>

      <BaseSection>
        {isLoading ? (
          <BaseFlex justify="center">
            <BaseSpinner />
          </BaseFlex>
        ) : proposals?.length ? (
          <>
            <BaseSimpleGrid
              spacing="1rem"
              templateColumns={{
                base: "repeat(auto-fill, minmax(320px, 1fr))",
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              }}
            >
              {proposals.map((proposal, i) => (
                <ProposalCard
                  key={i}
                  {...proposal}
                  onContact={() => {
                    setContact(proposal.contact);
                    onOpenContactModal();
                  }}
                />
              ))}
            </BaseSimpleGrid>

            <BaseModal
              close
              header="Contact"
              isOpen={isOpenContactModal}
              onClose={() => {
                setContact(null);
                onCloseContactModal();
              }}
            >
              <Contact contact={contact} />
            </BaseModal>
          </>
        ) : (
          <BaseText>No requests yet</BaseText>
        )}
      </BaseSection>
    </>
  );
};

export default Proposals;

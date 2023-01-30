import React, { useEffect, useState } from "react";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import { useParams } from "react-router-dom";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import Contact from "@/common/components/Contact/Contact";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseText from "@/common/components/BaseText/BaseText";
import { useProposals } from "../hooks/useProposals";
import { Proposal } from "@/services/proposal/types";
import ProposalCard from "../components/ProposalCard/ProposalCard";

const SingleProposal: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);
  const { data: proposals, isLoading } = useProposals();

  const [currentProposal, setCurrentProposal] = useState<Proposal | undefined>(
    undefined
  );

  const params = useParams();

  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  useEffect(() => {
    if (proposals) {
      setCurrentProposal(
        proposals.find((proposal) => proposal.id === params.id)
      );
    }
  }, [params.id, proposals]);

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : currentProposal ? (
        <>
          <BaseBox margin="0 auto" width={{ base: "320px", md: "500px" }}>
            <ProposalCard
              {...currentProposal}
              onContact={() => {
                setContact(currentProposal.contact);
                onOpenContactModal();
              }}
            />
          </BaseBox>

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
        <BaseCenter>
          <BaseText>No such proposal :c</BaseText>
        </BaseCenter>
      )}
    </BaseSection>
  );
};

export default SingleProposal;

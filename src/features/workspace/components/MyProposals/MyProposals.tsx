import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import Contact from "@/common/components/Contact/Contact";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { useMe } from "@/common/hooks/useMe";
import { RouteEnum } from "@/common/models/RouteEnum";
import ProposalCard from "@/features/proposals/components/ProposalCard/ProposalCard";
import { useProposals } from "@/features/proposals/hooks/useProposals";
import { Proposal } from "@/services/proposal/types";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProposals: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);
  const { data: me } = useMe();

  const { data: proposals, isLoading: isLoadingProposals } = useProposals();

  const myProposals = useMemo(
    () =>
      proposals
        ? proposals.filter((proposal) => proposal.owner === me?.id)
        : [],
    [me?.id, proposals]
  );

  const navigate = useNavigate();

  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  return (
    <BaseSection>
      {isLoadingProposals ? (
        <BaseFlex justify="center">
          <BaseSpinner />
        </BaseFlex>
      ) : myProposals?.length ? (
        <>
          <BaseSimpleGrid
            spacing="1rem"
            templateColumns={{
              base: "repeat(auto-fill, minmax(320px, 1fr))",
              md: "repeat(auto-fill, minmax(500px, 1fr))",
            }}
          >
            {myProposals.map((proposal, i) => (
              <ProposalCard
                key={i}
                {...proposal}
                onClick={() => {
                  navigate(`${RouteEnum.PROPOSALS}/${proposal.id}`);
                }}
                onContact={() => {
                  setContact(proposal.contact);
                  onOpenContactModal();
                }}
                isMy
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
        <BaseText>No proposals found</BaseText>
      )}
    </BaseSection>
  );
};

export default MyProposals;

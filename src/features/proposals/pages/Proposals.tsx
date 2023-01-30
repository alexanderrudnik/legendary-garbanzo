import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseDrawer from "@/common/components/BaseDrawer/BaseDrawer";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import Contact from "@/common/components/Contact/Contact";
import Filters from "@/common/components/Filters/Filters";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { Filters as IFilters } from "@/common/models/Filters";
import { dateService } from "@/services/date/dateService";
import { getFilteredData } from "@/services/filter/filterService";
import { Proposal } from "@/services/proposal/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CreateProposal from "../components/CreateProposal/CreateProposal";
import ProposalCard from "../components/ProposalCard/ProposalCard";
import { useProposals } from "../hooks/useProposals";

const initialFiltersState: IFilters = {
  rate: ["", ""],
  position: "",
  skills: [],
  location: "",
};

const Proposals: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);
  const [filters, setFilters] = useState<IFilters>(initialFiltersState);

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
  const {
    isOpen: isOpenFiltersDrawer,
    onClose: onCloseFiltersDrawer,
    onOpen: onOpenFiltersDrawer,
  } = useBaseDisclosure();

  const { data: proposals, isLoading } = useProposals();

  const sortedProposals = useMemo(
    () =>
      proposals
        ? proposals.sort((a, b) =>
            dateService
              .getDate(a.createdAt)
              .isAfter(dateService.getDate(b.createdAt))
              ? -1
              : 1
          )
        : [],
    [proposals]
  );

  const [filteredProposals, setFilteredProposals] = useState(sortedProposals);

  const handleFilter = () => {
    setFilteredProposals(getFilteredData(sortedProposals, filters));
    onCloseFiltersDrawer();
  };

  const handleClear = useCallback(() => {
    setFilteredProposals(sortedProposals);
    setFilters(initialFiltersState);
    onCloseFiltersDrawer();
  }, [sortedProposals, onCloseFiltersDrawer]);

  useEffect(() => {
    handleClear();
  }, [handleClear]);

  return (
    <>
      <BaseSection>
        <BaseButton
          marginBottom="1rem"
          width="100%"
          onClick={onOpenCreateModal}
        >
          Add new proposal
        </BaseButton>

        <BaseButton
          variant="outline"
          width="100%"
          onClick={onOpenFiltersDrawer}
        >
          Filters
        </BaseButton>

        <BaseModal
          header="Create proposal"
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
        >
          <CreateProposal cb={onCloseCreateModal} />
        </BaseModal>

        <BaseDrawer
          header="Filters"
          isOpen={isOpenFiltersDrawer}
          onClose={onCloseFiltersDrawer}
        >
          <Filters
            filters={filters}
            setFilters={setFilters}
            onFilter={handleFilter}
            onClear={handleClear}
          />
        </BaseDrawer>
      </BaseSection>

      <BaseSection>
        {isLoading ? (
          <BaseFlex justify="center">
            <BaseSpinner />
          </BaseFlex>
        ) : filteredProposals?.length ? (
          <>
            <BaseSimpleGrid
              spacing="1rem"
              templateColumns={{
                base: "repeat(auto-fill, minmax(320px, 1fr))",
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              }}
            >
              {filteredProposals.map((proposal, i) => (
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

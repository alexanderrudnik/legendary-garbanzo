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
import { useMe } from "@/common/hooks/useMe";
import { Filters as IFilters } from "@/common/models/Filters";
import { RouteEnum } from "@/common/models/RouteEnum";
import { dateService } from "@/services/date/dateService";
import { getFilteredData, validate } from "@/services/filter/filterService";
import { Proposal } from "@/services/proposal/types";
import { toastService } from "@/services/toast/toastService";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProposal from "../components/CreateProposal/CreateProposal";
import ProposalCard from "../components/ProposalCard/ProposalCard";
import { useCreateProposal } from "../hooks/useCreateProposal";
import { useProposals } from "../hooks/useProposals";
import { ProposalsInputs } from "../models/ProposalInputs";

const initialFiltersState: IFilters = {
  rate: ["", ""],
  position: "",
  skills: [],
  location: "",
  hideMy: false,
  engLevel: "",
  yearsOfExperience: ["", ""],
  weeklyEmployment: ["", ""],
  startDate: "",
};

const Proposals: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);
  const [filters, setFilters] = useState<IFilters>(initialFiltersState);

  const navigate = useNavigate();

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

  const { data: me } = useMe();

  const [filteredProposals, setFilteredProposals] = useState(proposals);

  const handleFilter = () => {
    const errors = validate(filters);
    if (Object.values(errors).some((error) => error)) {
      toastService.show({
        title: "An error occured",
        description: Object.entries(errors).filter(
          ([key, value]) => value
        )[0][1],
        status: "error",
      });
    } else {
      setFilteredProposals(getFilteredData(proposals, filters, me?.id || "0"));
      onCloseFiltersDrawer();
    }
  };

  const handleClear = useCallback(() => {
    setFilteredProposals(proposals);
    setFilters(initialFiltersState);
    onCloseFiltersDrawer();
  }, [proposals, onCloseFiltersDrawer]);

  useEffect(() => {
    handleClear();
  }, [handleClear]);

  const { mutateAsync: createProposal, isLoading: isCreatingProposal } =
    useCreateProposal();

  const handleSubmit = (values: ProposalsInputs) => {
    createProposal({
      ...values,
      startDate: dateService.getDate(values.startDate).valueOf(),
      skills: values.skills.map((skill) => skill.trim()),
    }).then(() => onCloseCreateModal());
  };

  return (
    <>
      <BaseSection>
        <BaseFlex align="center" justify="space-between">
          <BaseButton leftIcon={<AddIcon />} onClick={onOpenCreateModal}>
            Add new proposal
          </BaseButton>

          <BaseButton
            leftIcon={<SearchIcon />}
            variant="outline"
            onClick={onOpenFiltersDrawer}
          >
            Filters
          </BaseButton>
        </BaseFlex>

        <BaseModal
          closeOnEsc={false}
          closeOnOverlayClick={false}
          header="Create proposal"
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
        >
          <CreateProposal
            onSubmit={handleSubmit}
            isLoading={isCreatingProposal}
          />
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
                  onClick={() => {
                    navigate(`${RouteEnum.PROPOSALS}/${proposal.id}`);
                  }}
                  onContact={() => {
                    setContact(proposal.contact);
                    onOpenContactModal();
                  }}
                  isMy={me?.id === proposal.owner}
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
          <BaseText>No proposals yet</BaseText>
        )}
      </BaseSection>
    </>
  );
};

export default Proposals;

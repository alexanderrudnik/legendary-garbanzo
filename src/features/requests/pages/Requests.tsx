import React, { useCallback, useEffect, useState } from "react";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import CreateRequest from "../components/CreateRequest/CreateRequest";
import { useRequests } from "../hooks/useRequests";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseText from "@/common/components/BaseText/BaseText";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import RequestCard from "../components/RequestCard/RequestCard";
import Contact from "../../../common/components/Contact/Contact";
import { IRequest } from "@/services/request/types";
import BaseDrawer from "@/common/components/BaseDrawer/BaseDrawer";
import Filters from "../../../common/components/Filters/Filters";
import { getFilteredData } from "@/services/filter/filterService";
import { Filters as IFilters } from "@/common/models/Filters";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "@/common/models/RouteEnum";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { RequestInputs } from "../models/RequestInputs";
import { dateService } from "@/services/date/dateService";

const initialFiltersState: IFilters = {
  rate: ["", ""],
  position: "",
  skills: [],
  location: "",
};

const Requests: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);
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

  const { data: requests, isLoading } = useRequests();

  const [filteredRequests, setFilteredRequests] = useState(requests);

  const handleFilter = () => {
    setFilteredRequests(getFilteredData(requests, filters));
    onCloseFiltersDrawer();
  };

  const handleClear = useCallback(() => {
    setFilteredRequests(requests);
    setFilters(initialFiltersState);
    onCloseFiltersDrawer();
  }, [requests, onCloseFiltersDrawer]);

  useEffect(() => {
    handleClear();
  }, [handleClear]);

  const { isLoading: isCreatingRequest, mutateAsync: createRequest } =
    useCreateRequest();

  const handleSubmit = (values: RequestInputs) =>
    createRequest({
      ...values,
      startDate: dateService.getDate(values.startDate).valueOf(),
      skills: values.skills.map((skill) => skill.trim()),
    }).then(() => onCloseCreateModal());

  return (
    <>
      <BaseSection>
        <BaseButton
          marginBottom="1rem"
          width="100%"
          onClick={onOpenCreateModal}
        >
          Add new request
        </BaseButton>

        <BaseButton
          variant="outline"
          width="100%"
          onClick={onOpenFiltersDrawer}
        >
          Filters
        </BaseButton>

        <BaseModal
          header="Create request"
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
        >
          <CreateRequest
            onSubmit={handleSubmit}
            isLoading={isCreatingRequest}
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
        ) : filteredRequests?.length ? (
          <>
            <BaseSimpleGrid
              spacing="1rem"
              templateColumns={{
                base: "repeat(auto-fill, minmax(320px, 1fr))",
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              }}
            >
              {filteredRequests.map((request, i) => (
                <RequestCard
                  key={i}
                  {...request}
                  onClick={() =>
                    navigate(`${RouteEnum.REQUESTS}/${request.id}`)
                  }
                  onContact={() => {
                    setContact(request.contact);
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
          <BaseText>No requests found</BaseText>
        )}
      </BaseSection>
    </>
  );
};

export default Requests;

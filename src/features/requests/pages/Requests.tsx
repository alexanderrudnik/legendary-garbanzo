import React, { useState } from "react";
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
import Contact from "../components/Contact/Contact";
import { IRequest } from "@/services/request/types";

const Requests: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);

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

  const { data: requests, isLoading } = useRequests();

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpenCreateModal}>
          Add new request
        </BaseButton>

        <BaseModal
          header="Create request"
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
        >
          <CreateRequest cb={onCloseCreateModal} />
        </BaseModal>
      </BaseSection>

      <BaseSection>
        {isLoading ? (
          <BaseFlex justify="center">
            <BaseSpinner />
          </BaseFlex>
        ) : requests?.length ? (
          <>
            <BaseSimpleGrid
              spacing="1rem"
              templateColumns={{
                base: "repeat(auto-fill, minmax(320px, 1fr))",
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              }}
            >
              {requests.map((request, i) => (
                <RequestCard
                  key={i}
                  {...request}
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
          <BaseText>No requests yet</BaseText>
        )}
      </BaseSection>
    </>
  );
};

export default Requests;

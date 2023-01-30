import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import Contact from "@/common/components/Contact/Contact";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import RequestCard from "@/features/requests/components/RequestCard/RequestCard";
import { useRequests } from "@/features/requests/hooks/useRequests";
import { IRequest } from "@/services/request/types";
import React, { useState } from "react";

const MyRequests: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);
  const { data: requests, isLoading: isLoadingRequests } = useRequests();
  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  return (
    <BaseSection>
      {isLoadingRequests ? (
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
        <BaseText>No requests found</BaseText>
      )}
    </BaseSection>
  );
};

export default MyRequests;

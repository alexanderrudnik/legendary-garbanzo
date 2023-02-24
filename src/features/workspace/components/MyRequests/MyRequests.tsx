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
import RequestCard from "@/features/requests/components/RequestCard/RequestCard";
import { useRequests } from "@/features/requests/hooks/useRequests";
import { IRequest } from "@/services/request/types";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyRequests: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);
  const { data: me } = useMe();

  const { data: requests, isLoading: isLoadingRequests } = useRequests();

  const myRequests = useMemo(
    () =>
      requests ? requests.filter((request) => request.owner === me?.id) : [],
    [me?.id, requests]
  );

  const navigate = useNavigate();

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
      ) : myRequests?.length ? (
        <>
          <BaseSimpleGrid
            spacing="1rem"
            templateColumns={{
              base: "repeat(auto-fill, minmax(320px, 1fr))",
              md: "repeat(auto-fill, minmax(500px, 1fr))",
            }}
          >
            {myRequests.map((request, i) => (
              <RequestCard
                key={i}
                {...request}
                onClick={() => {
                  navigate(`${RouteEnum.REQUESTS}/${request.id}`);
                }}
                onContact={() => {
                  setContact(request.contact);
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
        <BaseText>No requests found</BaseText>
      )}
    </BaseSection>
  );
};

export default MyRequests;

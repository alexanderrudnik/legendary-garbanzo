import React, { useEffect, useState } from "react";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import { useParams } from "react-router-dom";
import { useRequests } from "../hooks/useRequests";
import { IRequest } from "@/services/request/types";
import RequestCard from "../components/RequestCard/RequestCard";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import Contact from "@/common/components/Contact/Contact";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseText from "@/common/components/BaseText/BaseText";

const SingleRequest: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);
  const { data: requests, isLoading } = useRequests();

  const [currentRequest, setCurrentRequest] = useState<IRequest | undefined>(
    undefined
  );

  const params = useParams();

  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  useEffect(() => {
    if (requests) {
      setCurrentRequest(requests.find((request) => request.id === params.id));
    }
  }, [params.id, requests]);

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : currentRequest ? (
        <>
          <BaseBox margin="0 auto" width={{ base: "320px", md: "500px" }}>
            <RequestCard
              {...currentRequest}
              onContact={() => {
                setContact(currentRequest.contact);
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
          <BaseText>No such request :c</BaseText>
        </BaseCenter>
      )}
    </BaseSection>
  );
};

export default SingleRequest;

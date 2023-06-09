import React, { useEffect, useMemo, useState } from "react";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRequests } from "../hooks/useRequests";
import { IRequest } from "@/services/request/types";
import RequestCard from "../components/RequestCard/RequestCard";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import Contact from "@/common/components/Contact/Contact";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseText from "@/common/components/BaseText/BaseText";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { useMe } from "@/common/hooks/useMe";
import { RouteEnum } from "@/common/models/RouteEnum";
import BasePopconfirm from "@/common/components/BasePopconfirm/BasePopconfirm";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const SingleRequest: React.FC = () => {
  const [contact, setContact] = useState<IRequest["contact"] | null>(null);
  const { data: requests, isLoading } = useRequests();

  const { data: me } = useMe();

  const [currentRequest, setCurrentRequest] = useState<IRequest | undefined>(
    undefined
  );

  const params = useParams();

  const navigate = useNavigate();

  const {
    isOpen: isOpenContactModal,
    onClose: onCloseContactModal,
    onOpen: onOpenContactModal,
  } = useBaseDisclosure();

  const {
    isOpen: isOpenConfirmPopup,
    onClose: onCloseConfirmPopup,
    onOpen: onOpenConfirmPopup,
  } = useBaseDisclosure();

  useEffect(() => {
    if (requests) {
      setCurrentRequest(requests.find((request) => request.id === params.id));
    }
  }, [params.id, requests]);

  const isMy = useMemo(
    () => currentRequest?.owner === me?.id,
    [me, currentRequest]
  );

  const { mutateAsync: deleteRequest, isLoading: isDeletingRequest } =
    useDeleteRequest();

  const handleDelete = () => {
    deleteRequest(params.id || "0").then(() => {
      onCloseConfirmPopup();
      navigate(RouteEnum.REQUESTS);
    });
  };

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : currentRequest ? (
        <>
          <BaseFlex
            flexDirection={{
              base: "column",
              md: "row",
            }}
            gap={{
              base: "2rem",
              md: "5rem",
            }}
            justify="center"
          >
            {isMy && (
              <BaseFlex
                gap="1rem"
                width={{
                  base: "unset",
                  md: "10rem",
                }}
                flexDirection="column"
              >
                <Link to={`${RouteEnum.REQUESTS}/edit/${currentRequest.id}`}>
                  {" "}
                  <BaseButton
                    leftIcon={<EditIcon />}
                    width="100%"
                    variant="outline"
                  >
                    Edit
                  </BaseButton>
                </Link>

                <BasePopconfirm
                  isOpen={isOpenConfirmPopup}
                  isLoading={isDeletingRequest}
                  onClose={onCloseConfirmPopup}
                  text="Are you sure you want to delete?"
                  onOk={handleDelete}
                  trigger={
                    <BaseButton
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={onOpenConfirmPopup}
                    >
                      Delete
                    </BaseButton>
                  }
                />
              </BaseFlex>
            )}

            <BaseBox width={{ base: "320px", md: "500px" }}>
              <RequestCard
                {...currentRequest}
                isFull
                onContact={() => {
                  setContact(currentRequest.contact);
                  onOpenContactModal();
                }}
              />
            </BaseBox>
          </BaseFlex>

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

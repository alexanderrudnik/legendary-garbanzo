import React, { useEffect, useMemo, useState } from "react";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import Contact from "@/common/components/Contact/Contact";
import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseText from "@/common/components/BaseText/BaseText";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { useMe } from "@/common/hooks/useMe";
import { RouteEnum } from "@/common/models/RouteEnum";
import { Proposal } from "@/services/proposal/types";
import { useProposals } from "../hooks/useProposals";
import ProposalCard from "../components/ProposalCard/ProposalCard";
import BasePopconfirm from "@/common/components/BasePopconfirm/BasePopconfirm";
import { useDeleteProposal } from "../hooks/useDeleteProposal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const SingleProposal: React.FC = () => {
  const [contact, setContact] = useState<Proposal["contact"] | null>(null);
  const { data: proposals, isLoading } = useProposals();

  const { data: me } = useMe();

  const [currentProposal, setCurrentProposal] = useState<Proposal | undefined>(
    undefined
  );

  const params = useParams();

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
    if (proposals) {
      setCurrentProposal(
        proposals.find((proposal) => proposal.id === params.id)
      );
    }
  }, [params.id, proposals]);

  const isMy = useMemo(
    () => currentProposal?.owner === me?.id,
    [me, currentProposal]
  );

  const navigate = useNavigate();

  const { mutateAsync: deleteProposal, isLoading: isDeletingProposal } =
    useDeleteProposal();

  const handleDelete = () => {
    deleteProposal(params.id || "0").then(() => {
      onCloseConfirmPopup();
      navigate(RouteEnum.PROPOSALS);
    });
  };

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : currentProposal ? (
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
                <Link to={`${RouteEnum.PROPOSALS}/edit/${currentProposal.id}`}>
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
                  isLoading={isDeletingProposal}
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
              <ProposalCard
                {...currentProposal}
                onContact={() => {
                  setContact(currentProposal.contact);
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
          <BaseText>No such proposal :c</BaseText>
        </BaseCenter>
      )}
    </BaseSection>
  );
};

export default SingleProposal;

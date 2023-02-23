import React from "react";
import { getName } from "country-list";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseCard from "@/common/components/BaseCard/BaseCard";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseStat from "@/common/components/BaseStat/BaseStat";
import { dateService } from "@/services/date/dateService";
import { PositionEnum } from "@/common/models/PositionEnum";
import { getPlural } from "@/common/utils/getPlural";
import { Proposal } from "@/services/proposal/types";
import { useColorModeValue } from "@chakra-ui/react";
import BaseTag from "@/common/components/BaseTag/BaseTag";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProposal } from "../../hooks/useDeleteProposal";
import { RouteEnum } from "@/common/models/RouteEnum";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import BasePopconfirm from "@/common/components/BasePopconfirm/BasePopconfirm";

interface Props extends Proposal {
  onContact: () => void;
  onClick?: () => void;
  isMy?: boolean;
}

const ProposalCard: React.FC<Props> = ({
  id,
  rate,
  yearsOfExperience,
  skills,
  engLevel,
  description,
  CVLink,
  startDate,
  duration,
  weeklyEmployment,
  location,
  position,
  onContact,
  onClick,
  isMy,
}) => {
  const {
    isOpen: isOpenConfirmPopup,
    onClose: onCloseConfirmPopup,
    onOpen: onOpenConfirmPopup,
  } = useBaseDisclosure();

  const navigate = useNavigate();

  const { mutateAsync: deleteProposal, isLoading: isDeletingProposal } =
    useDeleteProposal();

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteProposal(id).finally(() => {
      onCloseConfirmPopup();
    });
  };

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    onOpenConfirmPopup();
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`${RouteEnum.REQUESTS}/edit/${id}`);
  };

  const color = useColorModeValue("primary.500", "primary.200");

  return (
    <BaseCard
      header={
        <BaseFlex align="center" justify="space-between">
          <BaseHeading>{PositionEnum[position]}</BaseHeading>

          {isMy && (
            <BaseFlex align="center" gap="0.5rem">
              <Link
                to={`${RouteEnum.PROPOSALS}/edit/${id}`}
                onClick={handleEdit}
              >
                <BaseButton width="100%" variant="outline">
                  <EditIcon />
                </BaseButton>
              </Link>

              <BasePopconfirm
                isOpen={isOpenConfirmPopup}
                isLoading={isDeletingProposal}
                onClose={onCloseConfirmPopup}
                text="Are you sure you want to delete?"
                onOk={handleDelete}
                trigger={
                  <BaseButton colorScheme="red" onClick={handleOpen}>
                    <DeleteIcon />
                  </BaseButton>
                }
              />
            </BaseFlex>
          )}
        </BaseFlex>
      }
      footer={
        <>
          <BaseButton
            width="100%"
            onClick={(event) => {
              event.stopPropagation();
              onContact();
            }}
          >
            Contact
          </BaseButton>
        </>
      }
      onClick={onClick}
      cursor={onClick ? "pointer" : "unset"}
      _hover={onClick ? { outline: "1px solid", outlineColor: color } : {}}
    >
      <BaseFlex direction="column" gap="1rem">
        <BaseSimpleGrid
          spacing="1rem"
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <BaseStat label="Rate" value={`${rate}$`} />
          <BaseStat
            label="Years of experience"
            value={`${yearsOfExperience} ${getPlural(
              yearsOfExperience,
              "year"
            )}`}
          />
          <BaseStat label="English level" value={engLevel} />
          <BaseStat
            label="Start date"
            value={dateService.getDate(startDate).format("LL")}
          />
          <BaseStat
            label="Duration"
            value={`${duration} ${getPlural(duration, "month")}`}
          />
          <BaseStat
            label="Weekly Employment"
            value={`${weeklyEmployment} ${getPlural(weeklyEmployment, "hour")}`}
          />
          <BaseStat label="Location" value={getName(location)} />
        </BaseSimpleGrid>

        <BaseStat label="CV link" value={CVLink} />

        <BaseStat
          label="Skills"
          value={
            <BaseFlex
              marginTop="0.5rem"
              wrap="wrap"
              align="center"
              gap="0.5rem"
            >
              {skills.map((skill) => (
                <BaseTag key={skill} fontSize="1.5rem">
                  {skill}
                </BaseTag>
              ))}
            </BaseFlex>
          }
        />
        {description && <BaseStat label="Description" value={description} />}
      </BaseFlex>
    </BaseCard>
  );
};

export default ProposalCard;

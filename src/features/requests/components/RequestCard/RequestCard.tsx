import React from "react";
import { EditIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseCard from "@/common/components/BaseCard/BaseCard";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseStat from "@/common/components/BaseStat/BaseStat";
import { IRequest } from "@/services/request/types";
import { dateService } from "@/services/date/dateService";
import { PositionEnum } from "@/common/models/PositionEnum";
import { getPlural } from "@/common/utils/getPlural";
import { useColorModeValue } from "@chakra-ui/react";
import BaseTag from "@/common/components/BaseTag/BaseTag";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "@/common/models/RouteEnum";
import BasePopconfirm from "@/common/components/BasePopconfirm/BasePopconfirm";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import { useDeleteRequest } from "../../hooks/useDeleteRequest";
import { getCountryName } from "@/common/utils/getCountryName";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import BaseText from "@/common/components/BaseText/BaseText";
import { FULL_DATE_TIME_FORMAT } from "@/services/date/dateFormats";
import { usePrimaryColor } from "@/common/hooks/usePrimaryColor";

interface Props extends IRequest {
  onContact: () => void;
  onClick?: () => void;
  isMy?: boolean;
}

const RequestCard: React.FC<Props> = ({
  id,
  title,
  rate,
  yearsOfExperience,
  skills,
  engLevel,
  description,
  startDate,
  duration,
  weeklyEmployment,
  location,
  position,
  onContact,
  onClick,
  isMy,
  createdAt,
}) => {
  const {
    isOpen: isOpenConfirmPopup,
    onClose: onCloseConfirmPopup,
    onOpen: onOpenConfirmPopup,
  } = useBaseDisclosure();

  const navigate = useNavigate();

  const { mutateAsync: deleteRequest, isLoading: isDeletingRequest } =
    useDeleteRequest();

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteRequest(id).finally(() => {
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

  const color = usePrimaryColor();

  return (
    <BaseCard
      header={
        <BaseFlex wrap="wrap" gap="1rem" align="center" justify="space-between">
          <BaseFlex flexDirection="column">
            <BaseHeading>{title}</BaseHeading>

            <BaseText fontSize="0.85rem" color="gray">
              created at{" "}
              {dateService.getDate(createdAt).format(FULL_DATE_TIME_FORMAT)}
            </BaseText>
          </BaseFlex>
          {isMy && (
            <BaseFlex align="center" gap="0.5rem">
              <Link
                to={`${RouteEnum.REQUESTS}/edit/${id}`}
                onClick={handleEdit}
              >
                <BaseButton width="100%" variant="outline">
                  <EditIcon />
                </BaseButton>
              </Link>

              <BasePopconfirm
                isOpen={isOpenConfirmPopup}
                isLoading={isDeletingRequest}
                onClose={onCloseConfirmPopup}
                text="Are you sure you want to delete?"
                onOk={handleDelete}
                trigger={
                  <BaseButton variant="outline" onClick={handleOpen}>
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
            leftIcon={<InfoIcon />}
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
          <BaseStat
            label="Position"
            value={PositionEnum[position]}
            isValueBold
          />
          <BaseStat label="Rate" value={`${rate}$`} isValueBold />
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
          <BaseStat label="Location" value={getCountryName(location)} />
        </BaseSimpleGrid>

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

export default RequestCard;

import React from "react";
import { getName } from "country-list";
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
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";

interface Props extends IRequest {
  onContact: () => void;
  onClick?: () => void;
}

const RequestCard: React.FC<Props> = ({
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
}) => {
  const color = useColorModeValue("primary.500", "primary.200");

  return (
    <BaseCard
      header={<BaseHeading>{PositionEnum[position]}</BaseHeading>}
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

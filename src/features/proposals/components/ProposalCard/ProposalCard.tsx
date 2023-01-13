import React from "react";
import { getName } from "country-list";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseCard from "@/common/components/BaseCard/BaseCard";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseSimpleGrid from "@/common/components/BaseSimpleGrid/BaseSimpleGrid";
import BaseStat from "@/common/components/BaseStat/BaseStat";
import BaseText from "@/common/components/BaseText/BaseText";
import { dateService } from "@/services/date/dateService";
import { PositionEnum } from "@/common/models/PositionEnum";
import { getPlural } from "@/common/utils/getPlural";
import { Proposal } from "@/services/proposal/types";

interface Props extends Proposal {
  onContact: () => void;
}

const ProposalCard: React.FC<Props> = ({
  firstName,
  lastName,
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
}) => {
  return (
    <BaseCard
      header={`${firstName} ${lastName}`}
      footer={
        <>
          <BaseButton width="100%" onClick={onContact}>
            Contact
          </BaseButton>
        </>
      }
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
          <BaseStat label="Position" value={PositionEnum[position]} />
        </BaseSimpleGrid>

        <BaseStat label="CV link" value={CVLink} />

        <BaseStat
          label="Skills"
          value={
            <BaseFlex wrap="wrap" align="center" gap="0.5rem">
              {skills.map((skill) => (
                <BaseText key={skill}>{skill}</BaseText>
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

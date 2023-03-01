import React from "react";
import RateFilter from "@/common/components/RateFilter/RateFilter";
import { Filters as IFilters } from "@/common/models/Filters";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import PositionFilter from "@/common/components/PositionFilter/PositionFilter";
import SkillsFilter from "@/common/components/SkillsFilter/SkillsFilter";
import LocationFilter from "@/common/components/LocationFilter/LocationFilter";
import HideMyFilter from "../HideMyFilter/HideMyFilter";
import EngLevelFilter from "../EngLevelFilter/EngLevelFilter";
import YearsOfExperienceFilter from "../YearsOfExperienceFilter/YearsOfExperienceFilter";
import StartDateFilter from "../StartDateFilter/StartDateFilter";
import WeeklyEmploymentFilter from "../WeeklyEmploymentFilter/WeeklyEmploymentFilter";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

interface Props {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  onFilter: () => void;
  onClear: () => void;
}

const Filters: React.FC<Props> = ({
  filters,
  setFilters,
  onFilter,
  onClear,
}) => {
  return (
    <>
      <BaseFlex gap="1rem" flexDirection="column">
        <RateFilter
          value={filters.rate}
          onChange={(value) => setFilters((prev) => ({ ...prev, rate: value }))}
        />

        <PositionFilter
          value={filters.position}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, position: value }))
          }
        />

        <SkillsFilter
          value={filters.skills}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, skills: value }))
          }
        />

        <LocationFilter
          value={filters.location}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, location: value }))
          }
        />

        <EngLevelFilter
          value={filters.engLevel}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, engLevel: value }))
          }
        />

        <YearsOfExperienceFilter
          value={filters.yearsOfExperience}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, yearsOfExperience: value }))
          }
        />

        <StartDateFilter
          value={filters.startDate}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, startDate: value }))
          }
        />

        <WeeklyEmploymentFilter
          value={filters.weeklyEmployment}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, weeklyEmployment: value }))
          }
        />

        <HideMyFilter
          value={filters.hideMy}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, hideMy: value }))
          }
        />
      </BaseFlex>

      <BaseFlex marginTop="5rem" gap="0.5rem" flexDirection="column">
        <BaseButton leftIcon={<CheckIcon />} onClick={onFilter}>
          Apply
        </BaseButton>
        <BaseButton
          leftIcon={<DeleteIcon />}
          variant="outline"
          onClick={onClear}
        >
          Clear
        </BaseButton>
      </BaseFlex>
    </>
  );
};

export default Filters;

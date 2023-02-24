import React from "react";
import RateFilter from "@/common/components/RateFilter/RateFilter";
import { Filters as IFilters } from "@/common/models/Filters";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import PositionFilter from "@/common/components/PositionFilter/PositionFilter";
import SkillsFilter from "@/common/components/SkillsFilter/SkillsFilter";
import LocationFilter from "@/common/components/LocationFilter/LocationFilter";
import HideMyFilter from "../HideMyFilter/HideMyFilter";

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
    <BaseFlex
      flexDirection="column"
      gap="1rem"
      justifyContent="space-between"
      height="100%"
    >
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

        <HideMyFilter
          value={filters.hideMy}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, hideMy: value }))
          }
        />
      </BaseFlex>
      <BaseFlex gap="0.5rem" flexDirection="column">
        <BaseButton onClick={onFilter}>Apply</BaseButton>
        <BaseButton variant="outline" onClick={onClear}>
          Clear
        </BaseButton>
      </BaseFlex>
    </BaseFlex>
  );
};

export default Filters;

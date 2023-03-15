import { Proposal } from "../proposal/types";
import { IRequest } from "../request/types";
import { PositionEnum } from "@/common/models/PositionEnum";
import { Filters } from "@/common/models/Filters";
import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import { dateService } from "../date/dateService";

type Data = Proposal[] | IRequest[];

type Error = string | null;
export interface FilterErrors {
  rate: Error;
  yearsOfExperience: Error;
  weeklyEmployment: Error;
}

class FilterService {
  filterByRate(data: Data, rate: [string, string]) {
    return data.filter(
      (item) =>
        parseFloat(item.rate) >= parseFloat(rate[0] || "0") &&
        parseFloat(item.rate) <= parseFloat(rate[1] || "999999999")
    );
  }

  filterByPosition(data: Data, position: keyof typeof PositionEnum) {
    return data.filter((item) => item.position === position);
  }

  filterBySkills(data: Data, skills: string[]) {
    return data.filter((item) =>
      skills.every((skill) =>
        item.skills
          .map((skill) => skill.toLowerCase())
          .includes(skill.toLowerCase())
      )
    );
  }

  filterByLocation(data: Data, location: string) {
    return data.filter((item) => item.location === location);
  }

  filterByOwn(data: Data, owner: string) {
    return data.filter((item) => item.owner !== owner);
  }

  filterByEngLevel(data: Data, engLevel: keyof typeof EngLevelEnum) {
    return data.filter((item) => item.engLevel === engLevel);
  }

  filterByYearsOfExperience(data: Data, yearsOfExperience: [string, string]) {
    return data.filter(
      (item) =>
        parseFloat(item.yearsOfExperience) >=
          parseFloat(yearsOfExperience[0] || "0") &&
        parseFloat(item.yearsOfExperience) <=
          parseFloat(yearsOfExperience[1] || "999999999")
    );
  }

  filterByStartDate(data: Data, startDate: string) {
    return data.filter((item) =>
      dateService
        .getDate(item.startDate)
        .isSameOrAfter(dateService.getDate(startDate))
    );
  }

  filterByWeeklyEmployment(data: Data, weeklyEmployment: [string, string]) {
    return data.filter(
      (item) =>
        parseFloat(item.weeklyEmployment) >=
          parseFloat(weeklyEmployment[0] || "0") &&
        parseFloat(item.weeklyEmployment) <=
          parseFloat(weeklyEmployment[1] || "999999999")
    );
  }

  validateFilters(filters: Filters): FilterErrors {
    return {
      rate:
        filters.rate[0] && filters.rate[1] && filters.rate[0] > filters.rate[1]
          ? "Min. rate can not be higher than max.rate"
          : null,
      yearsOfExperience:
        filters.yearsOfExperience[0] &&
        filters.yearsOfExperience[1] &&
        filters.yearsOfExperience[0] > filters.yearsOfExperience[1]
          ? "Min. years can not be higher than max. years"
          : null,
      weeklyEmployment:
        filters.weeklyEmployment[0] &&
        filters.weeklyEmployment[1] &&
        filters.weeklyEmployment[0] > filters.weeklyEmployment[1]
          ? "Min. employment can not be higher than max. employment"
          : null,
    };
  }
}

export const filterService = new FilterService();

export const getFilteredData = (
  data: any,
  filters: Filters,
  owner: string
): any => {
  if (data) {
    let result: Data = data;

    result =
      filters.rate[0] || filters.rate[1]
        ? filterService.filterByRate(result, filters.rate)
        : result;
    result = filters.position
      ? filterService.filterByPosition(result, filters.position)
      : result;
    result = filters.location
      ? filterService.filterByLocation(result, filters.location)
      : result;
    result = filters.skills.length
      ? filterService.filterBySkills(result, filters.skills)
      : result;
    result = filters.hideMy ? filterService.filterByOwn(result, owner) : result;
    result = filters.engLevel
      ? filterService.filterByEngLevel(result, filters.engLevel)
      : result;
    result =
      filters.yearsOfExperience[0] || filters.yearsOfExperience[1]
        ? filterService.filterByYearsOfExperience(
            result,
            filters.yearsOfExperience
          )
        : result;
    result = filters.startDate
      ? filterService.filterByStartDate(result, filters.startDate)
      : result;
    result =
      filters.weeklyEmployment[0] || filters.weeklyEmployment[1]
        ? filterService.filterByWeeklyEmployment(
            result,
            filters.weeklyEmployment
          )
        : result;

    return result;
  }

  return [];
};

export const validate = (filters: Filters) =>
  filterService.validateFilters(filters);

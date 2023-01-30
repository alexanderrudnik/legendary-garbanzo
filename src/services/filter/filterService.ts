import { Proposal } from "../proposal/types";
import { IRequest } from "../request/types";
import { PositionEnum } from "@/common/models/PositionEnum";
import { Filters } from "@/common/models/Filters";

type Data = Proposal[] | IRequest[];

class FilterService {
  filterByRate(data: Data, rate: [string, string]) {
    return data.filter(
      (item) =>
        parseFloat(item.rate) >= parseFloat(rate[0]) &&
        parseFloat(item.rate) <= parseFloat(rate[1])
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
}

export const filterService = new FilterService();

export const getFilteredData = (data: any, filters: Filters): any => {
  if (data) {
    let result: Data = data;

    result =
      filters.rate[0] && filters.rate[1]
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

    return result;
  }

  return [];
};

import { Proposal } from "../proposal/types";
import { IRequest } from "../request/types";
import { PositionEnum } from "@/common/models/PositionEnum";
import { Filters, FiltersOwn } from "@/common/models/Filters";

type Data = Proposal[] | IRequest[];

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

  filterByOwn(data: Data, own: FiltersOwn, owner: string) {
    return data.filter((item) =>
      own === "my" ? item.owner === owner : item.owner !== owner
    );
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
    result = filters.own
      ? filterService.filterByOwn(result, filters.own, owner)
      : result;

    return result;
  }

  return [];
};

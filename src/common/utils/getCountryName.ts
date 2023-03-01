import { LOCATIONS } from "../constants/locations";

export const getCountryName = (code: string) =>
  LOCATIONS.find((country) => country.code === code)?.name;

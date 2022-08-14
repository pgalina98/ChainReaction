import LocationModel from "@models/location/location.model";

export enum Location {
  AUSTIN = 1,
  BOSTON = 2,
  NEW_YORK = 3,
  TAOS = 4,
  MADISON = 5,
  SAVANNAH = 6,
  NASHVILLE = 7,
}

export const getLocation = (idLocation: number): LocationModel | null => {
  switch (idLocation) {
    case Location.AUSTIN:
      return {
        idLocation: 1,
        value: "Austin",
      };

    case Location.BOSTON:
      return {
        idLocation: 2,
        value: "Boston",
      };

    case Location.NEW_YORK:
      return {
        idLocation: 3,
        value: "New York",
      };

    case Location.TAOS:
      return {
        idLocation: 4,
        value: "Taos",
      };

    case Location.MADISON:
      return {
        idLocation: 5,
        value: "Madison",
      };

    case Location.SAVANNAH:
      return {
        idLocation: 6,
        value: "Savannah",
      };

    case Location.NASHVILLE:
      return {
        idLocation: 7,
        value: "Nashville",
      };

    default:
      return null;
  }
};

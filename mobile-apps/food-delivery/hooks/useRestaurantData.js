import { useMemo } from "react";

export const useRestaurantData = (query) => {
  return useMemo(() => {
    try {
      return JSON.parse(query);
    } catch (error) {
      console.log("Error parsing query:", error);
      return {};
    }
  }, [query]);
};

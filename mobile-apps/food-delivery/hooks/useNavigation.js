import { router } from "expo-router";

export const useCardNavigation = () => {
  const navigateToDetail = (selectedItem) => {
    router.push({
      pathname: "/detailedCard",
      params: { query: JSON.stringify(selectedItem) },
    });
  };

  return { navigateToDetail };
};

import { useState } from "react";
import { CardsData } from "../assets/data/cardsData";
import { filterItems } from "../utils/filterUtils";

export const useFoodFilter = () => {
  const [selectedChipId, setSelectedChipId] = useState(null);
  const [filteredData, setFilteredData] = useState(CardsData);

  const handleChipSelection = (selectedItem) => {
    const isCurrentlySelected = selectedChipId === selectedItem.id;
    const newSelectedId = isCurrentlySelected ? null : selectedItem.id;

    setSelectedChipId(newSelectedId);

    if (newSelectedId === null) {
      setFilteredData(CardsData);
    } else {
      const filtered = filterItems(CardsData, selectedItem.title);
      setFilteredData(filtered);
    }
  };

  return {
    selectedChipId,
    filteredData,
    handleChipSelection,
  };
};

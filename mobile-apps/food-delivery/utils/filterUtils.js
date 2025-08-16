export const filterItems = (items, filterTerm) => {
  const filter = filterTerm.toLowerCase();
  return items.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(filter) ||
      (item.title || "").toLowerCase().includes(filter) ||
      (item.description || "").toLowerCase().includes(filter) ||
      (item.category || "").toLowerCase().includes(filter)
  );
};

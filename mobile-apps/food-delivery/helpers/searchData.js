export const searchData = (data, searchTerm) => {
  if (!searchTerm) return data;

  const search = searchTerm.toLowerCase();

  return data.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(search) ||
      (item.title || "").toLowerCase().includes(search) ||
      (item.description || "").toLowerCase().includes(search) ||
      (item.category || "").toLowerCase().includes(search)
  );
};

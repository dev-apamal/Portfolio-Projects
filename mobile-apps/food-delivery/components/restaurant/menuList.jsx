import { SectionList } from "react-native";
import { useCallback, useMemo } from "react";
import { FoodItem } from "../restaurant/foodItem";
import { MenuSectionHeader } from "../restaurant/menuSectionHeader";
import { RestaurantHeader } from "../restaurant/restaurantHeader";

export const MenuList = ({ restaurant, onAddItem }) => {
  // Memoize section data
  const sectionData = useMemo(
    () =>
      restaurant.menu?.map((category) => ({
        title: category.category,
        data: category.items,
      })) || [],
    [restaurant.menu]
  );

  // Memoized render functions
  const renderSectionHeader = useCallback(
    ({ section: { title } }) => <MenuSectionHeader title={title} />,
    []
  );

  const renderFoodItem = useCallback(
    ({ item }) => <FoodItem item={item} onAddItem={onAddItem} />,
    [onAddItem]
  );

  const keyExtractor = useCallback(
    (item, index) => `${item.name}-${item.price}-${index}`,
    []
  );

  const ListHeaderComponent = useCallback(
    () => <RestaurantHeader restaurant={restaurant} />,
    [restaurant]
  );

  return (
    <SectionList
      sections={sectionData}
      keyExtractor={keyExtractor}
      renderItem={renderFoodItem}
      renderSectionHeader={renderSectionHeader}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1 }}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
      getItemLayout={null}
      disableVirtualization={false}
    />
  );
};

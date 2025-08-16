import { Text } from "react-native";

export const MenuSectionHeader = ({ title }) => {
  return (
    <Text className="text-base font-bold text-gray-700 p-4 bg-gray-50">
      {title}
    </Text>
  );
};

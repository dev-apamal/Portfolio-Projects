import { View, Text, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { router } from "expo-router";

const SearchInput = ({ placeholder = "Search dishes, restaurants" }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleTextChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      router.push({
        pathname: "/search",
        params: { query: searchValue.trim() },
      });
      setSearchValue("");
    }
  };

  return (
    <View className="flex-row items-center bg-gray-100 mb-10 rounded-2xl p-4 gap-2">
      <MaterialIcons name="search" size={20} color="gray" />
      <TextInput
        value={searchValue}
        className="flex-1"
        returnKeyType="search"
        placeholder={placeholder}
        clearButtonMode="while-editing"
        onChangeText={handleTextChange}
        onSubmitEditing={handleSearchSubmit}
      />
    </View>
  );
};

export default SearchInput;

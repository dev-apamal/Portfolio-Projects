import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CardsData } from "../assets/data/cardsData";
import { searchData } from "../helpers/searchData";
import Cards from "./ui/cards";

const SearchPage = () => {
  const { query } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCard = () => {
    return null;
  };

  // Mock search function - replace with your actual search API
  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const filteredData = searchData(CardsData, searchQuery);

      setSearchResults(filteredData);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const renderSearchResult = ({ item }) => (
    <View className="flex-col justify-center items-center">
      <Cards item={item} handlePress={handleCard} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white ">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-lg flex-1">Search Results for "{query}"</Text>
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-600">Searching...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <>
            <Text className="text-gray-600 text-sm mb-4">
              Found {searchResults.length} results
            </Text>
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <MaterialIcons name="search-off" size={40} color="gray" />
            <Text className="text-lg mt-4">No results found</Text>
            <Text className="text-center text-gray-600 mt-1">
              Try searching with different keywords
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

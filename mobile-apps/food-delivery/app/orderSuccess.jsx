// app/orderSuccess.js
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function OrderSuccess() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.replace("/"); // or wherever your home screen is
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 bg-white ">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="w-20 h-20 bg-green-100 rounded-full justify-center items-center mb-6">
          <Text className="text-3xl">✓</Text>
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-center mb-4">
          Order Confirmed!
        </Text>

        <Text className=" text-center mb-2">Thank you for your order</Text>

        <Text className="text-gray-600 text-center mb-8">
          Your delicious food is being prepared and will be delivered soon
        </Text>

        {/* Order Details */}
        <View className="w-full bg-gray-50 rounded-3xl items-center p-4 mb-8">
          <Text className="text-sm text-gray-500 mb-1">Order ID</Text>
          <Text className="text-lg font-semibold mb-3">#12345</Text>

          <Text className="text-sm text-gray-500 mb-1">Estimated Delivery</Text>
          <Text className="text-lg font-semibold">25-35 minutes</Text>
        </View>

        {/* Action Buttons */}
        {/* <View className="w-full space-y-4">
          <TouchableOpacity
            onPress={handleTrackOrder}
            className="w-full p-4 rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white font-semibold text-center text-lg">
              Track Your Order
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

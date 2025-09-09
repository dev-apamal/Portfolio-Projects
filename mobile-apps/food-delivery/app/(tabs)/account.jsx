import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";

export default function AccountScreen() {
  const handleSettingPress = (settingName) => {
    Alert.alert("Setting Pressed", `You tapped on ${settingName}`);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("User logged out"),
      },
    ]);
  };

  const settingsData = [
    { id: 1, title: "Edit Profile", icon: "👤" },
    { id: 2, title: "Notifications", icon: "🔔" },
    { id: 3, title: "Privacy & Security", icon: "🔒" },
    { id: 4, title: "Payment Methods", icon: "💳" },
    { id: 5, title: "Help & Support", icon: "❓" },
    { id: 6, title: "About", icon: "ℹ️" },
    { id: 7, title: "Language", icon: "🌐" },
    { id: 8, title: "Dark Mode", icon: "🌙" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white flex-1 p-4">
        <Text className="text-xl mb-4 text-gray-700">Account</Text>

        <ScrollView className="flex-1">
          {/* Profile Card */}
          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <View className="items-center mb-4">
              <Image
                source={{
                  uri: "https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=JD",
                }}
                className="w-20 h-20 rounded-full mb-3"
              />
              <Text className="text-lg font-bold text-gray-800">John Doe</Text>
              <Text className="text-sm text-gray-600">
                john.doe@example.com
              </Text>
              <Text className="text-sm text-gray-600">+1 (555) 123-4567</Text>
            </View>

            <TouchableOpacity className="bg-blue-500 rounded-lg py-2 items-center">
              <Text className="text-white font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Settings List */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-700 mb-3">
              Settings
            </Text>

            {settingsData.map((setting) => (
              <TouchableOpacity
                key={setting.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100"
                onPress={() => handleSettingPress(setting.title)}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-3">{setting.icon}</Text>
                  <Text className="text-base text-gray-700">
                    {setting.title}
                  </Text>
                </View>
                <Text className="text-gray-400">›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-3 items-center mb-4"
            onPress={handleLogout}
          >
            <Text className="text-white font-medium">Logout</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text className="text-center text-gray-400 text-xs">
            App Version 1.0.0
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

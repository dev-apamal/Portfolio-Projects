import { Stack } from "expo-router";
import "../global.css";
import { CartProvider } from "../context/cartContext";

// Add this to any component to see cart data
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const viewCartData = async () => {
//   try {
//     const cartData = await AsyncStorage.getItem("restaurant_cart");
//     console.log("Stored Cart:", JSON.parse(cartData));
//   } catch (error) {
//     console.log("Error reading cart:", error);
//   }
// };

// viewCartData();

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detailedCard" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}

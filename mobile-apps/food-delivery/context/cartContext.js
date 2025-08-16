// contexts/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { item, restaurantId, restaurantName } = action.payload;

      // Check if cart is from different restaurant
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        // Clear cart if switching restaurants
        return {
          items: [{ ...item, quantity: 1, id: Date.now() }],
          restaurantId,
          restaurantName,
          total: item.price,
          itemCount: 1,
        };
      }

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (cartItem) =>
          cartItem.name === item.name && cartItem.price === item.price
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;

        return {
          ...state,
          items: updatedItems,
          total: state.total + item.price,
          itemCount: state.itemCount + 1,
        };
      } else {
        // Add new item to cart
        const newItem = { ...item, quantity: 1, id: Date.now() };
        return {
          ...state,
          items: [...state.items, newItem],
          restaurantId: restaurantId || state.restaurantId,
          restaurantName: restaurantName || state.restaurantName,
          total: state.total + item.price,
          itemCount: state.itemCount + 1,
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id } = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);

      if (!itemToRemove) return state;

      const updatedItems = state.items.filter((item) => item.id !== id);

      return {
        ...state,
        items: updatedItems,
        total: state.total - itemToRemove.price * itemToRemove.quantity,
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          payload: { id },
        });
      }

      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          const quantityDiff = quantity - item.quantity;
          return { ...item, quantity };
        }
        return item;
      });

      const item = state.items.find((item) => item.id === id);
      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price * quantityDiff,
        itemCount: state.itemCount + quantityDiff,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        restaurantId: null,
        restaurantName: null,
        total: 0,
        itemCount: 0,
      };

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
  total: 0,
  itemCount: 0,
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to AsyncStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage();
  }, [cart]);

  const loadCartFromStorage = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("restaurant_cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem("restaurant_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  // Cart actions
  const addItem = (item, restaurantId, restaurantName) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { item, restaurantId, restaurantName },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id },
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const isItemInCart = (itemName, itemPrice) => {
    return cart.items.some(
      (cartItem) => cartItem.name === itemName && cartItem.price === itemPrice
    );
  };

  const getItemQuantity = (itemName, itemPrice) => {
    const item = cart.items.find(
      (cartItem) => cartItem.name === itemName && cartItem.price === itemPrice
    );
    return item ? item.quantity : 0;
  };

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isItemInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

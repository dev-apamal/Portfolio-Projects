# Food Delivery App

A modern food delivery application built with React Native, Expo, and Firebase. Users can browse restaurants, place orders, and track deliveries in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Authentication** - Email/password and Google login
- **Restaurant Discovery** - Browse by cuisine, rating, and location
- **Menu & Cart** - Add items, customize orders, and checkout
- **Order Tracking** - Real-time status updates and delivery tracking
- **Payment Integration** - Secure payments with Stripe
- **Push Notifications** - Order updates and promotions
- **User Profiles** - Manage addresses, payment methods, and order history

## Tech Stack

- React Native with Expo
- Firebase (Authentication, Firestore, Storage, Cloud Functions)
- Redux Toolkit
- React Native Maps
- Expo Notifications
- Stripe for payments

## Prerequisites

- Node.js (v16+)
- Expo CLI (`npm install -g @expo/cli`)
- Firebase account

## Installation

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd food-delivery-app
   npm install
   ```

2. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password, Google)
   - Create Firestore database
   - Set up Storage bucket
   - Copy configuration to `firebaseConfig.js`:

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);
   ```

3. **Environment Variables**

   Create `.env` file:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
   ```

## Running the App

```bash
# Start development server
expo start

# Run on specific platforms
expo start --ios
expo start --android
```

## Project Structure

```
├── components/         # Reusable UI components
├── app/           # App screens (Auth, Home, Restaurant, Cart, Orders)
├── services/          # Firebase and API services
├── store/            # Redux store and slices
├── helpers/            # Helper functions
└── constants/        # App constants
```

## Firestore Collections

- **users** - User profiles and preferences
- **restaurants** - Restaurant data and menus
- **orders** - Order history and tracking
- **categories** - Food categories and cuisines

## Main Dependencies

```json
{
  "expo": "~49.0.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.0",
  "@reduxjs/toolkit": "^1.9.0",
  "firebase": "^10.0.0",
  "expo-notifications": "~0.20.0",
  "react-native-maps": "1.7.1"
}
```

## License

MIT License

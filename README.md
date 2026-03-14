# Fitness Passport 

## Overview

This project implements a mobile application that displays gym locations on a map.

The project was built using React Native and TypeScript and focuses on clean architecture,
separation of concerns, and scalability.

## Design Summary

The application follows a feature-based architecture to improve scalability and maintainability.

Each feature contains its screens, components, hooks, and services, allowing features to evolve independently.

## Tech Stack

- React Native
- TypeScript
- React Navigation
- bottom-tabs
- Expo
- vector-icons
- Shopify FlashList

## Running the Project

Install dependencies
```
npm install
```

Start the development server
```
npx expo start
```

Run on iOS simulator
```
press "i"
```

## Project Structure

src/
  navigation/     App Navigation 
  assets/         Asset files used by the app
  components/     Shared UI components
  services/       API and external services
  screens/        UI Screens         
  styles/         Reusable UI Elements 
  utils/          Utility functions

## Architecture Decisions

- Feature-based folder structure to improve scalability
- Services layer used for API communication
- It uses `useState` as its state management solution
- Uses Shopify FlashList for better performance

## Assumptions

- The service API (local json containing all the gym locations) always returns valid coordinates
- Error handling was simplified

## Trade-offs and Possible Improvements

- The client API is only reading from a local JSON file, could easily be extended to invoke a REST API;
- Map markers could be clustered for better performance;
- Infinite scrolling and pull to refresh can be used on the locations list to improve performance;
- Unit tests could be added for service layers and UI;
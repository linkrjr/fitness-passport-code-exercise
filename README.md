# Fitness Passport 

## Overview

This project implements a mobile application that displays gym locations on a map.
Users can view markers, zoom into the map, and center the map on their current location.

The project was built using React Native and TypeScript and focuses on clean architecture,
separation of concerns, and scalability.

## Design Summary

The application follows a feature-based architecture to improve scalability and maintainability.

Each feature contains its screens, components, hooks, and services, allowing features to evolve independently.

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Expo

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
  hooks/          Reusable hooks
  styles/         Reusable UI Elements 
  utils/          Utility functions

## Architecture Decisions

- Feature-based folder structure to improve scalability
- ?????Hooks used to isolate business logic from UI components?????
- Services layer used for API communication

## Assumptions

- The service API (local json containing all the gym locations) always returns valid coordinates
- Error handling was simplified

## Trade-offs and Possible Improvements

- The client API is only reading from a local JSON file, could easily be extended to invoke a REST API;
- Map markers could be clustered for better performance???
- Additional unit tests could be added for service layers
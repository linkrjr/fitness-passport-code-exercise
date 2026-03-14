import { StyleSheet } from 'react-native';

// styles/common.js
export const flexPatterns = StyleSheet.create({
  // Container patterns
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  // Child patterns
  flex1: {
    flex: 1,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
});
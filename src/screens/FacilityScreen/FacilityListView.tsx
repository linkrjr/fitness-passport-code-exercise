import { SPACING } from '@styles/theme';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.xl,
  }
});

type FacilityListViewProps = {
  facilities: string[],
}

const FacilityListView = ({ facilities }: FacilityListViewProps) => {
  return (
    <View style={styles.container}>
      <Text>Facilities:</Text>
      {facilities.map((facility) => (
        <Text key={facility}>- {facility}</Text>
      ))}            
    </View>          
  );
}

export default FacilityListView;

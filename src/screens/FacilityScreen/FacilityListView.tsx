import { StyleSheet, Text, View } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
        <Unorderedlist key={facility}><Text key={facility}>{facility}</Text></Unorderedlist>
      ))}            
    </View>          
  );
}

export default FacilityListView;

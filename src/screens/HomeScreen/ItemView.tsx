import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Facility } from '@models/Facility';
import { COLORS, SPACING, TYPOGRAPHY } from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  item: {
    padding: SPACING.xl,
  },

  name: {
    fontSize: TYPOGRAPHY.sizes.heading,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle,
    color: COLORS.textSecondary,
  },
});

type ItemProps = { 
  item: Facility, 
  onPress: () => void,
};

const ItemView = ({ item, onPress }: ItemProps ) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View>
      <Text style={styles.name} >{item.name}</ Text>
      <Text style={styles.subtitle} >{item.address}</ Text>
    </View>
  </TouchableOpacity>
);

export default ItemView;
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
});

export type EmptyProps = {
  text: string,
}

const EmptyList = ({ text }: EmptyProps) => {
  return (
    <View style={styles.emptyList}>
      <Text>{text}</Text>
    </View>
  );
}

export default EmptyList;

import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
});

export type EmptyProps = {
  text: string,
}

const EmptyView = ({ text }: EmptyProps) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

export default EmptyView;

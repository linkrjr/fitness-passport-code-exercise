import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
});


const AboutView = () => {
  return (
    <View style={styles.container}>
      <Text>Fitness Passport Code Exercise</Text>
    </View>
  );
}

export default AboutView;

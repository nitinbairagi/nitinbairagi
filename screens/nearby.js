import {View, Text, StyleSheet} from 'react-native';

function Nearby() {
  return (
    <View style={styles.root}>
      <Text>Nearby place</Text>
    </View>
  );
}
export default Nearby;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

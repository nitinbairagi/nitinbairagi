import {View, Text, StyleSheet} from 'react-native';

function PlaceDetail() {
  return (
    <View style={styles.root}>
      <Text>PlaceDetail</Text>
    </View>
  );
}
export default PlaceDetail;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

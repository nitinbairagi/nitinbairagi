import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Loader} from '../utility/loader';
// import {Loader} from '../utility/loader';

function Splash({route}) {
  console.log(route);

  <View style={styles.container}>
    <Image
      style={{height: 200, width: 200}}
      source={require('../testimage/56.png')}
    />
  </View>;
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    width: 250,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

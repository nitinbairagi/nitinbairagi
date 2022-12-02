import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
function Picked({uri, title, address}) {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.screen}>
        <Image style={{width: 150, height: 140}} source={{uri: uri}} />
      </View>
      <View style={styles.itemtext}>
        <Text style={{fontSize: 18, color: 'black'}}>{title}</Text>
        <Rating
          style={{alignItems: 'flex-start'}}
          type="star"
          readonly={true}
          startingValue={5}
          ratingCount={5}
          imageSize={18}
        />
        <Text style={{fontSize: 16, color: 'black'}}>{address}</Text>
        <Text style={{fontSize: 16, color: 'black'}}>price</Text>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Browser', {
                id: 'EDIT_PROPERTY',
                property_id: property_id,
              });
            }}
            style={{
              borderRadius: 5,
              backgroundColor: '#fce517',
              borderWidth: 0.5,
              padding: 5,
              borderColor: '#fce517',
              elevation: 4,
            }}> */}
        {/* <Text style={{textAlign: 'center', color: 'black'}}>Edit</Text> */}
        {/* </Pressable> */}
        {/* 
        {/* </View> */}
      </View>
    </View>
  );
}
export default Picked;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  screen: {
    flex: 1,
  },
  itemtext: {
    flex: 1.2,
  },
});

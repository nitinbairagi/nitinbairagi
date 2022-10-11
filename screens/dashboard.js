import {useState} from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';

function Dashboard() {
  const [text, settext] = useState('');

  const IST = new Date().toDateString();
  const ISTDate = `${IST.slice(8, 10)}-${IST.slice(4, 8).trim()}-${IST.slice(
    11,
    15,
  )}`;
  // console.log(ISTDate);

  const image = [
    '../testimage/test1.jpg',
    '../testimage/test2.jpg',
    '../testimage/test3.jpg',
    '../testimage/test1.jpg',
    '../testimage/test2.jpg',
    '../testimage/test2.jpg',
    '../testimage/test3.jpg',
    '../testimage/test1.jpg',
    '../testimage/test2.jpg',
    '../testimage/test3.jpg',
  ];

  function locationbar(data) {
    return (
      <View style={styles.locationbar}>
        <Image
          style={styles.circle}
          resizeMode="contain"
          source={require('../testimage/56.png')}
        />
        <Text style={styles.locationbartext}>city-name</Text>
      </View>
    );
  }

  function img(data) {
    // console.log(data);

    return (
      <View>
        <View style={styles.test1}>
          <Icon
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
            }}
            name="bookmark-outline"
            size={25}
          />
          <Image
            resizeMode="center"
            source={require('../testimage/test3.jpg')}
          />
        </View>
        <View style={styles.address}>
          <View
            style={[
              styles.address,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 0,
              },
            ]}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={18}
              // tintColor="red"
            />
            <View>
              {/* <Text style={styles.addtext}>Posted-date</Text> */}
              <Text style={styles.addtext}>{ISTDate}</Text>
            </View>
          </View>
          <Text style={[styles.addtext, {fontSize: 18}]}>title</Text>
          <Text style={styles.addtext}>address</Text>
          <Text style={styles.addtext}>price</Text>
        </View>
      </View>
    );
  }

  function onChangeText(data) {
    settext(data);
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.textinput1}>
        <TextInput
          style={styles.TextInput}
          placeholder="location"
          inlineImageLeft="search_4"
          inlineImagePadding={10}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      <View>
        <FlatList
          // maxToRenderPerBatch={10}
          horizontal={true}
          data={image}
          keyExtractor={item => item.key}
          renderItem={locationbar}></FlatList>
      </View>
      <View style={styles.screen}>
        <Text style={styles.text}>Picked Location</Text>
        <FlatList
          // maxToRenderPerBatch={6}
          // initialNumToRender={5}
          data={image}
          keyExtractor={item => item.key}
          renderItem={img}
          horizontal={true}
        />
      </View>

      <View style={styles.screen}>
        <Text style={styles.text}>Favroite Location</Text>

        <FlatList
          data={image}
          keyExtractor={item => item.key}
          renderItem={img}
          horizontal={true}
          // initialNumToRender={5}
        />
      </View>
      <View style={styles.screen}>
        <Text style={styles.text}>Property</Text>
        <FlatList
          data={image}
          keyExtractor={item => item.key}
          renderItem={img}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 50,
  },
  test1: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 9,
    backgroundColor: '#fffbc5',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 195,
    height: 150,
    overflow: 'hidden',
    marginLeft: 15,
  },

  text: {
    marginLeft: 15,
    margin: 5,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textinput1: {
    marginTop: 5,
  },
  TextInput: {
    backgroundColor: '#f8f8f8',
    height: 50,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    margin: 5,
    borderWidth: 0.001,
    marginHorizontal: 10,
  },
  circle: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 60 / 2,
    marginTop: 15,
    marginHorizontal: 10,
    backgroundColor: '#faf8e3',
  },
  locationbar: {
    marginBottom: 50,
  },
  locationbartext: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
  },
  address: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 195,
    marginLeft: 15,
  },
  addtext: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 12,
  },
});

import {useState} from 'react';
import {Text, StyleSheet, Image, View, TextInput, FlatList} from 'react-native';
import {Rating} from 'react-native-ratings';

const image = [
  '../testimage/test1.jpg',
  '../testimage/test2.jpg',
  '../testimage/test3.jpg',
  '../testimage/test3.jpg',
  '../testimage/test2.jpg',
  '../testimage/test3.jpg',
  '../testimage/test3.jpg',
  '../testimage/test2.jpg',
  '../testimage/test3.jpg',
  '../testimage/test3.jpg',
  '../testimage/test3.jpg',
];

function PlaceItem() {
  const [text, settext] = useState();
  function onChangeText(data) {
    console.log(data);
    settext(data);
  }

  function places() {
    const IST = new Date().toDateString();
    const ISTDate = `${IST.slice(8, 10)}-${IST.slice(4, 8).trim()}-${IST.slice(
      11,
      15,
    )}`;
    return (
      <View style={styles.tab}>
        <View style={styles.test1}>
          <Image
            resizeMode="center"
            source={require('../testimage/test3.jpg')}
          />
        </View>

        <View style={styles.address}>
          <Text style={[styles.addtext, {fontSize: 18}]}>title</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={16}
            tintColor="#e9e7e7"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.addtext}>Posted-date</Text>
            <Text style={styles.addtext}>{ISTDate}</Text>
          </View>
          <Text style={styles.addtext}>address</Text>
          <Text style={styles.addtext}>price</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{marginBottom: 40}}>
      <Text style={styles.textinput1}>All Places</Text>
      <View style={styles.textinput1}>
        <TextInput
          style={styles.TextInput}
          placeholder="location"
          inlineImageLeft="search_4"
          inlineImagePadding={10}
          onChangeText={onChangeText}
          value={text}
        />
        <FlatList
          data={image}
          keyExtractor={item => item.key}
          renderItem={places}
        />
      </View>
    </View>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    backgroundColor: '#e9e7e7',
    borderWidth: 0.3,
    borderColor: '#cccccc',
    borderRadius: 20,
    elevation: 3,
    flexDirection: 'row',
    marginHorizontal: 10,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 5,
  },
  textinput1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -3,
  },
  TextInput: {
    borderWidth: 0.2,
    backgroundColor: '#f8f8f8',
    height: 50,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    margin: 5,
    marginHorizontal: 10,
  },
  test1: {
    flex: 4.5,
    backgroundColor: '#fffbc5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    overflow: 'hidden',
  },

  text: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },

  address: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 195,
    marginLeft: 5,
  },
  addtext: {
    marginBottom: 3,
    marginTop: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 15,
    color: 'black',
  },
});

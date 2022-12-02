import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
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
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';
import {AddFav, home} from '../utility/database';
import {Loader} from '../utility/loader';

function Dashboard({navigation}) {
  const [isLoggedin, setisLoggedin] = useState(false);
  // console.log(isLoggedin);

  const [text, settext] = useState('');
  const [apiData, setApiData] = useState({
    popular: [],
    premium: [],
    metro_city: [],
  });
  const [user, setuser] = useState({
    user_id: '',
  });

  // console.log(apiData.premium);

  useEffect(() => {
    AsyncStorage.getItem('user').then(res => setuser({user_id: res}));

    home().then(x => {
      if (x.status) {
        setisLoggedin(true);
        setApiData(x.data);
      }
    });
  }, []);

  const IST = new Date().toDateString();
  const ISTDate = `${IST.slice(8, 10)}-${IST.slice(4, 8).trim()}-${IST.slice(
    11,
    15,
  )}`;
  // console.log(ISTDate);

  function locationbar({item}) {
    // console.log(item.name);

    return (
      <View style={styles.locationbar}>
        <Pressable
          onPress={() => navigation.navigate('PLACE', {name: item.name})}>
          <Image
            style={styles.circle}
            resizeMode="center"
            source={{uri: item.image}}
          />
        </Pressable>
        <Text style={styles.locationbartext}>{item.name}</Text>
      </View>
    );
  }

  function img(data) {
    // console.log(data.item.images);

    let image = '';
    if (data.item.images) {
      const json_data = JSON.parse(data.item.images);
      if (json_data[0] != undefined) {
        image = data.item.base_url + json_data[0];
        // console.log(image);
      } else {
        image = data.item.base_url + json_data[Object.keys(json_data)[0]];
      }
    }
    // console.log(image);

    function favorite() {
      if (user.user_id && data.item.id) {
        AddFav({
          user_id: user.user_id,
          data: data.item,
          property_id: data.item.id,
        }).then(res => {
          // console.log(res);

          if (res.message === 'Added to Favorite!') {
            Alert.alert('Added sucessfully');
            console.log(data.item.id);
          }
          if (res.message === 'Removed to Favorite!') {
            Alert.alert('Removed sucessfully');
          }
        });
      }
    }

    function pressHandler() {
      navigation.navigate('Detail', {id: data.item.id, user_id: user.user_id});
    }
    return (
      <View>
        <View style={styles.test1}>
          <Pressable onPress={pressHandler}>
            <Image
              style={{width: 300, height: 300}}
              resizeMode="cover"
              source={{
                uri: image,
              }}
            />
          </Pressable>
          <Icon
            onPress={favorite}
            style={{
              position: 'absolute',
              top: 5,
              right: 10,
              color: '#fce517',
            }}
            name={'heart-outline'}
            size={30}
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
              readonly={true}
              startingValue={5}
              ratingCount={5}
              imageSize={18}
            />
            <View>
              <Text style={styles.addtext}>{ISTDate}</Text>
            </View>
          </View>
          <Text style={[styles.addtext, {fontSize: 16}]}>
            {data.item.title}
          </Text>
          <Text style={styles.addtext}>{data.item.address}</Text>
          <Text style={styles.addtext}>price</Text>
        </View>
      </View>
    );
  }
  // console.log(text);

  function onChangeText(data) {
    console.log(text.length === 2);
    settext(data);
    if (text.length === 2) {
      navigation.navigate('Location', {name: text});
    }
  }

  return isLoggedin == false ? (
    <Loader />
  ) : (
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
          horizontal={true}
          data={apiData.metro_city}
          keyExtractor={item => item.key}
          renderItem={locationbar}></FlatList>
      </View>
      <View style={styles.screen}>
        <Text style={styles.text}>Premium Location</Text>
        <FlatList
          data={apiData.popular}
          keyExtractor={item => item.key}
          renderItem={img}
          horizontal={true}
        />
      </View>

      <View style={styles.screen}>
        <Text style={styles.text}>Popular Location</Text>

        <FlatList
          data={apiData.premium}
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
    marginBottom: 40,
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
    marginRight: 10,
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
    borderRadius: 60 / 2,
    marginTop: 15,
    marginHorizontal: 10,
    backgroundColor: '#f7f6f0',
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
  },
});

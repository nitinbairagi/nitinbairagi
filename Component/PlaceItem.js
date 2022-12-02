import {useState} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {Property} from '../utility/database';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../utility/loader';

function PlaceItem() {
  const [isLoggedin, setisLoggedin] = useState(false);
  // console.log(isLoggedin);

  function getuser() {
    AsyncStorage.getItem('password').then(x => {
      // setisLoggedin(x);
      // console.log(x);
    });
  }
  useEffect(() => {
    getuser();
  }, []);
  const route = useRoute();

  console.log(route.params?.name);
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);
  const [api, setApi] = useState([]);
  const [text, settext] = useState('');
  const [locname, setlocname] = useState('');
  // console.log(apiData);

  function getproperty() {
    Property().then(res => {
      if (res == null) {
        return;
      }
      if (res.data) {
        setisLoggedin(true);
        // console.log(res.data.data[0].title);
        setApiData(res.data);
        setApi(res.data);
      }
    });
  }

  useEffect(() => {
    if (route.params?.name) {
      setlocname(route.params?.name);
    }

    // settext(locname);
    getproperty();
  }, []);

  // console.log(route.params?.name);
  function onChangeText(data) {
    // console.log(data);
    if (data) {
      const newdata = apiData.filter(item => {
        const titledata = item.title ? item.title.toLowerCase() : '';
        const textdata = data ? data.toLowerCase() : '';
        return titledata.indexOf(textdata) > -1;
      });
      setApiData(newdata);
      settext(data);
    } else {
      settext(data);
      setApiData(api);
    }
    if (locname) {
      const newdata = apiData.filter(item => {
        const titledata = item.title ? item.title.toLowerCase() : '';
        const textdata = locname ? locname.toLowerCase() : '';
        return titledata.indexOf(textdata) > -1;
      });
      setApiData(newdata);
      settext(data);
    } else {
      settext(data);
      setApiData(api);
    }
    // if (locname) {
    //   const namedata = apiData.filter(item => {
    //     const addressdata = item.address ? item.address.toLowerCase() : '';
    //     const textdata = locname ? locname.toLowerCase() : '';
    //     console.log(namedata);
    //     return addressdata.indexOf(textdata) > -1;
    //   });
    //   setApiData(namedata);
    //   settext(locname);
    // } else {
    //   settext(data);
    //   setApiData(api);
    // }
  }

  function places({item}) {
    // console.log(item.id);

    let image = '';
    if (item.images) {
      const json_data = JSON.parse(item.images);
      // console.log('img', json_data);

      if (json_data[1] != undefined) {
        image = item.base_url + json_data[1];
      } else {
        image = item.base_url + json_data[Object.keys(json_data)[1]];
        // console.log('x', image);
      }
    }
    // console.log(image);

    const IST = new Date().toDateString();
    const ISTDate = `${IST.slice(8, 10)}-${IST.slice(4, 8).trim()}-${IST.slice(
      11,
      15,
    )}`;

    function pressHandler() {
      navigation.navigate('Detail', {id: item.id});
    }

    return (
      <View style={styles.tab}>
        <View style={styles.test1}>
          <Pressable onPress={pressHandler}>
            <Image
              style={{
                height: 150,
                width: 150,
              }}
              resizeMode="cover"
              source={{uri: image}}
            />
            {/* <Text>Text</Text> */}
          </Pressable>
        </View>

        <View style={styles.address}>
          <Text style={[styles.addtext, {fontSize: 18}]}>{item.title}</Text>
          <Rating
            type="star"
            startingValue={5}
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
          <Text style={styles.addtext}>{item.address}</Text>
          <Text style={styles.addtext}>price</Text>
        </View>
      </View>
    );
  }

  return isLoggedin === false ? (
    <Loader />
  ) : (
    <View style={{flex: 1, marginBottom: 70}}>
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
          initialNumToRender={10}
          data={apiData}
          keyExtractor={item => item.index}
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
    marginTop: 15,
    marginBottom: 5,
  },
  textinput1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
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
    // height: 130,
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

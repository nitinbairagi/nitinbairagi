import WebView from 'react-native-webview';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import {BookRecee, PropertyDeatil} from '../utility/database';
import {useRoute} from '@react-navigation/native';
import {ReactNativeZoomableView} from '@dudigital/react-native-zoomable-view/dist';
import {Linking} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function PlaceDescription() {
  const route = useRoute();
  const [id, setid] = useState({user_id: '', property_id: ''});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isfromPickerVisible, setfromPickerVisibility] = useState(false);
  const [istoPickerVisible, settoPickerVisibility] = useState(false);
  const [filtereddata, setfiltereddata] = useState({});
  const [date0, setdate] = useState({From: ''});
  const [time, settime] = useState({From: ''});
  const [time1, settime1] = useState({To: ''});
  const [Bookdata, setBookdata] = useState({
    name: '',
    Phone: '',
    Email: '',
    Message: '',
    title: '',
  });
  console.log(filtereddata);

  function booked() {
    BookRecee({
      name: Bookdata.name,
      mobile: Bookdata.Phone,
      email: Bookdata.Email,
      booking_date: date0.From,
      booking_from_time: time.From,
      booking_to_time: time1.To,
      user_id: id.user_id,
      property_id: id.property_id,
    }).then(res => {
      if (res.status) {
        Alert.alert('Sucessfull', `${res.message}`);
      } else {
        if (Object.keys(res).includes('errors')) {
          Alert.alert(`${res.message}`, `${Object.values(res.errors)[0]}`);
        }
      }
    });
  }

  useEffect(() => {
    PropertyDeatil(route.params.id).then(res => {
      if (res.status) {
        setfiltereddata(res.data);
        setid({user_id: route.params.user_id, property_id: route.params.id});
      } else {
        //popup property not found
        Alert.alert('property not found');
        // navigate place list pagge
        navigation.navigate('PLACE');
      }
    });
  }, []);

  const IST = new Date(filtereddata.expire_date).toDateString();
  const ISTDate = `${IST.slice(8, 10)}-${IST.slice(4, 8).trim()}-${IST.slice(
    11,
    15,
  )}`;

  let image = [];
  if (filtereddata.images) {
    const json_data = JSON.parse(filtereddata.images);
    // console.log(Object.values(json_data));
    if (json_data != undefined) {
      // image = image.find(img => img.replace('jpeg', 'jpg'));
      image = Object.values(json_data);
    } else {
      image = filtereddata.base_url + json_data[Object.values(json_data)];
    }
  }

  function imageHandler(data) {
    return (
      <View>
        <View style={styles.image1}>
          <View style={styles.item1}>
            <ReactNativeZoomableView
              maxZoom={2.5}
              minZoom={0.5}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}>
              <Image
                style={{
                  height: 220,
                  borderRadius: 10,
                  margin: 0.5,
                  width: 337,
                }}
                resizeMode="cover"
                source={{uri: filtereddata.base_url + data.item}}
              />
            </ReactNativeZoomableView>
          </View>
        </View>
      </View>
    );
  }

  let webvue = <View></View>;
  if (filtereddata.description) {
    webvue = (
      <WebView
        nestedScrollEnabled={true}
        containerStyle={{
          flex: 1,
          marginBottom: 10,
        }}
        textZoom={250}
        style={{
          height: 200,
          alignItems: 'center',
          marginLeft: -3,
          width: 320,
          backgroundColor: '#ffffff',
        }}
        source={{html: `${filtereddata.description}`}}
      />
    );
  }

  function Datepicker() {
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
      const date1 = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      setdate({From: `${date1}`});
      Alert.alert('A date has been picked: ', `${date1}`);
      hideDatePicker();
    };
    return (
      <>
        <TextInput
          defaultValue={`${date0.From}`}
          onFocus={showDatePicker}
          showSoftInputOnFocus={false}
          style={styles.TextInput}
          placeholder="Booking Date"
        />
        <DateTimePickerModal
          style={{width: 100, height: 100}}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </>
    );
  }
  function Frompicker() {
    const showDatePicker = () => {
      setfromPickerVisibility(true);
    };

    const hideDatePicker = () => {
      setfromPickerVisibility(false);
    };

    const handleConfirm = date => {
      const date1 = date.toLocaleTimeString('en-US', {hour12: false});
      settime({From: `${date1}`});
      Alert.alert('A time has been picked: ', `${date1}`);
      hideDatePicker();
    };
    return (
      <>
        <TextInput
          defaultValue={`${time.From}`}
          onFocus={showDatePicker}
          placeholder="From"
          showSoftInputOnFocus={false}
          style={styles.TextInput}
        />
        <DateTimePickerModal
          style={{width: 100, height: 100}}
          isVisible={isfromPickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </>
    );
  }
  function Topicker() {
    const showDatePicker = () => {
      settoPickerVisibility(true);
    };

    const hideDatePicker = () => {
      settoPickerVisibility(false);
    };

    const handleConfirm = date => {
      const date1 = date.toLocaleTimeString('en-US', {hour12: false});
      settime1({To: `${date1}`});
      Alert.alert('A time has been picked: ', `${date1}`);
      hideDatePicker();
    };
    return (
      <>
        <TextInput
          defaultValue={`${time1.To}`}
          onFocus={showDatePicker}
          showSoftInputOnFocus={false}
          style={styles.TextInput}
          placeholder="To"
        />
        <DateTimePickerModal
          style={{width: 100, height: 100}}
          isVisible={istoPickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </>
    );
  }

  return (
    <>
      <View>
        <Image
          style={{
            height: 55,
            alignSelf: 'center',
            backgroundColor: '#ffe65c',
          }}
          resizeMode="center"
          source={require('../testimage/logoms.png')}
          s
        />
      </View>
      <ScrollView
        style={{backgroundColor: '#ffffff'}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={{borderWidth: 0.5, borderRadius: 10}}>
            <FlatList
              pagingEnabled={true}
              horizontal={true}
              data={image}
              renderItem={imageHandler}
            />
            <View style={[styles.subitem1]}>
              <Text style={styles.highlighted}>
                {filtereddata.title ? filtereddata.title.toUpperCase() : null}
              </Text>
              <Text
                style={[styles.highlighted, {marginTop: 5, marginBottom: 5}]}>
                {filtereddata.types?.name}
              </Text>
              <View style={styles.location}>
                <Text style={{color: '#000000', marginLeft: -10}}>
                  Locatiob ID:{filtereddata.property_id}
                </Text>

                <Text style={{color: '#000000'}}>
                  {filtereddata.views} Views
                </Text>
                <Text style={{color: '#000000'}}>{ISTDate}</Text>
              </View>
              <Text style={styles.grey}>Location {filtereddata.address}</Text>
              <Text style={styles.grey}>Call : 97686 76666</Text>
              <View>
                <Text style={[styles.highlighted, {marginTop: 10}]}>
                  OverView
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.white}> Category </Text>
                  <Text style={styles.white}>
                    {filtereddata.categories
                      ? filtereddata.categories[0].name
                      : 'no categories'}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.white}> Square Feet </Text>
                  <Text style={filtereddata.sq_ft ? styles.white : null}>
                    {filtereddata.sq_ft}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.white}> Number of bedrooms </Text>
                  <Text style={filtereddata.bedroom ? styles.white : null}>
                    {filtereddata.bedroom}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.white}> Number of bathrooms </Text>
                  <Text style={filtereddata.bathroom ? styles.white : null}>
                    {filtereddata.bathroom}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.white}>
                    Number of floors {filtereddata.floor}
                  </Text>
                  <Text style={filtereddata.floor ? styles.white : null}>
                    {filtereddata.floor}
                  </Text>
                </View>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.highlighted}>Description</Text>
                <Text style={{color: '#000000'}}>{webvue}</Text>
              </View>
            </View>
          </View>
          <Text style={{color: '#000000', marginBottom: 5, fontSize: 16}}>
            Share this property
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}>
            <Pressable
              onPress={() => Linking.openURL('https://www.facebook.com/')}>
              <Image
                style={[styles.circle, {width: 62, marginLeft: -5}]}
                source={require('../testimage/facebook.png')}></Image>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL('https://www.linkedin.com/login')}>
              <Image
                style={[styles.circle, {marginRight: 5}]}
                source={require('../testimage/linked.png')}></Image>
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL('https://twitter.com/i/flow/login')
              }>
              <Image
                style={styles.circle}
                source={require('../testimage/twitter.png')}></Image>
            </Pressable>
          </View>
          <View style={styles.tollfree}>
            <Text>Toll free:1800 271 291</Text>
          </View>
          <View
            style={{
              borderWidth: 0.25,
              borderRadius: 15,
              marginTop: 10,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18, margin: 10}}>
              Book a Recee
            </Text>
            <View>
              <TextInput
                onChangeText={i => setBookdata({...Bookdata, name: i})}
                placeholder="Name"
                style={styles.TextInput}
              />
              <TextInput
                onChangeText={i => setBookdata({...Bookdata, Phone: i})}
                placeholder="mobile"
                style={styles.TextInput}
              />
              <TextInput
                onChangeText={i => setBookdata({...Bookdata, Email: i})}
                placeholder="Email"
                style={styles.TextInput}
              />

              <Pressable onPress={Datepicker}>
                <Datepicker />
              </Pressable>

              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-evenly',
                }}>
                <Pressable style={{flex: 1}} onPress={Frompicker}>
                  <Frompicker />
                </Pressable>

                <Pressable onPress={Topicker} style={{flex: 1}}>
                  <Topicker />
                </Pressable>
              </View>
              <TextInput
                onChangeText={i => setBookdata({...Bookdata, title: i})}
                style={styles.TextInput}>
                {filtereddata.title}
              </TextInput>
              <TextInput
                onChangeText={i => setBookdata({...Bookdata, Message: i})}
                placeholder="Message"
                style={[
                  styles.TextInput,
                  {
                    height: 50,
                    textAlign: 'justify',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                  },
                ]}
                multiline={true}
                numberOfLines={5}
              />
              <View
                style={{
                  margin: 10,
                  padding: 20,
                }}>
                <Button onPress={booked} title="Book Now" color="#ffe65c" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default PlaceDescription;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
  },
  image1: {
    borderRadius: 5,
  },
  item1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  subitem1: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 5,
  },
  TextInput: {
    backgroundColor: '#f8f8f8',
    height: 40,
    elevation: 3,
    padding: 10,
    fontSize: 14,
    borderRadius: 10,
    margin: 5,
    borderWidth: 0.001,
    marginHorizontal: 10,
  },
  item2: {
    elevation: 3,
    marginBottom: 20,
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 20,
    height: 360,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewmap: {
    height: 250,
    width: 360,
  },
  previewvideo: {
    borderRadius: 5,
    width: '100%',
    height: 200,
    borderWidth: 1,
    marginBottom: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 10,
  },
  tollfree: {
    backgroundColor: '#ffe65c',
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: '#ffe65c',
    elevation: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  highlighted: {
    borderWidth: 1,
    color: '#000000',
    padding: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    backgroundColor: '#fae986',
    borderColor: '#ffe65c',
    borderRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  grey: {
    color: '#000000',
    backgroundColor: '#e0dbdb',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  location: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#ebe3e3',
    borderColor: 'white',
    marginTop: 5,
    marginRight: 5,
  },
  white: {
    color: '#000000',
    backgroundColor: '#e0dbdb',

    padding: 3,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5,
  },
});

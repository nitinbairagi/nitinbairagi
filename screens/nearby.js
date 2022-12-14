import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  TextInput,
  Alert,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddProperty,
  Aminities,
  Categories,
  CityList,
  CountryList,
  Features,
  StateList,
} from '../utility/database';
import SelectDropdown from 'react-native-select-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CameraPermission} from '../utility/location';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Ionicons';
import {Loader} from '../utility/loader';

function Nearby() {
  const [id, setid] = useState('');
  const [Cid, setCid] = useState('');
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [feature, setfeature] = useState([]);
  const [aminity, setaminity] = useState([]);
  const [category, setcategory] = useState([]);
  const [images, setImages] = useState([]);
  const [select, setSelected] = useState([]);
  const [select1, setSelected1] = useState([]);
  const [loading, setloading] = useState(false);
  const [select2, setSelected2] = useState([]);
  // console.log(Object.values(aminity).map(i => i.name));
  // console.log(select);
  // console.log(images);

  const [input, setinput] = useState({
    // imageUri: '',
    title: '',
    short_description: '',
    country: '',
    state: '',
    city: '',
    property_location: '',
    pincode: '',
    latitude: '',
    longitude: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    area: '',
    amenities: '',
    video_url: '',
    walkthrough_url: '',
    status: '',
    category1: '',
    feature1: '',
  });
  // console.log(input);

  function launchCam() {
    CameraPermission();
    launchCamera().then(res => {
      console.log(res.assets[0]['fileName']);
      // setinput({imageUri: res.assets[0].uri});
      res.assets[0].name = res.assets[0].fileName;
      setImages([...images, res.assets[0]]);
    });
  }

  function launchgallery() {
    launchImageLibrary().then(res => {
      res.assets.forEach(x => {
        console.log(x);

        // x.name = fileName;
        setImages([...images, x]);
      });
    });
  }

  useEffect(() => {
    CountryList().then(res => {
      setloading(true);
      if (res.status) {
        setcountry(res.data);
      }
      setloading(false);
    });
    StateList().then(res => {
      setloading(true);
      if (res.status) {
        // console.log(Object.entries(res));
        setstate(res.data);
      }
      setloading(false);
    });

    CityList().then(res => {
      setloading(true);
      if (res.status) {
        // console.log(a);
        setcity(res.data);
      }
      setloading(false);
    });
    Aminities().then(res => {
      setloading(true);
      if (res.status) {
        setaminity(res.data);
      }
      setloading(false);
    });
    Features().then(res => {
      setloading(true);
      if (res.status) {
        setfeature(res.data);
      }
      setloading(false);
    });
    Categories().then(res => {
      setloading(true);
      if (res.status) {
        setcategory(res.data);
      }
      setloading(false);
    });

    AsyncStorage.getItem('user').then(res => setid(res));
  }, []);

  function myimageHandler(data) {
    // console.log(data);
    function deleteimgHandler() {
      // console.log(data.item.fileName);
      const a = images.find(i => i.fileName === data.item.fileName);
      console.log(!!a);
      if (!!a) {
        images.pop(a);
      } else {
        setImages([]);
      }
    }
    // console.log(data.item.uri);

    return (
      <View>
        <Image
          resizeMode="cover"
          source={{uri: data.item.uri}}
          style={{
            flexDirection: 'row',
            width: 300,
            height: 200,
          }}
        />
        <Icon
          onPress={deleteimgHandler}
          name="close"
          size={30}
          style={{position: 'absolute', left: 260}}
          color="red"
        />
      </View>
    );
  }

  function addprop() {
    let data = {
      title: input.title,
      short_description: input.short_description,
      country_id: input.country,
      state_id: input.state,
      city_id: input.city,
      address: input.property_location,
      pincode: parseInt(input.pincode),
      latitude: parseInt(input.latitude),
      longitude: parseInt(input.longitude),
      bedroom: parseInt(input.bedrooms),
      bathroom: parseInt(input.bathrooms),
      floor: parseInt(input.floor),
      sq_ft: parseInt(input.area),
      youtube: input.video_url,
      // Aminities: input.amenities,
      // category: input.category1,
      // feature: input.feature1,
      walkthrough_url: input.walkthrough_url,
      created_by: parseInt(id),
    };
    let d = new FormData();
    Object.keys(data).forEach(x => {
      d.append(x, data[x]);
    });

    if (images.length) {
      images.forEach(x => {
        console.log(x);

        d.append('images[]', x);
      });
    }

    AddProperty(d).then(res => {
      console.log(res);

      if (res.status) {
        console.log('12', res);
        Alert.alert(`${res.message}`);
      } else {
        Alert.alert(`${Object.values(res.errors)[0][0]}`);
      }
    });
  }
  return loading ? (
    <View>
      <Loader />
    </View>
  ) : (
    <>
      <ScrollView
        style={{
          backgroundColor: '#ffffff',
          marginHorizontal: 10,
          marginTop: 10,
          elevation: 2,
          padding: 10,
        }}
        nestedScrollEnabled={true}>
        <View>
          <View
            style={{
              marginTop: 10,
            }}>
            <View>
              <Text style={styles.text}>Title</Text>
              <TextInput
                keyboardType="ascii-capable"
                onChangeText={i => setinput({...input, title: i})}
                placeholder="Title"
                style={styles.TextInput}
                // value={route.params?.data.title}
              />

              <Text style={styles.text}>Short description</Text>
              <TextInput
                keyboardType="ascii-capable"
                multiline={true}
                OfLines={5}
                onChangeText={i => setinput({...input, short_description: i})}
                // placeholder="Short description"
                style={[styles.TextInput, {height: 120}]}
              />
              <Text style={styles.text}>Add Image</Text>
              <View style={[styles.image, {flexDirection: 'row'}]}>
                <Image
                  resizeMode="cover"
                  source={{uri: 'No Image'}}
                  style={{
                    width: 300,
                    height: 200,
                    display: images.length ? 'none' : 'flex',
                  }}
                />
                {/* <Icon
                  name="close"
                  size={40}
                  style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 230,
                    top: 100,
                  }}
                /> */}
                <View style={styles.image}>
                  <FlatList
                    // pagingEnabled={true}
                    horizontal={true}
                    data={images}
                    renderItem={myimageHandler}
                  />
                </View>
                {/* {images.map(x => {
                  return (
                    <>
                      <View>
                        <Image
                          resizeMode="cover"
                          source={{uri: x.uri}}
                          style={{
                            flexDirection: 'row',
                            width: 200,
                            height: 200,
                          }}
                        />
                        {/* <Pressable onPress={deleteimgHandler}> */}
                {/* <Icon
                          onPress={deleteimgHandler}
                          name="close"
                          size={40}
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 160,
                          }}
                        />
                        {/* </Pressable> */}
                {/* </View> */}
                {/* </> */}
                {/* ); */}
                {/* })} */}
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button onPress={launchCam} title="Camera" color="#ffe65c" />
                <Button
                  onPress={launchgallery}
                  title="Gallery"
                  color="#ffe65c"
                />
              </View>
              <Text style={styles.text}>Country</Text>
              {/* <SelectList
                onSelect={i => setinput({...input, country: select})}
                search={true}
                setSelected={val => setSelected(val)}
                data={Object.values(country).map(i => i.name)}
                save="value"
              /> */}
              <SelectDropdown
                searchPlaceHolder="country"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="Country"
                data={country}
                onSelect={selectedItem => {
                  setinput({...input, country: selectedItem.name});
                  console.log(selectedItem.name);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
              />
              <Text style={styles.text}>State</Text>
              {/* <SelectList
                onSelect={i => setinput({...input, state: select})}
                search={true}
                setSelected={val => setSelected(val)}
                data={Object.values(state).map(i => i.name)}
                save="value"
              /> */}
              <SelectDropdown
                searchPlaceHolder="State"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="State"
                data={state}
                onSelect={selectedItem => {
                  setinput({...input, state: selectedItem.name});
                  setCid(selectedItem.id);
                  console.log(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={item => {
                  return item.name;
                }}
              />
              <Text style={styles.text}>City</Text>
              {/* <SelectList
                onSelect={i => setinput({...input, city: select})}
                search={true}
                setSelected={val => setSelected(val)}
                data={Object.values(state).map(i => i.name)}
                save="value"
              /> */}
              <SelectDropdown
                // onChangeSearchInputText={citysearch}
                searchPlaceHolder="City"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="City"
                data={city}
                onSelect={selectedItem => {
                  setinput({...input, city: selectedItem.name});
                  console.log(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return index, item.name;
                }}
              />
              {/* <MultipleSelectList
                onSelect={() => alert(select)}
                data={Object.values(aminity).map(i => i.name)}
                save="value"
                setSelected={val => setSelected(val)}
              /> */}
              <Text style={styles.text}>Categories</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, category1: select});
                }}
                data={Object.values(category).map(i => i.name)}
                save="value"
                setSelected={val => setSelected(val)}
              />
              <Text style={styles.text}>Amenities</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, amenities: select1});
                }}
                data={Object.values(aminity).map(i => i.name)}
                save="value"
                setSelected={val => setSelected1(val)}
              />
              <Text style={styles.text}>Feature</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, feature1: select2});
                }}
                data={Object.values(feature).map(i => i.name)}
                save="value"
                setSelected={val => setSelected2(val)}
              />
              <Text style={styles.text}>Property Location</Text>
              <TextInput
                onChangeText={i => setinput({...input, property_location: i})}
                placeholder="Property Location"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Pincode</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, pincode: i})}
                style={styles.TextInput}
                placeholder="Pincode"></TextInput>
              <Text style={styles.text}>Latitude</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, latitude: i})}
                placeholder="Latitude"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Longitude</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, longitude: i})}
                placeholder="Longitude"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Bedrooms</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, bedrooms: i})}
                placeholder="Bedrooms"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Bathrooms</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, bathrooms: i})}
                placeholder="Bathrooms"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Floors</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, floor: i})}
                placeholder="Floors"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Area</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={i => setinput({...input, area: i})}
                placeholder="Sq_ft"
                style={styles.TextInput}
              />

              {/* <DropDownPicker multiple={true} min={0} max={5} /> */}
              <Text style={styles.text}>Video url</Text>
              <TextInput
                onChangeText={i => setinput({...input, video_url: i})}
                placeholder="Url"
                style={styles.TextInput}
              />

              <Text style={styles.text}>360 Walkthrough url</Text>
              <TextInput
                onChangeText={i => setinput({...input, walkthrough_url: i})}
                placeholder="Walkthrough"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Status</Text>
              <TextInput
                onChangeText={i => setinput({...input, status: i})}
                placeholder="Status"
                style={styles.TextInput}
              />

              <View
                style={{
                  margin: 10,
                  padding: 20,
                }}>
                <Button onPress={addprop} title="AddProperty" color="#ffe65c" />
              </View>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'flex-end',
          }}>
          <Pressable>
            <Button onPress={add} title="add property"></Button>
          </Pressable>
        </View> */}
      </ScrollView>
    </>
  );
}
export default Nearby;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
  },
  TextInput: {
    backgroundColor: '#f8f8f8',
    height: 50,
    elevation: 3,
    padding: 10,
    fontSize: 14,
    marginTop: 5,
    // borderRadius: 10,
    margin: 5,
    // borderWidth: 0.001,
  },
  image: {
    margin: 5,
    justifyContent: 'center',
    // height: 200,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 10,
    backgroundColor: '#f1f0f0',
  },
  button: {flexDirection: 'row', justifyContent: 'space-evenly'},
  text: {
    color: '#000000',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
});

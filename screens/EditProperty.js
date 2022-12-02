import {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  TextInput,
  Image,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Aminities,
  Categories,
  CityList,
  CountryList,
  Features,
  StateList,
} from '../utility/database';
import {UpdateProperty} from '../utility/database';
import SelectDropdown from 'react-native-select-dropdown';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CameraPermission} from '../utility/location';
import {Loader} from '../utility/loader';
import Icon from 'react-native-vector-icons/Ionicons';
function Edit({navigation, route}) {
  console.log(route.params);
  const myimg = JSON.parse(route.params.data.images);

  const [id, setid] = useState('');
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [feature, setfeature] = useState([]);
  const [aminity, setaminity] = useState([]);
  const [category, setcategory] = useState([]);
  const [select, setSelected] = useState([]);
  const [select1, setSelected1] = useState([]);
  const [select2, setSelected2] = useState([]);
  const [images, setImages] = useState([]);
  const [sendimg, setsendimg] = useState([]);
  const [loading, setloading] = useState(false);
  // console.log(category);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // console.log('id', images);
  const [input, setinput] = useState({
    title: route.params.data.title,
    short_description: route.params.data.short_description,
    country: route.params.data.country,
    state: route.params.data.state,
    city: route.params.data.city,
    property_location: route.params.data.address,
    pincode: route.params.data.pincode
      ? route.params.data.pincode.toString()
      : route.params.data.pincode,
    latitude: route.params.data.latitude,
    longitude: route.params.data.longitude,
    bedrooms: route.params.data.bedroom
      ? route.params.data.bedroom.toString()
      : route.params.data.bedroom,
    bathrooms: route.params.data.bathroom
      ? route.params.data.bathroom.toString()
      : route.params.data.bathroom,
    floor: route.params.data.floor
      ? route.params.data.floor.toString()
      : route.params.data.floor,
    area: route.params.data.sq_ft
      ? route.params.data.sq_ft.toString()
      : route.params.data.sq_ft,
    amenities: route.params.data.aminity,
    video_url: route.params.data.title,
    walkthrough_url: route.params.data.walkthrough_url,
    status: route.params.data.status,
    category1: route.params.data.category,
    feature1: route.params.data.is_featured,
    created_by: route.params.data.users.id,
  });
  // console.log(input);
  function launchCam() {
    CameraPermission();
    launchCamera().then(res => {
      console.log(res.assets[0]['fileName']);
      res.assets[0].name = res.assets[0].fileName;

      setImages([...images, res.assets[0].uri]);
      setsendimg([res.assets[0]]);
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
  function update() {
    let data = {
      title: input.title,
      // short_description: input.short_description,
      country_id: input.country,
      state_id: input.state,
      city_id: input.city,
      address: input.property_location,
      pincode: parseInt(input.pincode),
      bedroom: parseInt(input.bedrooms),
      bathroom: parseInt(input.bathrooms),
      floor: parseInt(input.floor),
      sq_ft: parseInt(input.area),
      youtube: input.video_url,
      walkthrough_url: input.walkthrough_url,
      created_by: parseInt(input.created_by),
    };
    // console.log('11', data);

    let d = new FormData();
    Object.keys(data).forEach(x => {
      d.append(x, data[x]);
    });

    if (sendimg.length) {
      sendimg.forEach(x => {
        console.log('d', x);

        d.append('images[]', x);
      });
    }

    UpdateProperty(route.params.data.id, d).then(res => {
      console.log(res);
      // console.log(Object.values(res.errors)[0][0]);
      if (res.status) {
        Alert.alert(`${res.message}`);
      } else {
        Alert.alert(`${Object.values(res.errors)[0][0]}`);
      }
    });
  }

  useEffect(() => {
    setImages(myimg);
    CountryList().then(res => {
      setloading(true);
      if (res?.status) {
        setcountry(res.data);
      }
      setloading(false);
    });
    StateList().then(res => {
      setloading(true);
      if (res?.status) {
        setstate(res.data);
      }
      setloading(false);
    });
    CityList().then(res => {
      setloading(true);
      if (res?.status) {
        // console.log(a);
        setcity(res.data);
      }
      setloading(false);
    });
    Aminities().then(res => {
      setloading(true);
      if (res?.status) {
        setaminity(res.data);
      }
      setloading(false);
    });
    Features().then(res => {
      setloading(true);
      if (res?.status) {
        setfeature(res.data);
      }
      setloading(false);
    });
    Categories().then(res => {
      setloading(true);
      console.log(res);
      if (res?.status) {
        setcategory(res.data);
      }
      setloading(false);
    });

    AsyncStorage.getItem('user').then(res => res);
  }, []);

  function myimageHandler({item}) {
    const base_url = route.params.data.base_url;
    // console.log(base_url);
    console.log('34', item);
    function deleteimgHandler() {
      const a = images.find(i => i.fileName === item.fileName);
      console.log(!!a);
      if (!!a) {
        images.pop(a);
      } else {
        setImages([]);
      }
    }

    return (
      <View style={{overflow: 'hidden'}}>
        <Image
          resizeMode="cover"
          source={{uri: item.includes('properties') ? base_url + item : item}}
          style={{
            borderRadius: 10,
            borderWidth: 0.1,
            borderColor: '#ffffff',
            width: 307,
            height: 200,
            display: images.length ? 'flex' : 'none',
          }}
        />
        <Icon
          onPress={deleteimgHandler}
          name="close-outline"
          size={30}
          style={{
            position: 'absolute',

            left: 260,
          }}
          color="yellow"
        />
      </View>
    );
  }
  return loading ? (
    <View>
      <Loader />
    </View>
  ) : (
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
                onChangeText={i => setinput({...input, title: i})}
                placeholder="Title"
                style={styles.TextInput}
                value={input.title}
              />

              <Text style={styles.text}>Short description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                onChangeText={i => setinput({...input, short_description: i})}
                // placeholder="Short description"
                style={[styles.TextInput, {height: 120}]}
                value={input.short_description}
              />
              <Text style={styles.text}>Add Image</Text>
              <View style={styles.image}>
                <FlatList
                  pagingEnabled={true}
                  horizontal={true}
                  data={images}
                  renderItem={myimageHandler}
                />
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
              <SelectDropdown
                searchPlaceHolder="country"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText={`${input.country}`}
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
              <SelectDropdown
                searchPlaceHolder="State"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText={`${input.state}`}
                data={state}
                onSelect={selectedItem => {
                  setinput({...input, state: selectedItem.name});
                  setid(selectedItem.id);
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

              <SelectDropdown
                searchPlaceHolder="City"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText={`${input.city}`}
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
              <Text style={styles.text}>Categories</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, category1: select});
                }}
                data={category.map(i => i.name)}
                save="value"
                setSelected={val => setSelected(val)}
              />
              {/* <SelectDropdown
                searchPlaceHolder="Categories"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="Categories"
                data={category}
                onSelect={selectedItem => {
                  setinput({...input, category1: selectedItem.name});
                  console.log(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={item => {
                  return item.name;
                }}
              /> */}
              <Text style={styles.text}>Amenities</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, amenities: select1});
                }}
                data={aminity.map(i => i.name)}
                save="value"
                setSelected={val => setSelected1(val)}
              />

              {/* <SelectDropdown
                searchPlaceHolder="Amenities"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="Amenities"
                data={aminity}
                onSelect={selectedItem => {
                  setinput({...input, amenities: selectedItem.name});
                  console.log(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={item => {
                  return item.name;
                }}
              /> */}
              <Text style={styles.text}>Feature</Text>
              <MultipleSelectList
                onSelect={() => {
                  setinput({...input, feature1: select2});
                }}
                data={feature.map(i => i.name)}
                save="value"
                setSelected={val => setSelected2(val)}
              />
              {/* <SelectDropdown
                // defaultValue={}
                searchPlaceHolder="Feature"
                search={true}
                buttonStyle={{width: 315, height: 50}}
                defaultButtonText="Feature"
                data={feature}
                onSelect={selectedItem => {
                  setinput({...input, feature1: selectedItem.name});
                  console.log(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={item => {
                  return item.name;
                }}
              /> */}

              <Text style={styles.text}>Property Location</Text>
              <TextInput
                onChangeText={i => setinput({...input, property_location: i})}
                placeholder="Property Location"
                style={styles.TextInput}
                value={input.property_location}
              />

              <Text style={styles.text}>Pincode</Text>
              <TextInput
                onChangeText={i => setinput({...input, pincode: i})}
                style={styles.TextInput}
                value={input.pincode}
                placeholder="Pincode"></TextInput>
              <Text style={styles.text}>Latitude</Text>
              <TextInput
                value={input.latitude}
                onChangeText={i => setinput({...input, latitude: i})}
                placeholder="Latitude"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Longitude</Text>
              <TextInput
                value={input.longitude}
                onChangeText={i => setinput({...input, longitude: i})}
                placeholder="Longitude"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Bedrooms</Text>
              <TextInput
                value={input.bedrooms}
                onChangeText={i => setinput({...input, bedrooms: i})}
                placeholder="Bedrooms"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Bathrooms</Text>
              <TextInput
                dataDetectorTypes={'all'}
                value={input.bathrooms}
                onChangeText={i => setinput({...input, bathrooms: i})}
                placeholder="Bathrooms"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Floors</Text>
              <TextInput
                value={input.floor}
                onChangeText={i => setinput({...input, floor: i})}
                placeholder="Floors"
                style={styles.TextInput}
              />
              <Text style={styles.text}>Area</Text>
              <TextInput
                value={input.area}
                onChangeText={i => setinput({...input, area: i})}
                placeholder="Sq_ft"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Video url</Text>
              <TextInput
                value={input.title}
                onChangeText={i => setinput({...input, video_url: i})}
                placeholder="Url"
                style={styles.TextInput}
              />

              <Text style={styles.text}>360 Walkthrough url</Text>
              <TextInput
                value={input.walkthrough_url}
                onChangeText={i => setinput({...input, walkthrough_url: i})}
                placeholder="Walkthrough"
                style={styles.TextInput}
              />

              <Text style={styles.text}>Status</Text>
              <TextInput
                value={input.status}
                onChangeText={i => setinput({...input, status: i})}
                placeholder="Status"
                style={styles.TextInput}
              />

              <View
                style={{
                  margin: 10,
                  padding: 20,
                }}>
                <Button
                  onPress={update}
                  title="UpdateProperty"
                  color="#ffe65c"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Edit;

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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 4,
    marginBottom: 10,
    backgroundColor: '#cccccc',
  },
  button: {flexDirection: 'row', justifyContent: 'space-evenly'},
  text: {
    color: '#000000',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
});

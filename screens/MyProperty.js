import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, Image, StyleSheet, Text, View} from 'react-native';
import Picked from '../Component/pickedproperty';
import {MyProperties} from '../utility/database';
import {Loader} from '../utility/loader';

function MyProperty({navigation}) {
  const [favorite, setfavorite] = useState([]);
  const [user_id, setuser_id] = useState('');
  const [loading, setloading] = useState(false);
  // console.log(favorite[0]);
  // console.log(user_id);

  // const [load, setload] = useState(false);
  function mypro() {
    MyProperties(user_id).then(respo => {
      if (respo.status) {
        setloading(true);
        setfavorite(respo.data);
      }
    });
  }
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      // console.log(res);
      setuser_id(res);
      // setload(true);
    });
  }, []);
  if (user_id) {
    mypro();
  }
  function favoriteItem(data) {
    // console.log(data);

    const image1 = data.item.base_url + data.item.images;
    // console.log(!!image1.match('null'));
    const noimage =
      'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

    return (
      <View>
        <Picked
          title={data.item.title}
          address={data.item.address}
          uri={!!image1.match('null') ? noimage : image1}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              // console.log('11', data);

              navigation.navigate('Edit', {
                data: data.item,
                // property_id: data.item.property_id,
              });
            }}
            style={{
              position: 'absolute',
              bottom: 40,
              left: 200,
              borderColor: '#fce517',
              backgroundColor: '#fce517',
              elevation: 4,
              borderRadius: 5,
              padding: 5,
              borderWidth: 0.5,
              color: '#fce517',
            }}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            style={{
              position: 'absolute',
              bottom: 40,
              left: 270,
              borderColor: '#fce517',
              backgroundColor: '#fce517',
              elevation: 4,
              borderRadius: 5,
              padding: 5,
              borderWidth: 0.5,
              color: '#fce517',
            }}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return loading == false ? (
    <Loader />
  ) : (
    <>
      <View style={styles.item}>
        <FlatList
          data={favorite}
          keyExtractor={item => item.id}
          renderItem={favoriteItem}
        />
      </View>
    </>
  );
}
export default MyProperty;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    // marginBottom: 60,
  },
});

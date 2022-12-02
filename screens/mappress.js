import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Picked from '../Component/pickedproperty';
import {WishList} from '../utility/database';
import {Loader} from '../utility/loader';

function MapPress() {
  const [favorite, setfavorite] = useState([]);

  const [load, setload] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      WishList(res).then(respo => {
        if (respo.status) {
          setload(true);
          // console.log(res.data.status);
          setfavorite(respo.data);
        }
      });
    });
  }, []);

  function favoriteItem(data) {
    const itemdata = data.item.properties[0];
    const image = Object.values(JSON.parse(itemdata.images))[0];
    const baseurl = itemdata.base_url;
    // console.log(baseurl);

    return (
      <Picked
        title={itemdata.title}
        address={itemdata.address}
        uri={baseurl + image}
      />
    );
  }

  return load == false ? (
    <Loader />
  ) : (
    <View style={styles.item}>
      <FlatList
        data={favorite}
        keyExtractor={item => item.id}
        renderItem={favoriteItem}
      />
    </View>
  );
}
export default MapPress;

const styles = StyleSheet.create({
  item: {
    width: '100%',
  },
});

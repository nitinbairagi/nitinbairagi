import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

function Profile() {
  const [userdata, setuserdata] = useState('');
  // console.log(userdata?.created_at);
  console.log(new Date('2022-10-17T11:22:19.000000Z').toLocaleDateString());

  useEffect(() => {
    AsyncStorage.getItem('userdata').then(res => {
      //   console.log(JSON.parse(res).name);
      setuserdata(JSON.parse(res));
    });
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={
              userdata?.image
                ? {uri: userdata.image}
                : require('../testimage/test6.png')
            }></Image>
          <Text style={styles.name}>{userdata?.name}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.userdetail}>Email:{userdata?.email}</Text>
          <Text style={styles.userdetail}>Contact: {userdata?.mobile}</Text>
          <Text style={styles.userdetail}>Address: {userdata?.address}</Text>
          <Text style={styles.userdetail}>
            Created: {new Date(userdata?.created_at).toLocaleDateString()}
          </Text>
          <Text style={styles.userdetail}>
            Description: {userdata?.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'flex-end',
        }}>
        <Pressable style={{width: 250}} android_ripple={{color: 'white'}}>
          <View
            style={{
              elevation: 5,
              borderColor: '#ffe65c',
              backgroundColor: '#ffe65c',
              borderRadius: 5,
              padding: 10,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#567b9c'}}>
              Update
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    elevation: 5,
    borderColor: '#000000',
    borderWidth: 0.2,
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  userdetail: {
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#cfccca',
    borderColor: '#ccccca',
    padding: 8,
    color: '#000000',
    borderWidth: 0.2,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    textAlign: 'left',
    fontSize: 16,
  },
  name: {
    borderBottomWidth: 1,
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
  },
});

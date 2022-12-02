import React from 'react';
import {Image, Text, Pressable, View, Alert} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './screens/dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Place from './screens/place';
import PlaceDetail from './screens/placedetail';
import Nearby from './screens/nearby';
import Register from './screens/Register';
import Splash from './screens/splash';
import Login from './screens/Login';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AuthContextProvider from './Component/Authcontext';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import MapPress from './screens/mappress';
import {Loader} from './utility/loader';
import Edit from './screens/EditProperty';
import MyProperty from './screens/MyProperty';
import Profile from './screens/profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isuser, setisuser] = useState('');
  // console.log(isLoggedin);
  useEffect(() => {
    setisLoggedin(true);
    async function getuser() {
      const user = await AsyncStorage.getItem('password');
      // console.log(user);
      setisuser(user);
      setisLoggedin(false);
    }
    getuser();
  }, []);

  if (isLoggedin) {
    return <Splash />;
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isuser ? 'logged' : 'logout'}
          screenOptions={{headerShown: false}}>
          <>
            <Stack.Screen name="logged" component={Authsidedrawer} />
            <Stack.Screen name="logout" component={SideDrawer} />
            <Stack.Screen name="Detail" component={PlaceDetail} />
            <Stack.Screen name="Edit" component={Edit} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};
function CustomDrawer({navigation}) {
  function Logout() {
    // console.log(navigation);
    AsyncStorage.removeItem('password');
    Alert.alert('Logout sucessfull');
    navigation.navigate('logout', {screen: 'Login'});
  }

  return (
    <>
      <View style={{flex: 1}}>
        <View>
          <Pressable
            android_ripple={{color: '#567b9c'}}
            onPress={() => navigation.navigate('HOME')}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              style={{alignSelf: 'flex-start'}}
              // style={{marginRight: 20, marginLeft: -20}}
              name="home"
              color="#567b9c"
              size={25}
            />
            <Text
              style={{
                color: '#567b9c',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 20,
              }}>
              Home
            </Text>
          </Pressable>
        </View>
        {/* <View>
          <Pressable
            android_ripple={{color: '#071b2b'}}
            onPress={() => navigation.navigate('logged', {screen: 'Property'})}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              name="home"
              color="#567b9c"
              size={25}
              style={{alignSelf: 'flex-start'}}
              // style={{marginRight: 20, marginLeft: -20}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#567b9c',
                fontSize: 18,
                marginLeft: 20,
              }}>
              Dashboard
            </Text>
          </Pressable>
        </View> */}
        <View>
          <Pressable
            android_ripple={{color: '#071b2b'}}
            onPress={() => navigation.navigate('Property')}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              name="business"
              color="#567b9c"
              size={25}
              style={{alignSelf: 'flex-start'}}
              // style={{marginRight: 20, marginLeft: -20}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#567b9c',
                fontSize: 18,
                marginLeft: 20,
              }}>
              My Properties
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            android_ripple={{color: '#071b2b'}}
            onPress={() => navigation.navigate('WishList')}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              name="bookmark"
              color="#567b9c"
              size={25}
              style={{alignSelf: 'flex-start'}}
              // style={{marginRight: 20, marginLeft: -20}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#567b9c',
                fontSize: 18,
                marginLeft: 20,
              }}>
              WishList
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            android_ripple={{color: '#071b2b'}}
            onPress={() => navigation.navigate('Profile')}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              name="person-circle"
              color="#567b9c"
              size={30}
              style={{alignSelf: 'flex-start'}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#567b9c',
                marginLeft: 20,
              }}>
              Profile
            </Text>
          </Pressable>
        </View>
        {/* <View>
          <Pressable
            android_ripple={{color: '#071b2b'}}
            onPress={() => navigation.navigate('Property')}
            style={{
              padding: 15,
              margin: 5,
              flexDirection: 'row',
            }}>
            <IonIcon
              name="home"
              color="#567b9c"
              size={25}
              style={{alignSelf: 'flex-start'}}
              // style={{marginRight: 20, marginLeft: -20}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#567b9c',
                marginLeft: 20,
              }}>
              Setting
            </Text>
          </Pressable>
        </View> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Pressable
            style={{
              color: 'white',
              elevation: 5,
              backgroundColor: '#567b9c',
              borderColor: '#567b9c',
              alignItems: 'center',
              textAlign: 'center',
              width: 100,
              borderRadius: 20,
              borderWidth: 1,
              padding: 5,
              fontSize: 20,
            }}
            onPress={Logout}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              LogOut
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

function Authsidedrawer({navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawer navigation={navigation} />}
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#2a5579',
        },
        drawerStyle: {
          backgroundColor: '#ffe65c',
          width: 250,
        },
        drawerActiveTintColor: '#2a5579',
        drawerContentContainerStyle: {justifyContent: 'flex-end'},
      }}>
      <Drawer.Screen
        name="OmsLocation"
        component={Bottomtab}
        options={{
          drawerIcon: () => (
            <IonIcon style={{flex: 1}} name="home" color="#2a5579" size={30} />
          ),
          headerStyle: {
            backgroundColor: '#ffe65c',
          },
          headerTintColor: '#000000',
        }}
      />
      <Drawer.Screen
        name="WishList"
        component={MapPress}
        options={{
          drawerIcon: () => (
            <IonIcon style={{flex: 1}} name="home" color="#2a5579" size={30} />
          ),
          headerStyle: {
            backgroundColor: '#ffe65c',
          },
          headerTintColor: '#000000',
        }}
      />
      <Drawer.Screen
        name="Property"
        component={MyProperty}
        options={{
          drawerIcon: () => (
            <IonIcon style={{flex: 1}} name="home" color="#2a5579" size={30} />
          ),
          headerStyle: {
            backgroundColor: '#ffe65c',
          },
          headerTintColor: '#000000',
        }}
      />

      {/* <Drawer.Screen name="logout" component={Splash} /> */}
    </Drawer.Navigator>
  );
}

function SideDrawer() {
  return (
    <AuthContextProvider>
      <Drawer.Navigator
        screenOptions={{
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2a5579',
          },
          drawerStyle: {
            backgroundColor: '#ffe65c',
            width: 250,
          },
          drawerActiveTintColor: '#2a5579',
        }}>
        <Drawer.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {backgroundColor: '#fce517'},
            drawerIcon: () => (
              <IonIcon name="log-out" color="#2a5579" size={30} />
            ),
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {backgroundColor: '#fce517'},
            drawerIcon: () => (
              <IonIcon name="log-in" color="#2a5579" size={30} />
            ),
          }}
        />
      </Drawer.Navigator>
    </AuthContextProvider>
  );
}

function Bottomtab() {
  return (
    <AuthContextProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#ffe65c'},
        }}>
        <Tab.Screen
          name="HOME"
          component={Dashboard}
          options={{
            tabBarIcon: () => <IonIcon name="home" color="#567b9c" size={25} />,
            tabBarLabelStyle: {
              color: '#567b9c',
              fontSize: 14,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 7,
              marginTop: -8,
            },
            tabBarItemStyle: {backgroundColor: '#ffe65c', borderRadius: 50},
          }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => <IonIcon name="list" color="#567b9c" size={25} />,
            tabBarLabelStyle: {
              color: '#567b9c',
              fontSize: 14,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 7,
              marginTop: -8,
              fontWeight: 'bold',
            },
            tabBarItemStyle: {backgroundColor: '#ffe65c', borderRadius: 50},
          }}
          name="Location"
          component={Place}
        />
        {/* <Tab.Screen
          options={{
            tabBarIcon: () => (
              <IonIcon name="business" color="#2a5579" size={25} />
            ),

            tabBarLabelStyle: {
              color: '#2a5579',
              fontSize: 14,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 7,
              marginTop: -8,
            },
            tabBarItemStyle: {backgroundColor: '#f3e594', borderRadius: 50},
          }}
          name="WishList"
          component={MapPress}
        /> */}
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <IonIcon name="person" color="#567b9c" size={25} />
            ),
            tabBarLabelStyle: {
              color: '#567b9c',
              fontSize: 14,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 7,
              marginTop: -8,
            },
            tabBarItemStyle: {backgroundColor: '#ffe65c', borderRadius: 50},
          }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{
            // headerShown: true,
            tabBarIcon: () => (
              <IonIcon name="add-circle" color="#567b9c" size={25} />
            ),
            tabBarLabelStyle: {
              color: '#567b9c',
              fontSize: 14,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 7,
              marginTop: -8,
            },
            tabBarItemStyle: {backgroundColor: '#ffe65c', borderRadius: 50},
          }}
          name="Add-Property"
          component={Nearby}
        />
      </Tab.Navigator>
    </AuthContextProvider>
  );
}

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default App;

// function check(str) {
//   const leng = str.length;
//   for (let i = 0; i < leng / 2; i++) {
//     if (str[i] !== str[leng - 1 - i]) {
//       return 'its not palindrom';
//     }
//   }
//   return 'its palindrom';
// }

// const value = check('vipiv');
// console.log('1', value);

// const check1 = string => {
//   const length = string.length;
//   for (let i = 0; i < length / 2; i++) {
//     if (string[i] !== string[length - 1 - i]) return 'its not palindrom';
//   }
//   return 'its palindrom';
// };

// const value2 = check1('vipi');
// console.log('2', value2);

// const reverse = string => {
//   let newstr = '';
//   for (let i = string.length; i >= 0; i--) {
//     newstr += string[i];
//   }
//   return newstr;
// };

// const value = reverse('midhani war nike ');
// console.log('2', value);
// const reverse = string => {
//   return string.split('').reverse('').join('');
// };

// const value = reverse('midhani war nike ');
// console.log('2', value);

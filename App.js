import React from 'react';
import {Image, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './screens/dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Place from './screens/place';
import PlaceDetail from './screens/placedetail';
import Nearby from './screens/nearby';
import Register from './screens/Register';
import Login from './screens/Login';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={SideDrawer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function SideDrawer() {
  return (
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
        name="OmsLocation"
        component={Bottomtab}
        options={{
          header: () => (
            <View
              style={{
                backgroundColor: '#ffe65c',
                elevation: 5,
              }}>
              <Image
                style={{
                  height: 55,
                  alignSelf: 'center',
                }}
                resizeMode="center"
                source={require('./testimage/logoms.png')}
                s
              />
            </View>
          ),
          drawerIcon: () => <IonIcon name="home" color="#2a5579" size={30} />,
          headerStyle: {
            backgroundColor: '#ffe65c',
          },
          headerTintColor: '#000000',
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerIcon: () => (
            <IonIcon name="log-out" color="#2a5579" size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: () => <IonIcon name="log-in" color="#2a5579" size={30} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function Bottomtab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#ffe65c'},
      }}>
      <Tab.Screen
        name="HOME"
        component={Dashboard}
        options={{
          tabBarIcon: () => <IonIcon name="home" color="#2a5579" size={30} />,

          tabBarLabelStyle: {
            color: '#2a5579',
            fontSize: 13,
            fontWeight: 'bold',
          },
          tabBarItemStyle: {backgroundColor: '#ffe65c', borderRadius: 50},
        }}
      />
      <Tab.Screen name="place" component={Place} />
      <Tab.Screen name="placedetail" component={PlaceDetail} />
      <Tab.Screen name="nearby" component={Nearby} />
    </Tab.Navigator>
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

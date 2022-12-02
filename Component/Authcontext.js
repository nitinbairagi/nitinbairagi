import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useState} from 'react';

export const AuthContext = React.createContext({
  mobile: '',
  password: '',
  isAuthenticated: false,
  authenticate: (mobile, password) => {},
});

function AuthContextProvider({children}) {
  const [authtoken, setauthtoken] = useState({
    mobile: '',
    password: '',
  });

  // console.log(authtoken);

  async function authenticate(mobile, password) {
    await AsyncStorage.setItem(
      'password',
      JSON.stringify({
        mobile: mobile,
        password: password,
      }),
    );
    setauthtoken({mobile: mobile, password: password});
  }

  const value = {
    mobile: authtoken,
    password: authtoken,
    isAuthenticated: !!authtoken,
    authenticate: authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

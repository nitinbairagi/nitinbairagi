import {useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {checkLogin} from '../utility/database';
import {Loader} from '../utility/loader';
import {useContext} from 'react';
import {AuthContext} from '../Component/Authcontext';
import {Authsidedrawer} from '../App';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

function Login({navigation}) {
  const [mobile, setMobile] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  // console.log(mobile.value, password.value);

  const authctx = useContext(AuthContext);
  // console.log(authctx);

  let loader;
  if (loading === true) {
    loader = <Loader />;
  }
  const onLogin = async () => {
    setLoading(true);

    // console.log(loading);

    if (!mobile.value) {
      setMobile({value: '', error: 'Mobile number is required'});
      setLoading(false);
      return;
    }
    if (!password.value) {
      setPassword({value: '', error: 'password is required'});
      setLoading(false);
      return;
    }

    const check = await checkLogin({
      mobile: mobile.value,
      password: password.value,
    });

    console.log(check.data);

    if (check.status) {
      // popup success
      Alert.alert(`${check.message}`);
      // set async storage

      AsyncStorage.setItem('userdata', JSON.stringify(check.data));
      AsyncStorage.setItem('user', JSON.stringify(check.data.id));
      authctx.authenticate(mobile.value, password.value);
      setLoading(false);
      // navigate dashboard page
      navigation.navigate('logged');
    } else {
      if (typeof check.errorField !== 'undefined') {
        if (check.errorField) {
          Object.keys(check.errorField).map(x => {
            if (x == 'password') {
              setPassword({
                value: password.value,
                error: check.errorField[x].join(','),
              });
            } else if (x == 'mobile') {
              setMobile({
                value: mobile.value,
                error: check.errorField[x].join(','),
              });
            }
          });
        }
        // console.log(check.message);
        setLoading(false);
      }
      setLoading(false);

      //show popup
      Alert.alert(`${check.message}`);
    }
  };

  return (
    <>
      <LinearGradient colors={['#fce517', '#cccccc']} style={{flex: 1}}>
        <View>{loader}</View>
        <View style={loading ? {display: 'none'} : styles.container}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#111111',
            }}>
            Welcome
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '400',
              color: '#111111',
              marginBottom: 80,
            }}>
            Sign in to your account
          </Text>

          <TextInput
            placeholder="Mobile"
            style={styles.textinput}
            label="Mobile"
            returnKeyType="next"
            value={mobile.value}
            onChangeText={text => setMobile({value: text, error: ''})}
            autoCapitalize="none"
            autoCompleteType="cc-number"
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={{display: mobile.error ? 'flex' : 'none'}}>
            {mobile.error}
          </Text>
          <TextInput
            placeholder="Password"
            style={styles.textinput}
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            // error={!!password.error}
            // errorText={password.error}
            secureTextEntry
          />
          <Text style={{display: password.error ? 'flex' : 'none'}}>
            {password.error}
          </Text>

          <View style={styles.forgotPassword}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginRight: 20,
              marginTop: 100,
              flexDirection: 'row',
            }}>
            <Pressable onPress={onLogin}>
              <View
                style={{
                  backgroundColor: '#fce517',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                  width: 300,
                  height: 50,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    bottom: 4,
                    alignItems: 'center',
                    marginRight: 5,
                    fontSize: 25,
                    fontWeight: '400',
                    color: '#111111',
                  }}>
                  Login
                </Text>
                {/* <Icon color={'black'} size={30} name={'arrow-forward'} /> */}
              </View>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Text>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    width: 340,
    height: 320,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textinput: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    elevation: 3,
    marginBottom: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.2,
    fontSize: 20,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginRight: 50,
  },
  row: {
    bottom: 10,
    marginVertical: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forgot: {
    fontWeight: '300',
    fontSize: 15,
    color: 'black',
  },
  link: {
    fontWeight: 'bold',
    color: '#fce517',
  },
});

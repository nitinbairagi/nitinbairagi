import {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {checkregister} from '../utility/database';
import {useValidation} from 'react-native-form-validator';
import {Loader} from '../utility/loader';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {androidbackbutton} from '../utility/Backbutton';

function Register({navigation}) {
  const [loading, setloading] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    mobile: '',
  });
  let loader;
  if (loading === true) {
    loader = <Loader />;
  }

  androidbackbutton();
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: state,
    });

  const _onPressButton = async () => {
    setloading(true);
    validate({
      name: {minlength: 3, maxlength: 7, required: true},
      email: {email: true, required: true},
      mobile: {
        mobile: true,
        minlength: 10,
        length: 10,
        maxlength: 10,
        required: true,
      },
      password: {required: true, minlength: 7},
      confirmpassword: {minlength: 7, required: true},
    });

    const checkuser = await checkregister({
      name: state.name,
      password: state.password,
      email: state.email,
      mobile: state.mobile,
      confirm_password: state.confirmpassword,
    });
    console.log(checkuser);

    if (checkuser.status) {
      //popup
      setloading(false);
      Alert.alert(`${checkuser.message}`);
      setState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        mobile: '',
      });
      navigation.navigate('Login');
    } else {
      if (typeof checkuser.errorField !== 'undefined') {
        Object.keys(checkuser.errorField).map(x => {
          Alert.alert(checkuser.errorField[x].join(','));
        });
      }
      Alert.alert(`${checkuser.message}`);
      setloading(false);
    }
  };

  return (
    <>
      <LinearGradient colors={['#fce517', '#cccccc']} style={{flex: 1}}>
        <ScrollView>
          <View>{loader}</View>
          <View style={loading ? {display: 'none'} : styles.container}>
            <Text
              style={{
                color: '#000000',
                fontSize: 30,
                marginBottom: 40,
                fontWeight: 'bold',
              }}>
              Create Account
            </Text>
            <View>
              <TextInput
                placeholder="Name"
                style={styles.textinput}
                value={state.name}
                onChangeText={e => setState({...state, name: e})}
              />
              {isFieldInError('name') &&
                getErrorsInField('name').map(err => (
                  <Text style={styles.error}>{err}</Text>
                ))}
              <TextInput
                placeholder="Mobile"
                style={styles.textinput}
                value={state.mobile}
                onChangeText={e => setState({...state, mobile: e})}
                keyboardType="numeric"
                maxLength={10}
              />
              {isFieldInError('mobile') &&
                getErrorsInField('mobile').map(err => (
                  <Text style={styles.error}>{err}</Text>
                ))}
              <TextInput
                style={styles.textinput}
                placeholder="Email address"
                value={state.email}
                onChangeText={e => setState({...state, email: e})}
                keyboardType="Email-address"
              />
              {isFieldInError('email') &&
                getErrorsInField('email').map(err => (
                  <Text style={styles.error}>{err}</Text>
                ))}
              <TextInput
                style={styles.textinput}
                value={state.password}
                placeholder="Password"
                onChangeText={e => setState({...state, password: e})}
                secureTextEntry={true}
              />
              {isFieldInError('password') &&
                getErrorsInField('password').map(err => (
                  <Text style={styles.error}>{err}</Text>
                ))}
              <TextInput
                style={styles.textinput}
                value={state.confirmpassword}
                placeholder="Confirm password"
                onChangeText={e => setState({...state, confirmpassword: e})}
                secureTextEntry={true}
              />
              {isFieldInError('confirmpassword') &&
                getErrorsInField('confirmpassword').map(err => (
                  <Text style={styles.error}>{err}</Text>
                ))}
            </View>
            {isFieldInError('confirmPassword') &&
              getErrorsInField('confirmPassword').map(errorMessage => (
                <Text style={styles.error}>{errorMessage}</Text>
              ))}
            <View style={styles.Button}>
              <Pressable onPress={_onPressButton}>
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
                      bottom: 1,
                      alignItems: 'center',
                      marginRight: 5,
                      fontSize: 25,
                      fontWeight: '400',
                      color: '#111111',
                    }}>
                    Create
                  </Text>
                  {/* <Icon color={'black'} size={30} name={'arrow-forward'} /> */}
                </View>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Text>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{color: '#fce517', fontSize: 16, fontWeight: 'bold'}}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
export default Register;

const styles = StyleSheet.create({
  container: {
    width: 340,
    alignSelf: 'center',
    marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textinput: {
    elevation: 3,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginTop: 5,
    width: 310,
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
  },

  Button: {
    marginTop: 80,
    width: 100,
    flexDirection: 'row',
    marginRight: 15,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 100,
  },
  error: {
    // width: '100%',
    color: 'red',
  },
});

import {View, Text, Button, StyleSheet} from 'react-native';

function Register() {
  return (
    <View>
      <Text>Register</Text>
      <Text>name</Text>
      <Text>lastname</Text>
      <Text>email</Text>
      <Text>mobile-no</Text>
      <Text>address</Text>
      <View style={styles.Button}>
        <Button title="Register" />
        <Button title="Sign-in" />
      </View>
    </View>
  );
}
export default Register;

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
  },
});

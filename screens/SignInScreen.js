import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useMutation } from "@apollo/client";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import Auth from "../graphql/utils/auth";
import { LOGIN_USER } from "../graphql/query/auth";
import { GET_CURRENT_USER } from "../graphql/query/user";
import { AuthContext } from "../components/context";
import Loader from "../components/Loader";

const auth = new Auth();

const {height, width} = Dimensions.get("screen");

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [isLogin, setIsLogin] = React.useState(false);
  const { authContext: { signIn: signInAction } } = React.useContext(AuthContext);

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const onCompleted = (data) => {
    const signInData = data.signIn || data.omniauthSignin;
    auth.loginUser({data: { signIn: signInData }});
  };

  const updateError = () => {
    setIsLogin(false);
    Alert.alert("Error", "Invalid Email or Password", [
      { text: 'Okay' }
    ]);
    // const message = error.message.replace('GraphQL error:', ' ').trim();
    // if (message.includes('confirm your email')) {
    //   onConfirmCallback(true);
    // }
  };

  const updateIdToken = (cache, {data: {signIn, omniauthSignin}}) => {
    signInAction((signIn || omniauthSignin).user);
    cache.writeQuery({
      query: GET_CURRENT_USER,
      data: { currentUser: (signIn || omniauthSignin).user },
    });
  };

  const [loginUser] = useMutation(LOGIN_USER, { onCompleted: onCompleted, onError: updateError, update: updateIdToken});

  const loginHandle = (email, password) => {
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setIsLogin(true);
    loginUser({variables: {email: email, password: password }});
  }

  return (
    <View style={styles.container}>
      {isLogin && <Loader/>}
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Come on in!</Text>
        <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/images/kitteh_bed/kitteh_bed.png')}
          style={styles.logo}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
            : null}
        </View>
        {data.isValidUser ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>email must be 4 characters long.</Text>
          </Animatable.View>
        }

        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 10
        }]}>Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
        }

        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { loginHandle(data.email, data.password) }}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const height_logo = height * 0.20;
const width_logo = width * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  logo: {
    width: width_logo,
    height: height_logo,
    padding: 0,
    margin: 0
  },
  footer: {
    flex: 2.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginTop: 10
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

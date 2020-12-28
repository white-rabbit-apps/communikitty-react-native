import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

import Home from "../components/Home";

const SplashScreen = ({navigation}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
        <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/images/title-logo/title-logo.png')}
          style={styles.logo}
          />
      </View>
      <Animatable.View 
        style={[styles.footer, {
            backgroundColor: colors.background
        }]}
        animation="fadeInUpBig"
      >
        <Home/>
        <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons 
                  name="navigate-next"
                  color="#fff"
                  size={20}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height, width} = Dimensions.get("screen");
const height_logo = height * 0.15;
const width_logo = width * 0.60;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 50
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30
  },
  logo: {
    width: width_logo,
    height: height_logo,
    padding: 0,
    margin: 0
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  button: {
    alignItems: 'flex-start',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});


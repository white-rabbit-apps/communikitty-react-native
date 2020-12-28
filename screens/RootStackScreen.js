import React from 'react';

import { Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDIcon from 'react-native-vector-icons/AntDesign';
import MeterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import KittehsScreen from './KittehsScreen';

const KittehsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="SplashScreen"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#009387' }}
    >
      <Tab.Screen
        name="Home"
        component={SplashScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Kittehs"
        component={KittehsStackScreen}
        options={{
          tabBarLabel: 'Kittehs',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <AntDIcon name="login" color={color} size={26}/>
          ),
        }}
      />
      <Tab.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          tabBarLabel: 'Register',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <MeterialIcon name="app-registration" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const KittehsStackScreen = ({ navigation }) => (
  <KittehsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <KittehsStack.Screen name="Kittehs" component={KittehsScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Image source={require("../assets/images/kitteh_selfie/kitteh_selfie.png")} style={{width: 70, height: 40}}/>
      )
    }} />
  </KittehsStack.Navigator>
);
export default RootStackScreen;
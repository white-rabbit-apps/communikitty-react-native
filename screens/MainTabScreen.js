import React from 'react';
import { Image, View, Text } from "react-native";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './FeedScreen';
import MyKittehsScreen from './MyKittehsScreen';
import ProfileScreen from './ProfileScreen';
import KittehsScreen from './KittehsScreen';

import getAnimalDetailsStack from "../navigators/AnimalDetailsStackScreen";

const FeedStack = createStackNavigator();
const MyKittehsStack = createStackNavigator();
const KittehsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Feed"
      component={FeedStackScreen}
      options={{
        tabBarLabel: 'Feed',
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
        tabBarLabel: 'Kitthes',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="MyKittehs"
      component={MyKittehsStackScreen}
      options={{
        tabBarLabel: 'My Kittehs',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <MaterialIcon name="account-group" color={color} size={26} />
        )
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <FeedStack.Screen name="Feed" component={FeedScreen} options={{
      title: 'Feed',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </FeedStack.Navigator>
);

const MyKittehsStackScreen = ({ navigation }) => (
  <MyKittehsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTitle: "My Kittehs"
  }}>
    <MyKittehsStack.Screen name="MyKittehs" component={MyKittehsScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-add" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
    {getAnimalDetailsStack(MyKittehsStack)}
  </MyKittehsStack.Navigator>
);

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
      )
    }} />
    {getAnimalDetailsStack(KittehsStack)}
  </KittehsStack.Navigator>
);

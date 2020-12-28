/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { ApolloProvider, useQuery } from '@apollo/client';
import { AuthContext } from './components/context';

import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import RootStackScreen from './screens/RootStackScreen';
import client from "./graphql/apollo-client";
import { GET_CURRENT_USER } from "./graphql/query/user";

const Drawer = createDrawerNavigator();

const App = ({theme, user}) => {
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const { authContext } = React.useContext(AuthContext);

  useEffect(() => {
    if (data) {
      authContext.signIn(data.currentUser);
    }
  }, [data]);

  if( loading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      { user ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        </Drawer.Navigator>
      )
      :
        <RootStackScreen/>
      }
    </NavigationContainer>
  );
}

export default () => {
  const initialLoginState = {
    isLoading: true,
    user: null
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          user: action.data,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          user: action.data,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          user: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          user: action.data,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      dispatch({ type: 'LOGIN', data: foundUser });
    },
    signOut: async() => {
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      dispatch({ type: 'REGISTER', data: foundUser });
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{loginState, authContext}}>
          <App theme={theme} {...loginState}/>
        </AuthContext.Provider>
      </ApolloProvider>
    </PaperProvider>
  )
};

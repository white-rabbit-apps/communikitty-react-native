import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Drawer
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../graphql/utils/auth";
import { GET_CURRENT_USER } from "../graphql/query/user";
import { LOGOUT_USER } from "../graphql/query/auth";
import { AuthContext } from '../components/context';
import Loader from "../components/Loader";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const auth = new Auth();

export function DrawerContent(props) {
  const [isLogout, setIsLogout] = React.useState(false);
  const { data = {} } = useQuery(GET_CURRENT_USER);
  const { loginState, authContext: { signOut } } = React.useContext(AuthContext);

  const logoutHandler = () => {
    setIsLogout(true);
    if (data.currentUser) {
      logoutUser({variables: { userId: data.currentUser.id }});
    } else {
      auth.logout();
      signOut();
      Alert.alert(null, "KTHXBAI!", [{ text: 'Okay' }]);
    }
  };

  const updateError = (error) => {
    auth.logout();
    signOut();
    setIsLogout(false);
    Alert.alert(null, "KTHXBAI!", [{ text: 'Okay' }]);
  };

  const onLogoutSuccess = (data) => {
    auth.logout(data);
    signOut();
    Alert.alert(null, "KTHXBAI!", [{ text: 'Okay' }]);
  };

  const clearCache = (cache) => {
    cache.writeQuery({
      query: GET_CURRENT_USER,
      data: {},
    });
  };

  const [logoutUser] = useMutation(LOGOUT_USER, { onCompleted: onLogoutSuccess, onError: updateError, update: clearCache });
  const { avatarUrl, fullName, slug } = (loginState.user || {});

  return (
    <View style={{ flex: 1 }}>
      {isLogout && <Loader/>}
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: avatarUrl
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{fullName}</Title>
                <Caption style={styles.caption}>{slug}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('Feed') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="magnify"
                  color={color}
                  size={size}
                />
              )}
              label="Kittehs"
              onPress={() => { props.navigation.navigate('Kittehs') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-group-outline"
                  color={color}
                  size={size}
                />
              )}
              label="My Kittehs"
              onPress={() => { props.navigation.navigate('MyKittehs') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="face-profile"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => { props.navigation.navigate('Profile') }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => logoutHandler()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

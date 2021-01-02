import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Menu, { MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../components/context';

import KittehDetailsScreen from "../screens/KittehDetailsScreen";

const RightMenu = () => {
  let _menu = null;

  const setMenuRef = ref => {
    _menu = ref;
  };

  const hideMenu = (type) => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  return (
    <Menu
      ref={setMenuRef}
      button={<TouchableOpacity onPress={showMenu}><Icon name="ios-ellipsis-horizontal" style={styles.right}/></TouchableOpacity>}
    >
      <MenuItem onPress={() => hideMenu("edit")}>Edit</MenuItem>
      <MenuItem onPress={() => hideMenu("adopt")}>Adopt</MenuItem>
      <MenuItem onPress={() => hideMenu("share")}>Share</MenuItem>
    </Menu>
  )
}

const getAnimalDetailsStack = (AnimalDetailsStack) => {
  const { loginState } = React.useContext(AuthContext);
  return (
    <AnimalDetailsStack.Screen name="KittehDetails" component={KittehDetailsScreen} options={({route, navigation}) => {
      const { params: { name, avatarUrl, slug } } = route;
      return {
        headerLeft: loginState.user ? () => {
          return <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        } : null,
        headerRight: () => (
          <RightMenu/>
        ),
        headerTitle: () => {
          return <View style={styles.titleConatiner}>
            <Image source={{uri: avatarUrl}} style={styles.avatar}/>
            <Text style={styles.title}>{name}</Text>
          </View>
        }
      }
    }}/>
  )
}

const styles = StyleSheet.create({
  titleConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  },
  right: {
    marginRight: 10,
    color: "white",
    fontSize: 25
  }
});

export default getAnimalDetailsStack;
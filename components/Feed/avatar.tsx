import React from "react";
import { Image, StyleSheet,Text, View } from "react-native";

const Avatar = ({ url }) => {
  return (
    <View>
      <Image source={{ uri: url }} style = {styles.avatar} />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50
  }
})

export default Avatar;
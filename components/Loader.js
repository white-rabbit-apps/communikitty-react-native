import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";

const {height, width} = Dimensions.get("screen");

const Loader = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', width, height, position: "absolute", zIndex: 1000}}>
      <ActivityIndicator size="large"/>
    </View>
  );
};

export default Loader;
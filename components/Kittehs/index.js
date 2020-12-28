import React from "react";
import { View, StyleSheet } from "react-native";
import KittehsScreen from "../../screens/KittehsScreen";
import AnimalItem from "./AnimalItem";

const Kittehs = ({
  data
}) => {
  return (
    <View style={styles.container}>
      { data.map(kitteh => <AnimalItem key={kitteh.id} animal={kitteh} />) }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 20
  }
})

export default Kittehs;
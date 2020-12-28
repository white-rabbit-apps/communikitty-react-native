import React from "react";

import { useQuery }  from "@apollo/client";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { GET_CURRENT_ANIMALS } from "../graphql/query/animal";

import Loader from "../components/Loader";
import Kittehs from "../components/Kittehs";

const MyKittehsScreen = (props) => {
  const { loading, error, data } = useQuery(GET_CURRENT_ANIMALS);
  if (loading || error) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Kittehs data={data.currentAnimals} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  selfi: {
    position: "absolute",
    height: 50,
    width: 90,
    right: 0,
    top: 5
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  },
  section: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 20,
  }
})

export default MyKittehsScreen;
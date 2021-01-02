import React, { useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

const AnimalItem = ({ index, animal }) => {
  const navigation = useNavigation();
  const [showDefaultProfilePic, setShowDefaultProfilePic] = useState(false);
  const onError = () => {
    setShowDefaultProfilePic(true);
  }
  const gotoAnimalDetailsScreen = () => navigation.navigate("KittehDetails", { slug: animal.slug, avatarUrl: animal.avatarUrl, name: animal.name });
  return (
    <TouchableOpacity onPress={gotoAnimalDetailsScreen}>
      <View style={styles.container}>
        <Image source={{uri: animal.avatarUrl}} style={styles.image} />
        <Text style={styles.name}>{animal.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const imageWidth = (width - 30)/3;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
    margin: 5,
  },
  name: {
    fontWeight: "bold"
  }
})

export default AnimalItem;

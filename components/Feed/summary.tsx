import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Summary = ({
  data
}) => {
  const { owner, trackable, recipient, key, parameters, trackableType, recipientType } = data;
  const { photos = [], animalSlug = "", animalName = "",  } = parameters || {};
  const navigation = useNavigation();

  const getType = () => {
    const keyArr = key.split('.');
    let action = keyArr[1];
  
    switch(keyArr[0]) {
      case "image":
        action = "added";
        break;
      default:
        if (action === 'update') {
          action = "modified";
        } else if (action === "follow") {
          action = "started following";
        } else if (action === "unfollow") {
          action = "stoped following"
        } else {
          action = "added";
        }
        break;
    }
    return action;
  };

  const navigateToScreen = (slug, avatarUrl, name, type) => {
    switch(type) {
      case "Animal":
        navigation.navigate("Kittehs", {screen: "KittehDetails", params: { slug, avatarUrl, name, tab: "info" }});
        return;
      case "Story":
        navigation.navigate("Kittehs", {screen: "KittehDetails", params: { slug, avatarUrl, name, tab: "timeline" }});
        return;
      default:
        navigation.navigate("Kittehs");
    }
  }

  const getTrackableType = () => {
    if (key === "photo.added") {
      return `${photos?.length || "-"} photo(s) to ${trackableType.toLowerCase()}`;
    }
    return trackableType.toLowerCase();
  }

  return (
    <View>
      <View style={styles.summary}>
        <View style={styles.title}>
          <Text>
            { owner?.fullName }
          </Text>
        </View>
        <Text style={styles.space}>
          { getType() } { getTrackableType() }
        </Text>
        <TouchableOpacity onPress={() => navigateToScreen(trackable?.slug, trackable?.avatarUrl, trackable?.name, trackableType)}>
          <Text style={styles.space}>
            { trackable?.name || "-" }
          </Text>
        </TouchableOpacity>
        {recipient && (
          <>
            <Text style={styles.space}>
              for {recipientType.toLowerCase()}
            </Text>
            <TouchableOpacity onPress={() => navigateToScreen(recipient?.slug, recipient?.avatarUrl, trackable?.name, recipientType)}>
              <Text style={styles.space}>
                { recipient?.name }
              </Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.space}>
          { animalName && `of ${animalName}`}
        </Text>
      </View>
      {!!photos?.length && (
        <View style={styles.imageContainer}>
          {photos.map(({id, thumbnailUrl}, i) =>
            <Image style={styles.image} source={{uri: thumbnailUrl}} key={i} />
          )}
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  summary: {
    display: "flex",
    flexDirection: "row",
    fontSize: 16,
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  title: {
    marginRight: 2
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 5
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row"
  },
  space: {
    marginRight: 5
  }
})

export default Summary;
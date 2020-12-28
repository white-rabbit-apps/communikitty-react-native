import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

const Summary = ({
  data
}) => {
  const { owner, trackable, recipient, key, parameters, trackableType, recipientType } = data;
  const { photos = [], animalSlug = "", animalName = "",  } = parameters || {};

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


  const getRecipientUrl = () => {
    switch(recipientType) {
      case "Animal":
        return `/kittehs/${recipient.slug}/info`;
      case 'Story':
        return `/kittehs/${animalSlug}/timeline`;
      default:
        return "/";
    }
  }

  const getTrackableUrl = () => {
    switch(trackableType) {
      case "Animal":
        return `/kittehs/${trackable.slug}/info`;
      case 'Story':
        return `/kittehs/${recipient.slug}/timeline`;
      default:
        return "/";
    }
  };

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
        <Text href={getTrackableUrl()} style={styles.space}>
          { trackable?.name || "-" }
        </Text>
        {recipient && (
          <>
            <Text style={styles.space}>
              for {recipientType.toLowerCase()}
            </Text>
            <Text href={getRecipientUrl()} style={styles.space}>
              { recipient?.name }
            </Text>
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
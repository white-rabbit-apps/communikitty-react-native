import React from "react";
import Modal from "react-native-modal";
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { useMutation } from "@apollo/client";
import Animated from 'react-native-reanimated';

import { CREATE_STORY, GET_ANIMAL_STORIES } from "../../../graphql/query/story";
import FileUpload from "../../FileUploader";

const Header = ({
  name
}) => {
  return (
    <View>
      <Text>
        New Story for {name}
      </Text>
    </View>
  )
};

const AddNewTimeline = ({
  kittyName,
  animalSlug,
  onClose
}) => {
  fall = new Animated.Value(1);
  const [photos, setPhotos] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const onChangeTitle = (val) => setTitle(val);
  const onSave = () => {
    createStory({
      variables: {
        animalSlug: animalSlug,
        title: title,
        photoIds: photos.map(p => p.id),
      }
    });
  }

  const updateError = (error) => {
    console.log(error)
    // const message = error.message.replace('GraphQL error:', ' ').trim();
    // toast.error(<NotificationContent message={message} type="error" />);
  };

  const onCompleted = async (data) => {
    onClose();
    // const message = 'Story is successfully saved'
    // toast.success(<NotificationContent message={message} type="success" />);
    // onClose();
  };

  const [createStory] = useMutation(CREATE_STORY, {
    onCompleted: onCompleted,
    onError: updateError,
    refetchQueries: [{query: GET_ANIMAL_STORIES, variables: {animalSlug: animalSlug}}],
    awaitRefetchQueries: true
  });

  return (
    <View>
      <Modal
        isVisible
        backdropColor="#B4B3DB"
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        style={styles.modal}
      >
        <View style={styles.contentContainer}>
          <FileUpload setPhotos={setPhotos} photos={photos} fallValue={this.fall} />
          <Header name={kittyName}/>
          <Animated.View style={{margin: 20}}>

            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                  <Text>Upload</Text>
                </TouchableOpacity>
                
                {photos.map(photo => <Image source={{uri: photo.thumbnailUrl}} key={photo.id} style={{width: 100, height: 100}}/>)}
                <TextInput value={title} onChangeText={onChangeTitle}/>               
              </View>
            </ScrollView>
            <View>
              <Button title="Save" onPress={onSave}/>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
})

export default AddNewTimeline;
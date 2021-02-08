import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import { UPLOAD_PHOTO } from "../graphql/query/uploader";
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

function generateRNFile(uri, name) {
  return uri ? new ReactNativeFile({
    uri,
    type: mime.lookup(uri) || 'image',
    name,
  }) : null;
}

const FileUploader = ({
  setPhotos,
  photos,
  fallValue
}) => {
  bs = React.createRef();

  const takeFromCamera = (mediaType = "photo") => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: false,
      compressImageQuality: 0.7,
      multiple: true,
      mediaType: mediaType,
      includeBase64: true
    }).then(image => {
      console.log(image)
      const file = generateRNFile(image.path, `picture-${Date.now()}`, mediaType === "photo" ? "image" : "video");
      console.log(file)
      uploadPhotoToServer({ variables: { file: file, index: 0 }});
      this.bs.current.snapTo(1);
    });
  }

  const chooseFromLibrary = (mediaType = "photo") => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7,
      mediaType: mediaType,
      multiple: true,
      includeBase64: true
    }).then(images => {
      images.forEach((image, i) => {
        const file = generateRNFile(image.path, `picture-${Date.now()}`, mediaType === "photo" ? "image" : "video");
        uploadPhotoToServer({ variables: { file: file, index: i }});
      }) 
      this.bs.current.snapTo(1);
    });
  }
  const updateUploadError = (error) => {
    console.log(error)
    // let errorMsg = '';
    // try {
    //   errorMsg = JSON.parse(error.message.replace('GraphQL error:', ' ').trim());
    // } catch (e) {
    //   errorMsg = 'Failed to upload file';
    // }
    // setMessage(errorMsg.error);
    // setShowError(true);
    // setProgress(prevProgess => {
    //   const p = {...prevProgess};
    //   delete p[errorMsg.index];
    //   return p;
    // });
    // setCounter(prevCounter => prevCounter - 1);
  };

  const onUploadCompleted = async (data) => {
    console.log(data)
    setPhotos([...photos, data.uploadPhoto.photo]);
    //onClose();
    // setProgress(prevProgess => {
    //   const tempProg = {...prevProgess};
    //   delete tempProg[mode === "photos" ? data.uploadPhoto.index : data.uploadDocument.index];
    //   return tempProg;
    // });
    // if (mode === 'documents') {
    //   setFiles([...files, data.uploadDocument.document]);
    //   setPhotos([...files, data.uploadDocument.document]);
    // } else if (mode === 'photos') {
    //   setFiles([...files, data.uploadPhoto.photo]);
    //   setPhotos([...files, data.uploadPhoto.photo]);
    // }
  };

  const updatePhotoSccuess = (cache, {data}) => {};

  const [uploadPhotoToServer, { loading }] = useMutation(UPLOAD_PHOTO, { onCompleted: onUploadCompleted, onError: updateUploadError, update: updatePhotoSccuess});

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo/Video</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => takeFromCamera("photo")}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => takeFromCamera("video")}>
        <Text style={styles.panelButtonTitle}>Take Video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => chooseFromLibrary("photo")}>
        <Text style={styles.panelButtonTitle}>Choose Images From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => chooseFromLibrary("video")}>
        <Text style={styles.panelButtonTitle}>Choose Videos From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.panelButton, styles.panelCancelButton]}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={[styles.panelButtonTitle, styles.panelCancelButtonTitle]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={this.bs}
      snapPoints={[400, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={1}
      callbackNode={fallValue}
      enabledGestureInteraction={true}
    />
  )
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  panelCancelButton: {
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  panelCancelButtonTitle: {
    color: "#000000"
  }
})

export default FileUploader;
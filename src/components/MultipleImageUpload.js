import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { all } from "axios";
import {
  fetchInstructorImages,
  uploadInstructorImages,
} from "../features/auth/authActions";

const MultipleImageUpload = () => {
  const { user, isLoading, error, instructorImages } = useSelector(
    (state) => state.user
  );
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  // const [totalImages, setTotalImages] = useState(0);
  const totalImages = images.length;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInstructorImages({ userID: user._id }));
  }, [isImageUploaded]);

  console.log("InstructorImages: ", instructorImages);

  const handlePickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 5,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const selectedImages = result.assets.map((image) => image.uri);
        setImages(selectedImages);
      }
    } catch (error) {
      console.log("Error @handlePickImages: ", error);
      Alert.alert("Error, An error occurred while picking images");
    }
  };

  const uploadImages = async () => {
    let allImagesSrc = [];
    let uploadedImagesCount = 0;
    for (const imageUri of images) {
      console.log("Uploading image: ", imageUri);
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      const reference = storage().ref(imageName);
      const pathToFile = imageUri;

      try {
        const exists = await reference.getDownloadURL();
        console.log("Image already exists: ", exists);
        Alert.alert("Error", "Image already exists");
        return;
      } catch (error) {
        // console.log("Uploading image from path: ", pathToFile);
        const task = reference.putFile(pathToFile);
        task.on("state_changed", (taskSnapshot) => {
          const progress =
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });

        try {
          await task;
          const downloadURL = await reference.getDownloadURL();
          allImagesSrc.push(downloadURL);
          setUploadedImages((uploadedImages) => uploadedImages + 1);
          uploadedImagesCount = uploadedImagesCount + 1;

          console.log("UploadedImages: ", uploadedImagesCount);
          console.log("TotalImages: ", totalImages);
          console.log("AllImagesSrc: ", allImagesSrc);

          if (uploadedImagesCount === totalImages) {
            // All images are uploaded

            const dispatchUploadingInstructorImage = await dispatch(
              uploadInstructorImages({
                userID: user._id,
                imageSrc: allImagesSrc,
              })
            );

            if (dispatchUploadingInstructorImage) {
              setIsImageUploaded(true);
              Alert.alert(dispatchUploadingInstructorImage.payload.message);
              return;
            }

            // Alert.alert("Success", "All images uploaded successfully");
            return;
          }
        } catch (uploadError) {
          console.error("Error uploading image: ", uploadError);
          Alert.alert("Error", "An error occurred while uploading images");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", gap: 4 }}
      >
        {instructorImages.length > 0
          ? instructorImages.map((image, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))
          : images.map((image, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))}
      </ScrollView>
      {images.length === 0 && instructorImages.length === 0 && (
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePickImages}>
          <Text style={styles.buttonText}>Choose Class Pictures</Text>
        </TouchableOpacity>
      )}
      {images.length > 0 && !isImageUploaded && (
        <View>
          {uploadProgress !== null && (
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.uploadProgressText}>
                {`${uploadedImages}/${totalImages} uploaded`}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.buttonStyle} onPress={uploadImages}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MultipleImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryAlpha,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: 0.4,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  uploadProgressText: {
    marginTop: 10,
    color: Colors.white,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
});

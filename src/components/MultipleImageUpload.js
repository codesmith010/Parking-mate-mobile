import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import Colors from "../constants/Colors";
import {
  setDrivingHostData,
  setLoading,
} from "../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../store/store";

const MultipleImageUpload = ({ children }) => {
  const { user, isLoading, error } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const totalImages = images.length;

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
      Alert.alert("Error, An error occurred while picking images");
    }
  };

  const uploadImages = async () => {
    dispatch(setLoading(true));
    let allImagesSrc = [];
    let uploadedImagesCount = 0;
    for (const imageUri of images) {
      // console.log("Uploading image: ", imageUri);
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      const reference = storage().ref(imageName);
      const pathToFile = imageUri;

      try {
        const exists = await reference.getDownloadURL();

        Alert.alert("Error", "Image already exists");
        return;
      } catch (error) {
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

          if (uploadedImagesCount === totalImages) {
            // All images are uploaded

            const dispatchSavingMultipleImages = await dispatch(
              setDrivingHostData({
                fieldName: "ParkingPhotos",
                value: allImagesSrc,
              })
            );

            if (dispatchSavingMultipleImages) {
              setIsImageUploaded(true);
              return;
            }

            // Alert.alert("Success", "All images uploaded successfully");
            return;
          }
        } catch (uploadError) {
          // console.error("Error uploading image: ", uploadError);
          Alert.alert("Error", "An error occurred while uploading images");
        }
      }
    }
  };

  // handle Image viewer
  const handleImageViewer = () => {
    setIsVisible(!visible);
  };

  const convertToImagesArray = (data) => {
    if (!Array.isArray(data)) {
      return;
    }
    if (data.length === 0) {
      return;
    }

    // Iterate over each item in the array and create an object with the 'uri' property
    const images = data.map((uri) => ({
      uri: uri,
    }));

    return images;
  };

  const imagesArray = convertToImagesArray(images);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", gap: 4 }}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            style={styles.imageContainer}
            key={index}
            onPress={handleImageViewer}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
        <ImageView
          images={imagesArray}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
      {images.length === 0 && (
        <TouchableOpacity onPress={handlePickImages}>
          {children}
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
          {children}
        </View>
      )}
    </View>
  );
};

export default MultipleImageUpload;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: 0.4,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: "bold",
  },
  uploadProgressText: {
    marginTop: 10,
    color: Colors.black,
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
    backgroundColor: Colors.primaryColor,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import Icon, { Icons } from "./Icon";
import {
  faCamera,
  faCloudUpload,
  faFileUpload,
  faU,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchProfilePicture,
  uploadProfilePicture,
} from "../features/auth/authActions";

const SingleImageUpload = () => {
  const { user, isLoading, error, profilePicture } = useSelector(
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
    dispatch(fetchProfilePicture({ userID: user._id }));
  }, [isImageUploaded]);

  console.log("profilePic: ", profilePicture === "");
  console.log("images: ", images);

  console.log("user::: ", user);

  const handlePickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 1,
      });

      if (!result.canceled) {
        const selectedImages = result.assets.map((image) => image.uri);
        setIsImageUploaded(false);
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

            const dispatchUploadingProfileImage = await dispatch(
              uploadProfilePicture({
                userID: user._id,
                profilePictureUrl: allImagesSrc[0],
              })
            );

            if (dispatchUploadingProfileImage) {
              allImagesSrc = [];
              setIsImageUploaded(true);
              Alert.alert(dispatchUploadingProfileImage.payload.message);
              return;
            }

            // Alert.alert("Success", "All images uploaded successfully");
            return;
          }
        } catch (uploadError) {
          console.error("Error uploading image: ", uploadError);
          Alert.alert("Error", "An error occurred while uploading images");
          return;
        }
      }
    }
  };

  console.log("images: ", images);
  console.log("profilePicture: ", profilePicture);

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        {images.length > 0 || profilePicture !== "" ? (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: images.length > 0 ? images[0] : profilePicture,
              }}
              style={styles.image}
              defaultSource={require("../../assets/profile.png")}
            />
          </View>
        ) : (
          // Render a placeholder image or text when there are no images
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/profile.png")}
              style={styles.image}
            />
          </View>
        )}
        {images.length === 0 || isImageUploaded ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 5,
              right: -15,
            }}
            onPress={handlePickImages}
          >
            <Icon
              size={24}
              name={faCamera}
              type={Icons.FontAwesomeIcon}
              color={"#fff"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 5,
              right: -15,
            }}
            onPress={uploadImages}
          >
            <Icon
              size={24}
              name={faUpload}
              type={Icons.FontAwesomeIcon}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* {images.length !== 0 && (
        <TouchableOpacity style={styles.buttonStyle} onPress={uploadImages}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default SingleImageUpload;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
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
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 120 / 2,
    resizeMode: "cover",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "#03DAC6",
    width: 120,
    height: 120,
    // backgroundColor: "#e5e5e5",
    borderRadius: 120 / 2,
  },
});

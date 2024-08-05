import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAds } from "../features/bannerAds/bannerAdsActions";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";

const BannerAd = () => {
  const { user } = useSelector((state) => state.user);
  const { BannerAdsData, bannerIsLoading, bannerError } = useSelector(
    (state) => state.BannerAds
  );

  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch banner ads when the component mounts
    dispatch(fetchBannerAds(user.userToken));
  }, [dispatch, user.userToken]);

  useEffect(() => {
    // Rotate banner ads every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === BannerAdsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [BannerAdsData]);

  const renderBanner = () => {
    if (bannerIsLoading) {
      return <ActivityIndicator size="small" color="white" />;
    } else if (BannerAdsData.length > 0) {
      const currentImageUrl = BannerAdsData[currentImageIndex].imageUrl;
      return (
        <Image
          style={styles.bannerImage}
          source={{
            uri: currentImageUrl,
          }}
        />
      );
    }
    // No banner ads to display
    return null;
  };

  return bannerError?.message === "No banner ads found" ? null : (
    <View style={styles.container}>{renderBanner()}</View>
  );
};

export default BannerAd;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: "8%",
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});

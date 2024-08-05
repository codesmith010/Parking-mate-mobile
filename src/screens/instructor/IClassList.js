import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Colors from "../../constants/Colors";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNeedCoverSpecific } from "../../features/needCover/needCoverActions";
import { fetchCanCoverSpecific } from "../../features/canCover/canCoverActions";
import INeedClassModal from "../../components/INeedClassModal";
import ICanClassModal from "../../components/ICanClassModal";
import BannerAd from "../../components/BannerAd";

const IClassList = () => {
  const { user } = useSelector((state) => state.user);
  const { NeedCoverDataSpecific, isLoadingNeedCover, errorNeedCover } =
    useSelector((state) => state.NeedCovers);
  const { CanCoverDataSpecific, isLoadingCanCover, errorCanCover } =
    useSelector((state) => state.CanCovers);
  const [refreshing, setRefreshing] = useState(false); // for pull to refresh
  const [component, setComponent] = useState("NeedCover");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (component === "NeedCover") {
      dispatch(fetchNeedCoverSpecific(user._id));
    } else if (component === "CanCover") {
      dispatch(fetchCanCoverSpecific(user._id));
    }
  }, [dispatch, component]);

  // Pull to refresh
  const onRefreshNeedCover = () => {
    console.log("onRefreshNeedCover ><><>");
    // This function will be called when the user pulls down to refresh
    setRefreshing(true);
    dispatch(fetchNeedCoverSpecific(user._id));

    // This will be called once the refreshing is complete
    setRefreshing(false);
  };
  // -----------
  // Pull to refresh
  const onRefreshCanCover = () => {
    // This function will be called when the user pulls down to refresh
    setRefreshing(true);
    dispatch(fetchCanCoverSpecific(user._id));

    // This will be called once the refreshing is complete
    setRefreshing(false);
  };
  // -----------

  // handle component
  const handleComponent = (component) => {
    setComponent(component);
  };
  // for close modal
  const handleModalVisibility = () => {
    setModalVisible(false);
  };

  // onPress Modal
  const handleModal = (data) => {
    // console.log("selected: >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", data);
    setSelectedData(data);
    setModalVisible(!modalVisible);
  };
  console.log(
    "CanCoverDataSpecific: ",
    CanCoverDataSpecific[0]?.needCoverClassID?.ClassID?.Students
  );

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // backgroundColor: "black",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primaryAlpha,
                padding: 14,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              onPress={() => handleComponent("NeedCover")}
            >
              <Text style={{ color: Colors.black }}>I Need Cover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primaryDark,
                padding: 14,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
              onPress={() => handleComponent("CanCover")}
            >
              <Text style={{ color: Colors.white }}>I Can Cover</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={
                  component === "NeedCover"
                    ? onRefreshNeedCover
                    : onRefreshCanCover
                }
                tintColor={Colors.primaryColor}
              />
            }
          >
            {component === "NeedCover" && (
              <View>
                {NeedCoverDataSpecific?.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleModal(item)}
                    key={item._id}
                    style={styles.item}
                    //   testID={testIDs.agenda.ITEM}
                  >
                    <View style={{ gap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: "red",
                          width: "100%",
                        }}
                      >
                        <Text style={styles.itemTitleText}>
                          {item?.ClassID?.ClassName}
                        </Text>
                      </View>
                      <Text style={styles.itemDurationText}>
                        {item?.StartDate} {item?.City}
                      </Text>
                      <Text style={styles.itemHourText}>
                        {item?.LevelOfClass}
                      </Text>
                    </View>
                    <View style={styles.itemButtonContainer}>
                      {/* <Button color={"grey"} title={"Info"} /> */}
                      <Text style={{ color: Colors.primaryDark }}>
                        ${item?.CostPerSession}{" "}
                      </Text>
                    </View>
                    {/* {modalVisible && (
                      <INeedClassModal
                        modalVisible={modalVisible}
                        handleModalVisibility={handleModalVisibility}
                        data={selectedData}
                        component={component}
                        handleRefreshNeedCover={onRefreshNeedCover}

                        // handleUpdate={handleUpdate}
                      />
                    )} */}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {component === "CanCover" && (
              <View>
                {CanCoverDataSpecific?.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleModal(item)}
                    key={item._id}
                    style={styles.item}
                    //   testID={testIDs.agenda.ITEM}
                  >
                    <View style={{ gap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: "red",
                          width: "100%",
                        }}
                      >
                        <Text style={styles.itemTitleText}>
                          {item?.needCoverClassID?.ClassID?.ClassName}
                        </Text>
                      </View>
                      <Text style={styles.itemDurationText}>
                        {item?.StartDate} {item?.City}
                      </Text>
                      <Text style={styles.itemHourText}>
                        {item?.LevelOfClass}
                      </Text>
                    </View>
                    <View style={styles.itemButtonContainer}>
                      {/* <Button color={"grey"} title={"Info"} /> */}
                      <Text style={{ color: Colors.primaryDark }}>
                        ${item?.CostPerSession}{" "}
                      </Text>
                    </View>
                    {modalVisible && (
                      <ICanClassModal
                        modalVisible={modalVisible}
                        handleModalVisibility={handleModalVisibility}
                        data={selectedData}
                        component={component}
                        handleRefreshCanCover={onRefreshCanCover}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <BannerAd />
    </SafeAreaProvider>
  );
};

export default IClassList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  mainContainer: {
    height: "80%",
    width: "85%",
    // backgroundColor: "gray",
    // justifyContent: "space-around",
    // gap: 40,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryDark,
    textAlign: "left",
    // backgroundColor: "red",
  },
  inputContainerStyle: {
    backgroundColor: Colors.primaryAlpha,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: Colors.white,
  },
  inputStyle: {
    color: Colors.white,
    padding: 12,
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryDark,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
  item: {
    // padding: 20,
    // backgroundColor: "white",
    // borderBottomWidth: 1,
    // borderBottomColor: "lightgrey",
    // flexDirection: "row",
    backgroundColor: "white",
    // flex: 1,
    borderRadius: 5,
    borderWidth: 0.3, // Border width
    borderColor: "blue", // Border color
    padding: 12,
    marginRight: 10,
    marginTop: 17,
    position: "relative",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    // marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});

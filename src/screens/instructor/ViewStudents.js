import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
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
import IStudentViewModal from "../../components/IStudentViewModal";
import { useNavigation } from "@react-navigation/native";

const ViewStudents = ({ route }) => {
  const { studentData, classID, handleUpdate } = route.params;
  console.log("ViewStudents class data: ", route.params.studentData);
  const { user } = useSelector((state) => state.user);
  const { CanCoverDataSpecific, isLoadingCanCover, errorCanCover } =
    useSelector((state) => state.CanCovers);
  const [refreshing, setRefreshing] = useState(false); // for pull to refresh
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("mounting ViewStudents");

    dispatch(fetchCanCoverSpecific(user._id));
  }, [dispatch]);

  console.log("CanCoverDataSpecific: ", CanCoverDataSpecific);

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
  const onRefreshStudent = () => {
    // This function will be called when the user pulls down to refresh
    setRefreshing(true);
    handleUpdate();

    // This will be called once the refreshing is complete
    setRefreshing(false);
  };
  // -----------

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

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 5,
            // backgroundColor: "#fff",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            width: Dimensions.get("window").width,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: "#0741ad" }}
              size={28}
            />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 15 }}>
            Students
          </Text>
          <Text></Text>
        </View>

        <View style={styles.mainContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshStudent}
                tintColor={Colors.primaryColor}
              />
            }
          >
            {studentData?.length === 0 ? (
              <Text>No students found</Text>
            ) : (
              <View>
                {studentData?.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleModal(item.user)}
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
                          {item?.user.FirstName} {item?.user.LastName}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: "red",
                          width: "100%",
                        }}
                      >
                        <Text style={styles.itemTitleText}>
                          {item?.user.Email}
                        </Text>
                      </View>
                      <Text style={styles.itemDurationText}>
                        {item?.user.Address} {item?.user.City}
                      </Text>
                      <Text style={styles.itemHourText}>
                        {item?.user.Country}
                      </Text>
                    </View>

                    {modalVisible && (
                      <IStudentViewModal
                        modalVisible={modalVisible}
                        handleModalVisibility={handleModalVisibility}
                        data={selectedData}
                        classID={classID}
                        handleRefreshData={handleUpdate}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ViewStudents;

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    gap: 20,
  },
  mainContainer: {
    height: "80%",
    width: "90%",
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

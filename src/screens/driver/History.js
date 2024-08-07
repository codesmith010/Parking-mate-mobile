import moment from "moment";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import Shimmer from "../../components/Shimmer";
import Colors from "../../constants/Colors";
import { useSelector } from "../../store/store";

const History = () => {
  const { DriverSelectedData, isLoading, error } = useSelector(
    (state) => state.Driver
  );
  const [isFetched, setFetched] = useState(false); // Image fetching
  const [visible, setIsVisible] = useState(false);

  const formattedDate = (date) => {
    return date;
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

  const imagesArray = convertToImagesArray(DriverSelectedData?.ParkingPhotos);

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <Text style={styles.text}>History</Text>

        <View style={styles.textDiv}>
          <Text style={styles.text1}>Space Pictures</Text>
        </View>

        <View
          style={{
            borderWidth: 0.3,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {DriverSelectedData?.ParkingPhotos?.map((data, index) => {
            return (
              <Shimmer
                key={index}
                width={100}
                height={100}
                isFetched={isFetched}
              >
                <TouchableOpacity onPress={handleImageViewer}>
                  <Image
                    // key={index}
                    source={{
                      uri:
                        data.length > 0
                          ? data
                          : "../../../assets/parkingmateLogo.png",
                    }}
                    // defaultSource={require("../../../assets/parkingmateLogo.png")}
                    style={{ height: 100, width: 100 }}
                    onLoad={() => setFetched(true)}
                  />
                </TouchableOpacity>
              </Shimmer>
            );
          })}
        </View>
        <ImageView
          images={imagesArray}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

        <View style={styles.div2}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Address:
            {DriverSelectedData?.ParkingSpaceAddress}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Details:
            {DriverSelectedData?.ParkingDetails}
          </Text>
        </View>

        <View style={styles.div3}>
          <Text style={styles.text1}>Parking ID</Text>
          <Text>{"#" + DriverSelectedData?.ParkingSpaceID}</Text>
        </View>

        <View style={styles.div3}>
          <Text style={styles.text1}>Arrive Time</Text>
          <View style={styles.innerLine}>
            <Text>
              {" "}
              {moment(DriverSelectedData?.Booking[0].ArriveTime).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          </View>
        </View>

        <View style={styles.div3}>
          <Text style={styles.text1}>Leave Time</Text>
          <Text>
            {moment(DriverSelectedData?.Booking[0].LeaveTime).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </Text>
        </View>

        <View style={styles.div3}>
          <Text style={styles.text1}>Name of Person</Text>
          <View style={styles.innerLine}>
            <Text>
              {DriverSelectedData?.DriverHostID?.FirstName +
                " " +
                DriverSelectedData?.DriverHostID?.LastName}
            </Text>
          </View>
        </View>

        <View style={styles.div3}>
          <Text style={styles.text1}>Phone Number</Text>
          <Text> {DriverSelectedData?.DriverHostID?.PhoneNumber}</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* Header row */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 5,
              gap: 10,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Day</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Arrive Date</Text>
            </View>
            {/* <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Time</Text>
            </View> */}
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Leave Date</Text>
            </View>
            {/* <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Time</Text>
            </View> */}
          </View>

          {/* Monday row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,

              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Mon</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Mon"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Mon"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Tuesday row */}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Tue</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Tue"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Tue"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Wednesday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Wed</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Wed"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Wed"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Thrusday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Thu</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Thu"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Thu"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Friday row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Fri</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Fri"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Fri"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Saturday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Sat</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Sat"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Sat"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>

          {/* Sunday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 40, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Sun</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Sun"][
                    "ArriveTime"
                  ]
                )}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <TextInput
                editable={false}
                value={formattedDate(
                  DriverSelectedData.DriverHostAvailableDate["Sun"]["LeaveTime"]
                )}
                style={{ width: 178 }}
              />
            </View>
          </ScrollView>
        </View>
        {/* <View style={styles.buttons}>
          <TouchableOpacity style={styles.touch2}>
            <Text style={{ textAlign: "center", color: Colors.primaryDark }}>
              Preview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              width: 170,
              borderRadius: 5,
              borderWidth: 0.3,
              backgroundColor: Colors.primaryColor,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 30,
  },

  div1: {
    marginVertical: 60,
  },

  text: {
    fontSize: 25,
    fontWeight: "600",
  },

  text1: {
    fontSize: 18,
    fontWeight: "600",
  },

  text2: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryColor,
  },

  textDiv: {
    flexDirection: "row",
  },

  div2: {
    backgroundColor: Colors.primaryColor,
    gap: 10,
    padding: 10,
    paddingVertical: 15,
  },

  div3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },

  touch2: {
    padding: 20,
    width: 170,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: Colors.primaryColor,
  },
});

export default History;

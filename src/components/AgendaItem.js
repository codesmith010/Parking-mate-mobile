import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import IAdvertiseClassModal from "./IAdvertiseClassModal";
// import MyPopupMenu from "./MyPopupMenu";

const AgendaItem = ({ item, handleUpdate }) => {
  // console.log("item: >><<>>> ", item);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  console.log("selectedData: >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", selectedData);

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
    <>
      <TouchableOpacity
        onPress={() => handleModal(item)}
        style={styles.item}
        //   testID={testIDs.agenda.ITEM}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "red",
              width: "100%",
            }}
          >
            <Text style={styles.itemTitleText}>{item.ClassName}</Text>
          </View>
          <Text style={styles.itemDurationText}>
            {item.StartTime} , {item.City}
          </Text>
          <Text style={styles.itemHourText}>{item.LevelOfClass}</Text>
        </View>
        <View style={styles.itemButtonContainer}>
          {/* <Button color={"grey"} title={"Info"} /> */}
          <Text style={{ color: "grey" }}>${item.CostPerSession}</Text>
        </View>
        {modalVisible && (
          <IAdvertiseClassModal
            modalVisible={modalVisible}
            handleModalVisibility={handleModalVisibility}
            data={selectedData}
            handleUpdate={handleUpdate}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  item: {
    // padding: 20,
    // backgroundColor: "white",
    // borderBottomWidth: 1,
    // borderBottomColor: "lightgrey",
    // flexDirection: "row",
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
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
    flex: 1,
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

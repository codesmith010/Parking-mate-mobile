import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// import {
//   Menu,
//   MenuOption,
//   MenuOptions,
//   MenuProvider,
//   MenuTrigger,
// } from "react-native-popup-menu";
import { faCalendar, faListDots } from "@fortawesome/free-solid-svg-icons";
import Icon, { Icons } from "./Icon";

// const Divider = () => <View style={styles.divider} />;
// const MyMenuItem = ({ text, iconName, value }) => (
//   <MenuOption
//     onSelect={() => alert(`You clicked ${value}`)}
//     customStyles={{
//       optionWrapper: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//       },
//     }}
//   >
//     <Text>{text}</Text>
//     {/* <Image style={{ width: 12, height: 12 }} src={iconName} /> */}
//   </MenuOption>
// );

const MyPopupMenu = () => {
  // return (
  // <MenuProvider style={styles.container}>
  //   <Menu>
  //     <MenuTrigger
  //       //   text="Click for Option menu"
  //       customStyles={{
  //         triggerWrapper: {
  //           //   top: -20,
  //         },
  //       }}
  //     >
  //       <Icon name={faListDots} type={Icons.FontAwesomeIcon} color="black" />
  //       {/* <Button title="Click me" /> */}
  //     </MenuTrigger>
  //     <MenuOptions
  //       customStyles={{
  //         optionsContainer: {
  //           borderRadius: 10,
  //         },
  //       }}
  //     >
  //       <Divider />
  //       <MyMenuItem text="Block" value="Block" />
  //       <Divider />
  //       <MyMenuItem text="Mute" value="Mute" />
  //       <Divider />
  //       <MyMenuItem text="Follow" value="Follow" />
  //       <Divider />
  //       <MyMenuItem text="Report this ad" value="Report this ad" />
  //     </MenuOptions>
  //   </Menu>
  // </MenuProvider>
  // );
};

export default MyPopupMenu;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // marginVertical: 100,
    // marginHorizontal: 100,
    // padding: 20,
    // height: 200,
    position: "absolute",
    top: 0,
    right: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
});

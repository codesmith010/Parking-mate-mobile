import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";

const SClassList = () => {
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
            <View
              style={{
                backgroundColor: Colors.primaryAlpha,
                padding: 14,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            >
              <Text style={{ color: Colors.black }}>I Need Cover</Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.primaryDark,
                padding: 14,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text style={{ color: Colors.white }}>I Can Cover</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SClassList;

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
});

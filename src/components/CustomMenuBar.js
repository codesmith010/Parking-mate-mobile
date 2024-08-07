import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const CustomMenuBar = ({ size, color }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={{
        borderRadius: 6,
      }}
    >
      <FontAwesomeIcon
        icon={faBars}
        style={{
          color: color || Colors.grayDark, // Default color is Colors.grayDark
        }}
        size={size || 24}
      />
    </TouchableOpacity>
  );
};

export default CustomMenuBar;

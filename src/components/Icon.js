import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image } from "react-native";

export const Icons = {
  FontAwesomeIcon,
};

const Icon = ({ name, type, color, size = 16 }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        // <Tag name={name} size={size || fontSize} color={color} style={style} />
        // <Image
        //   source={src}
        //   style={{
        //     width: size,
        //     height: size,
        //     borderRadius: size,
        //   }}
        // />
        <Tag icon={name} style={{ color: color }} size={size} />
      )}
    </>
  );
};

export default Icon;

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const Icons = {
  FontAwesomeIcon,
};

const Icon = ({ name, type, color, size = 16 }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && <Tag icon={name} style={{ color: color }} size={size} />}
    </>
  );
};

export default Icon;

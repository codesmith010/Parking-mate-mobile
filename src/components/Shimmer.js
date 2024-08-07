import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const Shimmer = ({ children, width, height, isFetched }) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return (
    <ShimmerPlaceHolder width={width} height={height} visible={isFetched}>
      {children}
    </ShimmerPlaceHolder>
  );
};

export default Shimmer;

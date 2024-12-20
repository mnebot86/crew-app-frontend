import React, { useEffect, memo } from "react";
import { ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ShakingContainerProps extends ViewProps {
  children: React.ReactNode;
  triggerShake: number;
}

const ShakingContainer: React.FC<ShakingContainerProps> = ({
  children,
  triggerShake,
  style,
  ...props
}) => {
  const shake = useSharedValue(0);

  useEffect(() => {
    if (triggerShake) {
      shake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [triggerShake]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

export default memo(ShakingContainer);

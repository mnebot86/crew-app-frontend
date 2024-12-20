import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface SwapTransitionWrapperProps {
  isActive: boolean;
  duration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const SwapTransitionWrapper: React.FC<SwapTransitionWrapperProps> = ({
  isActive,
  duration = 300,
  style,
  children,
}) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration });
  }, [isActive, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.9, 1], Extrapolate.CLAMP);
    const opacity = interpolate(progress.value, [0, 1], [0.5, 1], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default SwapTransitionWrapper;

const styles = StyleSheet.create({});

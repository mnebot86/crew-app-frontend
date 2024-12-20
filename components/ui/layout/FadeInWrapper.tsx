import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface FadeInWrapperProps {
	children: React.ReactNode;
	isVisible: boolean;
	duration?: number;
	style?: object;
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = ({
	children,
	isVisible,
	duration = 500,
	style,
}) => {
	const opacity = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	useEffect(() => {
		opacity.value = withTiming(isVisible ? 1 : 0, { duration });
	}, [isVisible, duration, opacity]);

	return (
		<Animated.View style={[animatedStyle, styles.container, style]}>
			{children}
		</Animated.View>
	);
};

export default FadeInWrapper;

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
});

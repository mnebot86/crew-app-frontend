import { ThemedButton } from "@/components/ui/buttons";
import {
	AvoidKeyboard,
	ScreenLayout,
	ThemedView,
} from "@/components/ui/layout";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { AnimatedSVGPaths } from "react-native-svg-animations";
import { CREW_LOGO_PATHS, CREW_LOGO_PATHS_FILL } from "@/components/ui/svg/crew-logo";

const Register = () => {

	
	const fillOpacity = useSharedValue(0);

	useEffect(() => {
		fillOpacity.value = withDelay(1000, withTiming(1, { duration: 1200 }));
	}, [fillOpacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: fillOpacity.value,
	}));
	
	return (
		<AvoidKeyboard>
			<ScreenLayout>
				<ThemedView
					style={styles.header}
				>
					<AnimatedSVGPaths
						ds={CREW_LOGO_PATHS}
						width={500}
						strokeColor={"black"}
						strokeLinecap={"round"}
						sequential
						delay={100}
						duration={100}
						strokeWidth={2}
						loop={false}
						scale={0.7}
						fill={"none"}
						fillRule="evenodd"
					/>
					<Animated.View
						style={[
							StyleSheet.absoluteFillObject,
							animatedStyle,
							{ alignItems: "center" },
						]}
					>
						<AnimatedSVGPaths
							ds={CREW_LOGO_PATHS_FILL}
							width={500}
							strokeColor={"none"}
							fill={"black"}
							scale={0.7}
							fillRule="evenodd"
						/>
					</Animated.View>
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<ThemedButton title="Login" onPress={() => {}} />
					<ThemedButton title="Sign Up" onPress={() => {}} />
				</ThemedView>
			</ScreenLayout>
		</AvoidKeyboard>
	);
};

export default Register;

const styles = StyleSheet.create({
	header: {
		alignItems: "center",
		marginBottom: 20,
		flex: 1,
		position: "relative",
	},
	buttonContainer: {
		gap: 5,
	},
});

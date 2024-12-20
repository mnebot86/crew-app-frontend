import React, { useEffect, useId } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
	useSharedValue,
	useAnimatedProps,
	withTiming,
	Easing,
	useAnimatedRef,
	interpolateColor,
	withDelay,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SVGDrawerProps {
	paths: string[];
	duration?: number;
	drawSequentially?: boolean;
	strokeWidth?: number;
	strokeColor?: string;
	fillColor?: string;
	animationDuration?: number;
	animationDelay?: number;
	height?: number;
	width?: number;
}

//TODO: Continue Advancing This Component to Be More Flexible and Customizable
const SVGDrawer: React.FC<SVGDrawerProps> = ({
	paths,
	duration = 2000,
	drawSequentially = false,
	strokeWidth,
	strokeColor,
	fillColor,
	animationDuration,
	animationDelay,
	height,
    width,
}) => {
	const pathId = useId();
	const progressValues = paths.map(() => useSharedValue(0));
	const colorProgressValues = paths.map(() => useSharedValue(0));
	const pathRefs = paths.map(() => useAnimatedRef<any>());
	const [lengths, setLengths] = React.useState<number[]>(Array(paths.length).fill(0));

	useEffect(() => {
		paths.forEach((_, index) => {
			const strokeDelay = drawSequentially ? index * (duration + 500) : 0;
			const colorFadeDelay = strokeDelay + duration;

			progressValues[index].value = withDelay(
				strokeDelay,
				withTiming(1, {
					duration,
					easing: Easing.linear,
				})
			);

			colorProgressValues[index].value = withDelay(
				colorFadeDelay,
				withTiming(1, {
					duration: 500,
					easing: Easing.linear,
				})
			);
		});
	}, [paths, duration, drawSequentially, progressValues, colorProgressValues]);

	const strokeAnimationProps = (index: number) =>
		useAnimatedProps(() => ({
			strokeDashoffset: lengths[index] - lengths[index] * progressValues[index].value,
		}));

	const colorAnimationProps = (index: number) =>
		useAnimatedProps(() => ({
			fill: interpolateColor(
				colorProgressValues[index].value,
				[0, 1],
				["transparent", "black"]
			),
		}));

	return (
		<Svg
			width="100%"
			height="100%"
			viewBox="0 0 424 107"
			fillRule="evenodd"
			preserveAspectRatio="xMidYMid meet"
		>
			{paths.map((path, index) => (
				<View key={`${pathId}-${index}`}>
					<AnimatedPath
						d={path}
						animatedProps={colorAnimationProps(index)}
						strokeWidth={2}
						fill="transparent"
					/>

					<AnimatedPath
						ref={pathRefs[index]}
						d={path}
						stroke="black"
						strokeWidth={2}
						fill="none"
						animatedProps={strokeAnimationProps(index)}
						onLayout={() => {
							const totalLength = pathRefs[index]?.current?.getTotalLength();
							if (totalLength) {
								setLengths((prev) => {
									const newLengths = [...prev];
									newLengths[index] = totalLength;
									return newLengths;
								});
							}
						}}
						strokeDasharray={lengths[index]}
						strokeDashoffset={0}
					/>
				</View>
			))}
		</Svg>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SVGDrawer;

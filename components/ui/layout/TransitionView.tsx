import React, { useEffect, useRef } from "react";
import {
  View,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  type ViewProps,
  type LayoutChangeEvent,
} from "react-native";

interface TransitionViewProps extends ViewProps {
  children: React.ReactNode;
}

const TransitionView: React.FC<TransitionViewProps> = ({ children, style, ...otherProps }) => {
  const previousHeight = useRef(0);

  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;

    if (newHeight !== previousHeight.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      previousHeight.current = newHeight;
    }
  };

  return (
    <View
      {...otherProps}
      style={[styles.container, style]}
      onLayout={handleLayout}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default TransitionView;

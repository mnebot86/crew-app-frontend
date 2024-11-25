import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "./ThemedView";

interface Props {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  style?: object;
}

const ScreenLayout = ({ children, lightColor, darkColor, style }: Props) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <ThemedView lightColor={lightColor} darkColor={darkColor} style={styles.container}>
        {children}
      </ThemedView>
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

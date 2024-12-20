import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import ThemedHelperText from "./ThemedHelperText";
import ThemedErrorText from "./ThemedErrorText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TransitionView } from "@/components/ui/layout";

export type ThemedInputProps = TextInputProps & {
  helperText?: string;
  errorText?: string;
};

const ThemedInput = ({ helperText, errorText, style, ...props }: ThemedInputProps) => {
  const borderColor = useThemeColor({}, "inputBorder");
  const backgroundColor = useThemeColor({}, "inputBackground");
  const textColor = useThemeColor({}, "inputText");

  return (
    <TransitionView>
      <TextInput
        {...props}
        style={[
          styles.input,
          { borderColor, backgroundColor, color: textColor },
          style,
        ]}
        placeholderTextColor={useThemeColor({}, "inputPlaceholder")}
      />
      {helperText && !errorText && (
        <TransitionView>
          <ThemedHelperText message={helperText} />
        </TransitionView>
      )}
      {errorText && (
        <TransitionView>
          <ThemedErrorText message={errorText} />
        </TransitionView>
      )}
    </TransitionView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default ThemedInput;

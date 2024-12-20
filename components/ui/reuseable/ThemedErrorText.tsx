import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransitionView from '../layout/TransitionView';

interface ThemeErrorTextProps {
  message?: string;
}

const ThemedErrorText: React.FC<ThemeErrorTextProps> = ({ message }) => {
  const errorColor = useThemeColor({}, 'errorText');

  return (
    <TransitionView>
      {message ? (
        <View style={styles.container}>
          <Text style={[styles.errorText, { color: errorColor }]}>
            {message}
          </Text>
        </View>
      ) : (
        <View style={styles.placeholder} /> // Placeholder for smooth transition
      )}
    </TransitionView>
  );
};

export default ThemedErrorText;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingLeft: 10,
  },
  placeholder: {
    height: 0, // Placeholder ensures layout changes are captured
  },
  errorText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});

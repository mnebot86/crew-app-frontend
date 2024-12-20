// Primary Colors
export const PRIMARY_BLACK = "#0D0D0D";
export const OFF_BLACK = "#1A1A1A";
export const WHITE = "#FFFFFF";
export const OFF_WHITE = "#F5F5F5";
export const LIGHT_BEIGE = "#EFE6DD";

// Grayscale for Icons and Text
export const GRAY_DARK = "#4A4A4A";
export const GRAY_MEDIUM = "#7C7C7C";
export const GRAY_LIGHT = "#BFBFBF";

// Highlight Colors
export const HIGHLIGHT_LIGHT = "#C8B8A6";
export const HIGHLIGHT_DARK = "#8F7C6A";

// Spinner Colors
export const SPINNER_LIGHT = "#007AFF"; // iOS blue
export const SPINNER_DARK = "#FFC107"; // Amber

// Error Colors
export const ERROR_LIGHT = "#FF4D4F"; // Bright red for errors
export const ERROR_DARK = HIGHLIGHT_LIGHT; // Muted beige for errors

export const Colors = {
  light: {
    text: PRIMARY_BLACK, // General text color in light mode
    background: OFF_WHITE, // Light mode background color
    tint: LIGHT_BEIGE, // Accent color
    icon: GRAY_DARK, // Icon color
    tabIconDefault: GRAY_MEDIUM, // Default tab icon color
    tabIconSelected: LIGHT_BEIGE, // Selected tab icon color
    buttonBackground: LIGHT_BEIGE, // Button background color in light mode
    buttonText: PRIMARY_BLACK, // Button text color in light mode
    border: GRAY_LIGHT, // General border color in light mode
    inputBackground: OFF_WHITE, // Background color for inputs
    inputText: PRIMARY_BLACK, // Text color for inputs
    inputPlaceholder: GRAY_MEDIUM, // Placeholder text color for inputs
    inputBorder: GRAY_LIGHT, // Border color for inputs
    inputSelectionColor: GRAY_MEDIUM, // Selection highlight color for inputs
    helperText: GRAY_DARK, // Text color for helper text in light mode
    errorText: ERROR_LIGHT, // Text color for error text in light mode
    spinner: SPINNER_LIGHT, // Spinner color in light mode
  },
  dark: {
    text: OFF_WHITE, // General text color in dark mode
    background: PRIMARY_BLACK, // Dark mode background color
    tint: HIGHLIGHT_DARK, // Accent color
    icon: GRAY_LIGHT, // Icon color
    tabIconDefault: GRAY_DARK, // Default tab icon color
    tabIconSelected: HIGHLIGHT_DARK, // Selected tab icon color
    buttonBackground: OFF_BLACK, // Button background color in dark mode
    buttonText: OFF_WHITE, // Button text color in dark mode
    border: GRAY_MEDIUM, // General border color in dark mode
    inputBackground: OFF_BLACK, // Background color for inputs
    inputText: OFF_WHITE, // Text color for inputs
    inputPlaceholder: GRAY_MEDIUM, // Placeholder text color for inputs
    inputBorder: GRAY_MEDIUM, // Border color for inputs
    inputSelectionColor: HIGHLIGHT_DARK, // Selection highlight color for inputs
    helperText: GRAY_LIGHT, // Text color for helper text in dark mode
    errorText: ERROR_DARK, // Text color for error text in dark mode
    spinner: SPINNER_DARK, // Spinner color in dark mode
  },
};

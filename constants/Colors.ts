// Primary colors
const primaryBlack = "#0D0D0D"; // Deep black for backgrounds
const offBlack = "#1A1A1A"; // Slightly lighter black
const white = "#FFFFFF"; // Pure white
const offWhite = "#F5F5F5"; // Softer white
const lightBeige = "#EFE6DD"; // Light beige for accent

// Grayscale for icons and text
const grayDark = "#4A4A4A"; // Dark gray for secondary text/icons
const grayMedium = "#7C7C7C"; // Medium gray for placeholders
const grayLight = "#BFBFBF"; // Light gray for borders or inactive icons

// Highlight colors
const highlightLight = "#C8B8A6"; // Muted beige highlight
const highlightDark = "#8F7C6A"; // Darker beige highlight for contrast

export const Colors = {
  light: {
    text: primaryBlack, // Text color in light mode
    background: offWhite, // Light mode background
    tint: lightBeige, // Accent color
    icon: grayDark, // Icon color
    tabIconDefault: grayMedium, // Default tab icon color
    tabIconSelected: lightBeige, // Selected tab icon color
    buttonBackground: lightBeige, // Button background in light mode
    buttonText: primaryBlack, // Button text color in light mode
    border: grayLight, // Border color in light mode
  },
  dark: {
    text: offWhite, // Text color in dark mode
    background: primaryBlack, // Dark mode background
    tint: highlightDark, // Accent color
    icon: grayLight, // Icon color
    tabIconDefault: grayDark, // Default tab icon color
    tabIconSelected: highlightDark, // Selected tab icon color
    buttonBackground: offBlack, // Button background in dark mode
    buttonText: offWhite, // Button text color in dark mode
    border: grayMedium, // Border color in dark mode
  },
};
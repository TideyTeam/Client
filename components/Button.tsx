
/**
 * Button Component
 * 
 * This file contains a reusable Button component built with React Native.
 * The Button component is a simple, customizable button that displays a label and executes an `onPress` function when clicked. 
 * It accepts optional styles for both the button container and the text.
 * 
 * The component uses `TouchableOpacity` for handling button presses and `Text` to display the label. 
 * It is styled using `StyleSheet` for consistent appearance across platforms.
 * */


import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

/**
 * A customizable button component.
 * 
 * @param {ButtonProps} props - The props for the Button component.
 * @param {string} props.label - The text to display on the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {TextStyle} [props.textStyle] - Optional style to apply to the button text.
 * @param {ViewStyle} [props.style] - Optional style to apply to the button container.
 * 
 * @returns {JSX.Element} The Button component.
 */

const Button: React.FC<ButtonProps> = ({ label, onPress, textStyle, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Defines the styles for the Button component.
 * 
 * @returns {Object} The style object for the button and button text.
 */
const styles = StyleSheet.create({
  button: {
    width: 200, // Set fixed width for the button
    height: 50,
    borderWidth: 2,
    borderColor: '#1965B0', // Black outline for the button
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#1965B0', // Set text color to black
    textAlign: 'center',
  },
});

export default Button;


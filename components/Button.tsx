import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';



interface ButtonProps {
  label: string;
  onPress: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, textStyle, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

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


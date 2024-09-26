import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.buttonBox} onPress={() => alert('Button 1 pressed')}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 1</Text>
              <Text style={styles.buttonTime}>14:53</Text>
            </View>
            <Image 
              source={require('../../assets/images/LaundryIcon.png')} // Ensure correct path
              style={styles.icon} 
            />
          </View>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.buttonBox} onPress={() => alert('Button 2 pressed')}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 2</Text>
              <Text style={styles.buttonTime}>15:00</Text>
            </View>
            <Image 
              source={require('../../assets/images/LaundryIcon.png')} // Ensure correct path
              style={styles.icon} 
            />
          </View>
        </TouchableOpacity>

        {/* Button 3 */}
        <TouchableOpacity style={styles.buttonBox} onPress={() => alert('Button 3 pressed')}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 3</Text>
              <Text style={styles.buttonTime}>15:30</Text>
            </View>
            <Image 
              source={require('../../assets/images/LaundryIcon.png')} // Ensure correct path
              style={styles.icon} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },

  buttonBox: {
    marginVertical: 30,
    width: 300,
    height: 100,
    padding: 20,
    backgroundColor: '#3D3D56',
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
  shadowOffset: {
    width: 0, // Horizontal offset
    height: 5, // Vertical offset
  },
  shadowOpacity: 0.5, // Shadow opacity
  shadowRadius: 8, // Shadow blur radius
  // Elevation for Android
  elevation: 10, // Elevation for Android shadows
},

  buttonContent: {
    flexDirection: 'row', // Keep as row for layout
    justifyContent: 'space-between', // Space out the content
    alignItems: 'center', // Center contents vertically
    width: '100%',
  },

  textContainer: {
    flexDirection: 'column', // Stack text vertically
    justifyContent: 'center', // Center the text vertically
    flex: 1, // Take remaining space
  },

  buttonHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },

  buttonTime: {
    color: '#FFCE00',
    fontSize: 20,
    fontWeight: 100,
    marginTop: 15, // Space between heading and time
  },

  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Ensure the image fits within the dimensions
  },
});

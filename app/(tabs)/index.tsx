import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';


import Button from '../../components/Button';

const LogoImage = require('../../assets/images/Calvin Klean.png');

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>

        { /* Adding Washer and Dryer Icon */}
        <View style={styles.buttonRow}>
          {/* Washer Button */}
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button A pressed')}>
            <Text style={styles.buttonHeading}>Washer</Text>
          </TouchableOpacity>
          {/* Dryer Button */}
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button B pressed')}>
            <Text style={styles.buttonHeading}>Dryer</Text>
          </TouchableOpacity>
        </View>

        {/* Button 1 */}
        <TouchableOpacity style={styles.buttonBox} onPress={() => alert('Button 1 pressed')}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 0</Text>
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
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },

  buttonBox: {
    marginVertical: 15,  // reduce the space between the buttons 
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

  // Button for washer and dryer icons 
  smallButton: {
    width: 130,  // Small width for side-by-side buttons
    height: 130,
    backgroundColor: '#3D3D56',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10, // adding space on the side 
    marginLeft: 10,
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

  buttonRow: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space between buttons
    width: '80%', // Adjust the width of the container to fit both buttons
    marginBottom: 20, // Add space between this row and the buttons below
  },


});

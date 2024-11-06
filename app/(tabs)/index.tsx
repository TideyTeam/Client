import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text ,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


import Button from '../../components/Button';

const LogoImage = require('../../assets/images/Calvin Klean.png');
const LaundryIcon = require('../../assets/images/LaundryIcon.png');
const DryerImage = require('../../assets/images/DryerMachine.png');
const WasherImage = require('../../assets/images/LaundryMachine.png');
const WasherMainImage = require('../../assets/images/WasherScreen.png');
const NotificationImage = require('../../assets/images/NotificationIcon.png');
const NotificationGoldImage = require('../../assets/images/NotificationGoldIcon.png');


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="Washer" component={WasherScreen} />
        <Stack.Screen name="Dryer" component={DryerScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home', // Set the title
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Image 
                 style={styles.notif} 
                source={NotificationImage} // Ensure correct path
              />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Get Started" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

function HomeScreen({navigation}) {
  // add state
  const [isWasher, setIsWasher] = useState(true);
  
  const [isWasherPressed, setWasherPressed] = useState(false); // State to track if Washer button is pressed
  const [isDryerPressed, setDryerPressed] = useState(false); // State to track if Washer button is pressed

  const handleWasherPress = () => {
    setWasherPressed(true);    // Set Washer as pressed
    setDryerPressed(false);    // Unpress the Dryer
    setIsWasher(true);
  };

  const handleDryerPress = () => {
    setDryerPressed(true);     // Set Dryer as pressed
    setWasherPressed(false);   // Unpress the Washer
    setIsWasher(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>

        { /* Adding Washer and Dryer Icon */}
        <View style={styles.buttonRow}>
          {/* Washer Button */}
          <TouchableOpacity style={[styles.smallButton, isDryerPressed && styles.grayLayer]} onPress={handleWasherPress}>
            <Image 
                source={WasherImage} // Ensure correct path
                style={styles.icon} 
              />
          </TouchableOpacity>
          {/* Dryer Button */}
          <TouchableOpacity style={[styles.smallButton, isWasherPressed && styles.grayLayer]} onPress={handleDryerPress}>
            <Image 
                source={DryerImage} // Ensure correct path
                style={styles.icon} 
              />
          </TouchableOpacity>
        </View>

        
        {isWasher ? (
          <>
            {/* Washer Buttons */}
            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Washer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Laundry Machine 1</Text>
                </View>
                <Image source={LaundryIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Washer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Laundry Machine 2</Text>
                </View>
                <Image source={LaundryIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Washer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Laundry Machine 3</Text>
                </View>
                <Image source={LaundryIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          /* No buttons for dryers yet */
          <>
            {/* Dryer Buttons */}
            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Dryer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Dryer Machine 1</Text>
                </View>
                <Image source={DryerImage} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Dryer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Dryer Machine 2</Text>
                </View>
                <Image source={DryerImage} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate('Dryer')}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Dryer Machine 3</Text>
                </View>
                <Image source={DryerImage} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

function WasherScreen(){
  const navigation = useNavigation();
  return (
    <View style={styles.washerContainer}>
      {/* Get Notified Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox} onPress={() => alert('Your notification has been set')}>
          <View style={styles.NotificationContent}>
            <View style={styles.NotificationContainer}>
              <Text style={styles.NotificationHeading}>Laundry Machine 1 </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

       {/* Washer Image */}
      <View style={styles.imageWrapper}>
        <Image 
          source={WasherMainImage} // Ensure correct path to WasherMainImage
          style={styles.washerMainImage} 
        />
      </View>

       {/* Time Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox}onPress={() => navigation.navigate('Notification', { showLaundryButton: true })}>
          <View style={styles.NotificationContent}>
            <View style={styles.NotificationContainer}>
              <Text style={styles.NotificationHeading}>Get Notified</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

function DryerScreen(){
  return (
    <View style={styles.washerContainer}>
      {/* Get Notified Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox} onPress={() => alert('Your notification has been set!')}>
          <View style={styles.NotificationContent}>
            <View style={styles.NotificationContainer}>
              <Text style={styles.NotificationHeading}>Dryer Machine 1 </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

       {/* Washer Image */}
      <View style={styles.imageWrapper}>
        <Image 
          source={WasherMainImage} // Ensure correct path to WasherMainImage
          style={styles.washerMainImage} 
        />
      </View>

       {/* Time Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox} onPress={() => alert('14 minutes and 53 seconds left!')}>
          <View style={styles.NotificationContent}>
            <View style={styles.NotificationContainer}>
              <Text style={styles.NotificationHeading}>Get Notified</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
const NotificationScreen = ({ route }) => {
  const [showLaundryButton, setShowLaundryButton] = useState(false);

  useEffect(() => {
    if (route.params?.showLaundryButton !== undefined) {
      setShowLaundryButton(route.params.showLaundryButton);
    }
  }, [route.params]);



  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Image 
          source={NotificationGoldImage} // Ensure the correct path to your image
          style={styles.notifIcon} 
        />
        <Text style={styles.notificationText}>Notifications</Text>

      </View>
      {showLaundryButton && (
        <TouchableOpacity 
          style={styles.buttonBox} 
          onPress={() => alert('Laundry Machine 1 selected')}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 1</Text>
            </View>
            <Image source={LaundryIcon} style={styles.icon} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* Main Screen */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageContainer: {
    flex: 2 / 3,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 440,
    height: 700, 
    borderRadius: 18,
    marginTop: 100,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Home Screen */
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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

  notif: {
    width: 50,
    height: 50,
    marginRight: 20,
  },

  // Washer Dryer Icon Within HomeScreen
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

    grayLayer: {
      backgroundColor: 'gray', // Apply gray background to simulate a gray layer
      opacity: 0.5, // Add some transparency
    },

    buttonRow: {
      flexDirection: 'row', // Align buttons in a row
      justifyContent: 'space-between', // Space between buttons
      width: '80%', // Adjust the width of the container to fit both buttons
      marginBottom: 20, // Add space between this row and the buttons below
    },

/* Washer Screen */

washerContainer: {
  flex: 1,
  backgroundColor: '#3D3D56',
  justifyContent: 'space-between',
},
  washerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginVertical: 40,  // Add space between elements
  },

  NotificationContent: {
    flexDirection: 'row', // Keep as row for layout
    justifyContent: 'space-between', // Space out the content
    alignItems: 'center', // Center contents vertically
    width: '100%',
  },

  NotificationContainer: {
    flexDirection: 'column', // Stack text vertically
    justifyContent: 'center', // Center the text vertically
    flex: 1, // Take remaining space
  },

  NotificationHeading: {
    color: '#3D3D56',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  notificationBox: {
    width: 300,
    height: 80,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
    marginVertical: 20, // Add spacing between buttons and image
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 5, // Vertical offset
    }
  },

  washerMainImage: {
    width: 400,  // Make the image responsive to screen size
    height: 400,
    marginTop: 70,
    aspectRatio: 1,  // Keep the image aspect ratio
    resizeMode: 'contain',
  },

  imageWrapper: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDryersText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFCE00',
  },

/* Notification Screen */

notificationContainer: {
  flex: 1,
  backgroundColor: '#3D3D56',
  alignItems: 'center', // Centers horizontally
  justifyContent: 'center', // Centers vertically
},
notificationContent: {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute', // Fixes content to the top
  top: 20, // Adjusts how close to the top it should appear
},
notificationText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FFFF',
},
notifIcon: {
  width: 60,
  height: 60,
  marginRight: 20,
}

});

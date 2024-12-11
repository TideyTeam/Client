import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, Image, View, Text ,TouchableOpacity, ScrollView} from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';

// import { useNavigation } from '@react-navigation/native';


import Button from '../../components/Button';

const LogoImage = require('../../assets/images/Calvin Klean.png');
const LaundryIcon = require('../../assets/images/LaundryIcon.png');
const DryerImage = require('../../assets/images/DryerMachine.png');
const WasherImage = require('../../assets/images/LaundryMachine.png');
const WasherMainImage = require('../../assets/images/WasherScreen.png');
const DryerMainImage = require('../../assets/images/DryerScreen.png');
const NotificationImage = require('../../assets/images/NotificationIcon.png');
const NotificationGoldImage = require('../../assets/images/NotificationGoldIcon.png');
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

//const LogoImage = require('../../assets/images/Calvin Klean.png');
// const LaundryIcon = require('../../assets/images/LaundryIcon.png');
// const DryerImage = require('../../assets/images/DryerMachine.png');
// const WasherImage = require('../../assets/images/LaundryMachine.png');
// const WasherMainImage = require('../../assets/images/WasherScreen.png');
// const NotificationImage = require('../../assets/images/NotificationIcon.png');
// const NotificationGoldImage = require('../../assets/images/NotificationGoldIcon.png');
// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationContextType = {
  showLaundryButton: boolean;
  setShowLaundryButton: (value: boolean) => void;
  showDryingButton: boolean;
  setShowDryingButton: (value: boolean) => void;
};

const Stack = createNativeStackNavigator();

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [showLaundryButton, setShowLaundryButton] = useState(false);
  const [showDryingButton, setShowDryingButton] = useState(false);

  return (
    <NotificationContext.Provider value={{ showLaundryButton, setShowLaundryButton, showDryingButton, setShowDryingButton }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default function App() {
  const [notificationCount, setNotificationCount] = useState(2);
  
  return (
    <NotificationProvider>
      {/* Make sure there's only ONE NavigationContainer at the root */}
      <NavigationIndependentTree>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Washer" component={WasherScreen} />
          <Stack.Screen name="Dryer" component={DryerScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="Help " component={NotificationHelpScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: () => (

                <View style={styles.headerRightContainer}>
                {/* Help Button */}
                <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                  <Text style={styles.helpButton}>Help</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                  <View style={styles.iconWrapper}>
                      <Image style={styles.notiff} source={NotificationImage} />
                      {notificationCount > 0 && (
                          <View style={styles.badge}>
                              <Text style={styles.badgeText}>{notificationCount}</Text>
                          </View>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationIndependentTree>
    </NotificationProvider>
  );
}



function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Get Started" onPress={() => navigation.navigate('Home')} style={styles.button}/>
      </View>
    </View>
  );
}

// PropTypes for MainScreen
MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // React Navigation's navigation object
};

function HelpScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          This app allows you to:
        </Text>
        <Text style={styles.point}>
          • View Machine Availability
        </Text>
        <Text style={styles.text}>
          Navigate to the Home Page to view a list of machines and 
          their availability.
        </Text>
        <Text style={styles.point}>
          • Access Machine Details
        </Text>
        <Text style={styles.text}>
          Click on a machine to access its details.
        </Text>
        <Text style={styles.point}>
          • Use the "Get Notified" Feature
        </Text>
        <Text style={styles.text}>
          Click on the "Get Notified" button to receive updates about the 
          machine.
        </Text>
      </ScrollView>
    </View>
  );
}


function NotificationHelpScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          The notification page allows you to:
        </Text>
        <Text style={styles.point}>
          • Track Machine Availability
        </Text>
        <Text style={styles.text}>
          View the selected machine for tracking purposes.
        </Text>
        <Text style={styles.point}>
          • Use the Delete Button
        </Text>
        <Text style={styles.text}>
          Use the Delete button to stop tracking the machine.
        </Text>
      </ScrollView>
    </View>
  );
}

function HomeScreen({navigation}) {
  // add state
  const [isWasher, setIsWasher] = useState(true);
  const [isWasherPressed, setWasherPressed] = useState(false); // State to track if Washer button is pressed
  const [isDryerPressed, setDryerPressed] = useState(false); // State to track if Washer button is pressed
  const [machines, setMachines] = useState([]);
  

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

  useEffect(() => {
    // Fetch machine availability
    fetch('https://calvinkleanapp-gkard6gxf8g8d6em.eastus2-01.azurewebsites.net/getmachine1')
      .then((response) => response.json())
      .then((data) => setMachines(data))
      .catch((error) => console.error('Error fetching machine data:', error));
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.buttonContainer}>
      {/* Adding Washer and Dryer Icons */}
      <View style={styles.buttonRow}>
        {/* Washer Button */}
        <TouchableOpacity
          style={[styles.smallButton, isDryerPressed && styles.grayLayer]}
          onPress={handleWasherPress}
        >
          <Image source={WasherImage} style={styles.icon} />
        </TouchableOpacity>
        {/* Dryer Button */}
        <TouchableOpacity
          style={[styles.smallButton, isWasherPressed && styles.grayLayer]}
          onPress={handleDryerPress}
        >
          <Image source={DryerImage} style={styles.icon} />
        </TouchableOpacity>
      </View>

        
         {/* Washer Machines */}
         {isWasher ? (
          <>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => navigation.navigate('Washer')}
          >
            <View style={styles.buttonContent}>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeading}>Laundry Machine 1</Text>
                <Text
                  style={
                    machines && machines.availability
                      ? styles.buttonUnavailable
                      : styles.buttonAvailable
                  }
                >
                  {machines && machines.availability ? 'Unavailable' : 'Available'}
                </Text>
              </View>
              <Image source={LaundryIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonBox}
              onPress={() => navigation.navigate('Washer')}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonHeading}>Laundry Machine 2</Text>
                  <Text style={styles.buttonUnavailable}>Unavailable</Text>
                </View>
                <Image source={LaundryIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Washer')}
          >
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 3</Text>
              <Text style={styles.buttonUnavailable}>Unavailable</Text>
            </View>
            <Image source={LaundryIcon} style={styles.icon} />
          </View>
          </TouchableOpacity>
          </>
        ) : (
          <>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => navigation.navigate('Dryer')}
          >
            <View style={styles.buttonContent}>
              <View style={styles.textContainer}>
                <Text style={styles.buttonHeading}>Dryer Machine 1</Text>
                <Text
                  style={
                    machines && machines.availability
                      ? styles.buttonUnavailable
                      : styles.buttonAvailable
                  }
                >
                  {machines && machines.availability ? 'Unavailable' : 'Available'}
                </Text>
              </View>
              <Image source={DryerMainImage} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Dryer')}
          >
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Dryer Machine 2</Text>
              <Text style={styles.buttonUnavailable}>Unavailable</Text>
            </View>
            <Image source={DryerMainImage} style={styles.icon} />
          </View>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Dryer')}
          >
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Dryer Machine 3</Text>
              <Text style={styles.buttonUnavailable}>Unavailable</Text>
            </View>
            <Image source={DryerMainImage} style={styles.icon} />
          </View>
          </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

  // PropTypes for HomeScreen
  HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

function WasherScreen({navigation}){
  const { setShowLaundryButton} = useNotification();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpButton}>Help</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  return (
    <View style={styles.washerContainer}>
      {/* Get Notified Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox}>
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
        <TouchableOpacity style={styles.notificationBox}onPress={() => {setShowLaundryButton(true); alert('Your notification has been set');}}>
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
  // PropTypes for WasherScreen
  WasherScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

function DryerScreen({navigation}){
  const { setShowDryingButton} = useNotification();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpButton}>Help</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.washerContainer}>
      {/* Get Notified Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox}>
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
          source={DryerMainImage} // Ensure correct path to WasherMainImage
          style={styles.washerMainImage} 
        />
      </View>

       {/* Time Button */}
      <View style={styles.washerWrapper}>
        <TouchableOpacity style={styles.notificationBox} onPress={() => {setShowDryingButton(true); alert('Your notification has been set');}}>
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

function NotificationScreen({navigation}) {
  const { showLaundryButton, setShowLaundryButton } = useNotification();
  const { showDryingButton, setShowDryingButton } = useNotification();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Help ')}>
          <Text style={styles.helpButton}>Help</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
        <View style={styles.buttonBox}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Laundry Machine 1</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => setShowLaundryButton(false)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <Image source={LaundryIcon} style={styles.icon} />
          </View>
  
        </View>
      )}
      {showDryingButton && (
        <View style={styles.buttonBox}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonHeading}>Drying Machine 1</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDryingButton(false)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <Image source={DryerMainImage} style={styles.icon} />
          </View>
  
        </View>
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
    marginTop: 250,
  },
  footerContainer: {
    flex: 1 / 3,
    flexDirection: 'column', // Stack the buttons vertically
    alignItems: 'center', // Center align buttons horizontally
    marginTop: 180,
    marginHorizontal: 10, // Optional: Adjust side margins
  },
  button: {
    marginBottom: 10, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30, // Adds space above the heading
    marginBottom: 30,
    marginHorizontal: 25, 
    color: '#0065AE', // Dark text
  },
  point: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0065AE', // Dark text
    textAlign: 'left',
    marginBottom: 10,
    lineHeight: 22,
    marginHorizontal: 25, // Adds margins to the left and right
  },
  text: {
    fontSize: 16,
    color: '#000000', // Dark text
    textAlign: 'left',
    marginBottom: 10,
    lineHeight: 22,
    marginHorizontal: 25, // Adds margins to the left and right
  },
  content: {
    alignItems: 'flex-start',
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

  buttonAvailable: {
    color: '#39FF14',
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    paddingTop: 10, 
  },

  buttonUnavailable: {
    color: '#Ff0000',
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    paddingTop: 10, 
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

  //Help

  headerRightContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginRight: 15, // Adjust spacing from the right edge
  },
  helpButton: {
    marginRight: 10, // Space between Help button and notification icon
    color: 'white', // Customize button text color
    fontSize: 16,
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
  backgroundColor: '#FFFF',
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
  color: '#3D3D56',
},
notifIcon: {
  width: 60,
  height: 60,
  marginRight: 20,
},

notiff: {
  width: 30,
  height: 30,
},
iconWrapper: {
  position: 'relative', // Enables positioning of the badge relative to the icon
  marginRight: 15, // Space between icon and screen edge
},
badge: {
  position: 'absolute',
  top: -5, // Adjust to position the badge on the top-right
  right: -5,
  backgroundColor: 'red',
  borderRadius: 10,
  width: 20,
  height: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
badgeText: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},

/* Delete Button */

deleteButton: {
  backgroundColor: '#FF6B6B',
  padding: 10,
  borderRadius: 10,
  width: '50%',
  alignItems: 'center',
  marginTop: 15,
},

deleteButtonText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
},

});



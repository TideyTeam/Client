import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Get Started" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}


function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 2 / 3,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'fix-end',
  },
  image: {
    width: 440,
    height: 700, 
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



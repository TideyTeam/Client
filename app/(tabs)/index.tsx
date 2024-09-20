import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Calvin Klean.png')} // Specify the local image path
        style={styles.backgroundImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Resize the image to cover the entire screen
    justifyContent: 'center',
  },
});

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Calvin Klean!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 35, // Make the text bigger
    fontFamily: 'Times New Roman', // Use a different font style (or you can use 'sans-serif', 'monospace', etc.)
    fontWeight: 'bold', // Optional: Make the text bold
  },
});

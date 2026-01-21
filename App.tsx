// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MiniPlayer from './src/components/MiniPlayer';
import FullPlayerScreen from './src/screens/FullPlayerScreen';


export default function App() {
  return (
    <>
      <HomeScreen />
      <FullPlayerScreen/>
      <MiniPlayer/>
      
    </>
  );

}

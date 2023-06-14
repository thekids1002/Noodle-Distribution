import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RootStackNavigation from './src/navigations/RootStackNavigation';
import ErrorScreen from './src/screens/ErrorScreen';

const App = () => {
  return <RootStackNavigation />;
};

export default App;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RootStackNavigation from './src/navigations/RootStackNavigation';
import ErrorScreen from './src/screens/ErrorScreen';
import DoneScreen from './src/screens/DoneScreen';
import OutOfNoddlesScreen from './src/screens/OutOfNoddlesScreen';
import {Provider} from 'react-redux';
import store from './src/app/store';

const App = () => {
  return <RootStackNavigation />;
};

export default App;

const styles = StyleSheet.create({});

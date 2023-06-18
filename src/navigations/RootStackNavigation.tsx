import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParams} from './RootStackParam';
import WelcomeScreen from '../screens/WelcomeScreen';
import ErrorScreen from '../screens/ErrorScreen';
import OutOfNoddlesScreen from '../screens/OutOfNoddlesScreen';
import {Provider} from 'react-redux';
import store from '../app/store';
import DoneScreen from '../screens/DoneScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="ErrorScanScreen" component={ErrorScreen} />
          <Stack.Screen
            name="OutOfNoodleScreen"
            component={OutOfNoddlesScreen}
          />
          <Stack.Screen name="DoneScreens" component={DoneScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default RootStackNavigation;

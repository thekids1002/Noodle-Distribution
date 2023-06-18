import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.user.user);
  return (
    <View>
      <Text style={{color: 'black'}}>{JSON.stringify(count)}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

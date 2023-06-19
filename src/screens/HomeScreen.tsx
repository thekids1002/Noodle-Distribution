import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import Styles from '../ultils/Styles';
import HeaderGroup from '../components/HeaderGroup';
import Background from '../components/Background';
import Constants from '../ultils/Constants';
import Colors from '../ultils/Colors';
import InfomationBox from '../components/InfomationBox';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUser} from '../features/user/userSlice';
type Props = {
  navigation: any;
  route: any;
};
const HomeScreen: React.FC<Props> = ({navigation, route}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [cups, setCups] = useState([false, false, false]);

  const [avatar, setAvatar] = useState(
    'https://www.chanchao.com.tw/vietnamwood/images/default.jpg',
  );
  const [fullname, setFullname] = useState('loading...');
  const [birthday, setBirthday] = useState('loading...');
  const [gender, setGender] = useState('loading...');
  const [department, setDepartment] = useState('loading...');
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          dispatch(fetchUser(value));
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
    if (user?.numberNoodle <= 0) {
      navigation.replace('OutOfNoodleScreen');
    }
  }, [user]);

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={Constants.INFOMATION_IMG} titleWidth={260} />

      <View style={{flex: 1, paddingHorizontal: 24}}>
        <TouchableOpacity>
          <InfomationBox
            avatar={
              'https://firebasestorage.googleapis.com/v0/b/noodle-41cfb.appspot.com/o/' +
              user?.Image +
              '?alt=media&token=f0edab66-7079-479d-a19e-a66a1e580757'
            }
            fullName={user?.FullName}
            birthday={user?.Birthday}
            gender={user?.Gender}
            department={user?.Department}
          />
        </TouchableOpacity>

        <View
          style={[
            Styles.row,
            Styles.alignItemsCenter,
            Styles.justifyContentBetween,
            {marginTop: 15},
          ]}></View>
        <Image
          source={Constants.THREE_CUP_OF_NOODLES_LEFT_THIS_MONTH}
          style={{
            marginTop: 5,
            alignSelf: 'center',
            resizeMode: 'center',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DoneScreens')}>
          <Image
            source={Constants.BTN_GET_NOODLES}
            style={{
              alignSelf: 'center',
              resizeMode: 'center',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

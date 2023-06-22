import {
  Alert,
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
import {fetchUser, setNumberNoodle} from '../features/user/userSlice';
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
  const [cup1, setcup1] = useState(false);
  const [cup2, setcup2] = useState(false);
  const [cup3, setcup3] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value) {
        dispatch(fetchUser(value));
      }
    };
    fetchData();
  });

  // useEffect(() => {
  //   if (user?.numberNoodle <= 0) {
  //     navigation.replace('OutOfNoodleScreen');
  //   }
  // }, [user, navigation]);

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={Constants.INFOMATION_IMG} titleWidth={260} />

      <View style={{flex: 1, paddingHorizontal: 24}}>
        <View>
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
        </View>
      </View>

      <View style={{flex: 1.7}}>
        <View
          style={[
            Styles.row,
            Styles.alignItemsCenter,
            Styles.justifyContentBetween,
            {marginTop: 15},
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setcup1(!cup1);
              console.log(JSON.stringify(user));
            }}>
            <Image
              source={
                user?.numberNoodle > 0
                  ? require('../assets/cup1.png')
                  : require('../assets/unviliblae.png')
              }
              style={styles.cupNoodle}
            />

            {cup1 && user?.numberNoodle > 0 && (
              <Image
                source={require('../assets/checked.png')}
                style={styles.cupNoodle_Checked}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setcup2(!cup2);
            }}>
            <Image
              source={
                user?.numberNoodle > 1
                  ? require('../assets/cup2.png')
                  : require('../assets/unviliblae.png')
              }
              style={styles.cupNoodle}
            />
            {cup2 && user?.numberNoodle > 1 && (
              <Image
                source={require('../assets/checked.png')}
                style={styles.cupNoodle_Checked}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setcup3(!cup3);
            }}>
            <Image
              source={
                user?.numberNoodle > 2
                  ? require('../assets/cup3.png')
                  : require('../assets/unviliblae.png')
              }
              style={styles.cupNoodle}
            />
            {cup3 && user?.numberNoodle > 2 && (
              <Image
                source={require('../assets/checked.png')}
                style={styles.cupNoodle_Checked}
              />
            )}
          </TouchableOpacity>
        </View>
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
          onPress={() => {
            if (user?.numberNoodle > 0) {
              let count = 0;
              if (cup1) {
                count++;
              }
              if (cup2) {
                count++;
              }
              if (cup3) {
                count++;
              }
              if (count > 0) {
                dispatch(
                  setNumberNoodle({
                    message: user?.UID,
                    numberNoodle: user?.numberNoodle - count,
                  }),
                );
                navigation.replace('DoneScreens');
              } else {
                Alert.alert('Bạn chưa chọn ly mỳ nào');
              }
            } else if (user?.numberNoodle <= 0) {
              navigation.replace('OutOfNoodleScreen');
            }
          }}>
          <Image
            source={Constants.BTN_GET_NOODLES}
            style={{
              alignSelf: 'center',
              resizeMode: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cupNoodle: {
    marginTop: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cupNoodle_Checked: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 100,
    height: 85,
    zIndex: -2,
    paddingBottom: -10,
  },
});

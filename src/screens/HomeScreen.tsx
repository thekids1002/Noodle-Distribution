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
import {AppDispatch, RootState} from '../app/store';
import Styles from '../ultils/Styles';
import HeaderGroup from '../components/HeaderGroup';
import Background from '../components/Background';
import Colors from '../ultils/Colors';
import InfomationBox from '../components/InfomationBox';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUser, setTempUid, subNoodle} from '../features/user/userSlice';
import Spinner from 'react-native-loading-spinner-overlay';
import MyButton from '../components/MyButton';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: any;
  route: any;
};

const HomeScreen: React.FC<Props> = ({navigation, route}) => {
  // lấy user từ trong store
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
  // cup1 2 3 tương ứng với ly mì 1 2 3
  const [cup1, setcup1] = useState(false);
  const [cup2, setcup2] = useState(false);
  const [cup3, setcup3] = useState(false);
  const [loading, setLoading] = useState(true);

  // đọc lại userID AsyncStorage và lấy dữ liệu từ firebase
  const getUser = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value) {
      dispatch(fetchUser(value));
      dispatch(setTempUid(value));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // xử lý sự kiện nhấn nút back từ màn hình khác chuyển sang màn hình Home ( go back )
  // get lại thông tin user
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', async () => {
      await getUser();
      await startLoading();
    });
    return unsubcribe;
  }, [navigation]);

  const tempUid = useSelector((state: RootState) => state.user.tempUId);

  // sau khi userID đã được set vào store
  // ở đây sẽ lưu lại UserId vào AsyncStorage
  useEffect(() => {
    const storeData = async (value: string) => {
      try {
        await AsyncStorage.setItem('@storage_Key', value);
      } catch (e) {
        console.log(e);
      }
    };
    if (tempUid != '' && tempUid != undefined) {
      storeData(tempUid);
    }
  }, [tempUid]);

  const startLoading = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    startLoading();
  }, []);

  return (
    <View style={Styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
      />
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={'Infomation'} titleWidth={260} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
        }}>
        <View>
          <InfomationBox
            avatar={user?.Image}
            fullName={user?.FullName}
            birthday={user?.Birthday}
            gender={user?.Gender}
            department={user?.Department}
          />
        </View>
      </View>

      <View style={{flex: 2, top: -40}}>
        <View
          style={[
            Styles.row,
            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
            {
              marginTop: '5%',
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: 110,
              height: 150,
            }}
            onPress={() => {
              setcup1(!cup1);
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
            style={{
              width: 110,
              height: 150,
            }}
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
            style={{
              width: 110,
              height: 150,
            }}
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
        <Text
          style={{
            marginTop: 0,
            alignSelf: 'center',
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {user?.numberNoodle}
          </Text>
          <Text
            style={{
              color: '#9C6666',
              fontSize: 12,
              fontFamily: 'paytoneone',
            }}>
            {' '}
            cups of noodles left this month
          </Text>
        </Text>

        <MyButton
          onPress={async () => {
            if (user?.numberNoodle > 0) {
              // đếm số ly mì được chọn
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
                // xử lý set lại số ly mì trên firebase
                await dispatch(
                  subNoodle({
                    message: tempUid,
                    numberNoodle: user?.numberNoodle - count,
                  }),
                );
                navigation.replace('DoneScreens');
              } else {
              }
            } else if (user?.numberNoodle <= 0) {
              navigation.navigate('OutOfNoodleScreen');
            }
          }}
          text={
            user?.numberNoodle > 0 ? 'Get your noodles' : 'Come back next month'
          }></MyButton>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cupNoodle: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  cupNoodle_Checked: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 100,
    height: 150,
    zIndex: -2,
    paddingBottom: -10,
  },
});

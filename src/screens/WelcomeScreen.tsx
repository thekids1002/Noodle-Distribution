import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  ImageBackground,
  Animated,
  PanResponder,
  Alert,
  PermissionsAndroid,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Styles from '../ultils/Styles';
import Background from '../components/Background';
import HeaderGroup from '../components/HeaderGroup';
import Colors from '../ultils/Colors';
import Constants from '../ultils/Constants';
import RNQRGenerator from 'rn-qr-generator';
import * as ImagePicker from 'react-native-image-picker';
import FontSizes from '../ultils/FontSizes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations/RootStackParam';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {fetchUser} from '../features/user/userSlice';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<RootStackParams, 'WelcomeScreen'>;

type WellComeProps = {
  navgiation: any;
  router: any;
};

interface User {
  FullName: any;
  Birthday: any;
  Gender: any;
  Department: any;
  numberNoodle: any;
  //   Image: any;
}

const WelcomeScreen = ({navigation, route}: Props) => {
  const [path, setPath]: any = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  const handleFetchUser = async (userId: string) => {
    await dispatch(fetchUser(userId));
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePicture = async () => {
    await requestCameraPermission();
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // @ts-ignore
    ImagePicker.launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //console.log(response);
        const path = {uri: response.assets[0].uri};
        setPath(path);
        RNQRGenerator.detect({
          uri: response.assets[0].uri,
        })
          .then(async response => {
            const {values} = response;
            const message = values.join(', ');
            if (message != null && message !== undefined && message != '') {
              await handleFetchUser(message);
            } else {
              navigation.replace('ErrorScanScreen');
            }
          })
          .catch(error => console.log('Cannot detect QR code in image', error));
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          navigation.replace('HomeScreen');
        }
      } catch (e) {}
    };
    getData();
    if (user) {
      const storeData = async (value: string) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
          // saving error
        }
      };
      storeData(user.UID);
      console.log(user.UID);
      navigation.replace('HomeScreen');
    }
    if (user === null) {
      navigation.replace('ErrorScanScreen');
    }
  }, [user]);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const x = (pan.x as any)._value;
        if (x > 100) {
          return;
        }

        const right = gestureState.dx > 0; // Chỉ cho phép di chuyển sang bên phải
        if (right) {
          pan.x.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: () => {
        const x = (pan.x as any)._value;
        if (x > 100) {
          pan.x.setValue(0);
          pan.y.setValue(0);
          takePicture();
        }
        pan.flattenOffset();
      },
    }),
  ).current;
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={'welcome'} />

      <ImageBackground
        style={{marginLeft: 43, width: 285, height: 170, paddingTop: 2}}
        source={require('../assets/border_video_alt.png')}>
        <View style={[Styles.alignItemsCenter]}>
          <Image source={Constants.ALTA_VIDEO} style={styles.altaVideo} />
        </View>
      </ImageBackground>
      <View style={styles.containerBottom}>
        <View
          style={[
            Styles.row,
            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
          ]}>
          <Image source={Constants.IC_SCAN} style={styles.iconScan} />
          <Text style={[FontSizes.h3, styles.bottomTitle]}>
            Follow the arrow to scan card
          </Text>
        </View>
        <View
          style={[
            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
            {
              width: '100%',
            },
          ]}>
          <Animated.View
            style={{
              transform: [{translateX: pan.x}, {translateY: pan.y}],
              position: 'absolute',
              width: 108,
              height: 140,
              marginTop: 50,
              alignItems: 'center',
            }}
            {...panResponder.panHandlers}>
            <Image source={Constants.SCAN_AREA} style={styles.scanArea} />
          </Animated.View>
          {/* <Image source={Constants.SCAN_AREA} style={styles.scanArea} /> */}
        </View>
        <Image source={Constants.DOUBLE_ARROW} style={styles.doubleArrow} />
      </View>
      {/* <FooterGroup /> */}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  altaVideo: {
    width: 265,
    height: 150,
    resizeMode: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 14,
    marginRight: 10,
  },
  containerBottom: {
    flex: 1,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  iconScan: {
    width: 35,
    height: 35,
  },
  bottomTitle: {
    fontWeight: 'bold',
    color: '#AE0808',
    marginStart: 10,
  },
  scanArea: {
    width: 108,
    height: 140,
    resizeMode: 'center',
    marginTop: 125,
  },
  doubleArrow: {
    width: 68,
    height: 40,
    position: 'absolute',
    resizeMode: 'center',
    right: 20,
    bottom: 50,
    //marginTop: 150,
  },
});

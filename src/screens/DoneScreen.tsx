import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import HeaderGroup from '../components/HeaderGroup';
import Styles from '../ultils/Styles';
import Colors from '../ultils/Colors';
import Constants from '../ultils/Constants';
import FontSizes from '../ultils/FontSizes';

const DoneScreen = ({}) => {
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup />

      <View style={{flex: 4}}>
        <Image
          resizeMode="stretch"
          source={Constants.DONE_IMG}
          style={{
            width: 200,
            height: 275,
            alignSelf: 'center',
          }}
        />

        <Text
          style={[
            Styles.textWhite,
            Styles.textCenter,
            Styles.textBold,
            {marginTop: 30, fontSize: 30},
          ]}>
          Enjoy your noodles ;)
        </Text>

        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image
            source={Constants.BTN_BACK_TO_HOME}
            style={{
              marginTop: 15,
              width: '70%',
              height: 50,
              alignSelf: 'center',
              resizeMode: 'stretch',
            }}
          />
        </TouchableOpacity>

        <Text
          style={[
            Styles.textCenter,
            Styles.textBold,
            FontSizes.h3,
            {color: Colors.BLUE, marginTop: 20},
          ]}>
          Get them below
        </Text>
        <Image
          source={Constants.DOUBLE_ARROW_DOWN}
          resizeMode="center"
          style={{alignSelf: 'center'}}
        />
      </View>
    </View>
  );
};

export default DoneScreen;

const styles = StyleSheet.create({});

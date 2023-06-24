import {StyleSheet, StatusBar, View, Image, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import Styles from '../ultils/Styles';
import Colors from '../ultils/Colors';
import HeaderGroup from '../components/HeaderGroup';
import Constants from '../ultils/Constants';

const OutOfNoddlesScreen = () => {
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={''} titleWidth={260} />

      <View style={[Styles.alignItemsCenter, {flex: 1}]}>
        <Text style={[Styles.textOutCup, styles.alert]}>
          There is
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: '900',
              fontFamily: 'Nunito-Black',
            }}>
            {' 0 '}
          </Text>
          cup of noodles left in the machine. Please fill in to continue.
        </Text>
      </View>

      <View style={styles.cups}>
        <Image style={styles.noodleCup} source={Constants.OUT_NOODLES_CUP} />
        <Image
          style={styles.noodleCupLarge}
          source={Constants.OUT_NOODLES_CUP}
        />
        <Image style={styles.noodleCup} source={Constants.OUT_NOODLES_CUP} />
      </View>

      <View style={{flex: 1}}></View>
    </View>
  );
};

export default OutOfNoddlesScreen;

const styles = StyleSheet.create({
  alert: {
    marginBottom: 10,
    width: 260,
    fontSize: 16,
    marginTop: -25,
  },
  cups: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 270,
    left: 0,
    right: 0,
  },
  noodleCup: {
    width: 100 / 2,
    height: 271 / 2,
    resizeMode: 'contain',
    marginBottom: 30,
    marginHorizontal: 8,
  },
  noodleCupLarge: {
    width: 75,
    height: 200,
    resizeMode: 'contain',
  },
});

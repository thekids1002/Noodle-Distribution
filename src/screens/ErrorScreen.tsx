import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Styles from '../ultils/Styles';
import Colors from '../ultils/Colors';
import Background from '../components/Background';
import HeaderGroup from '../components/HeaderGroup';
import Constants from '../ultils/Constants';
import FooterGroup from '../components/FooterGroup';

const ErrorScreen = () => {
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={Constants.ERROR_IMG} />

      <View style={[Styles.alignItemsCenter, {flex: 1, marginTop: -35}]}>
        <Text style={[Styles.textWhite, styles.alert]}>
          Can not recongnize your ID card.
        </Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
          <Text style={[Styles.textWhite, Styles.textBold]}>
            Please scan again
          </Text>
        </TouchableOpacity>
        <Image source={Constants.ERROR_CARD} style={styles.errorCard} />
      </View>
      <FooterGroup />
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  alert: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorCard: {
    width: 110,
    height: 131,
    marginTop: 30,
  },
});

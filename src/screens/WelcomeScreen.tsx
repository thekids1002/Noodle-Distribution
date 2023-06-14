import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Styles from '../ultils/Styles';
import Background from '../components/Background';
import HeaderGroup from '../components/HeaderGroup';
import Colors from '../ultils/Colors';
import Constants from '../ultils/Constants';
import FotterGroup from '../components/FotterGroup';

const WelcomeScreen = () => {
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={Constants.WELCOME_IMG} />

      <ImageBackground
        style={{marginLeft: 43, width: 285, height: 170, paddingTop: 2}}
        source={require('../assets/border_video_alt.png')}>
        <View style={[Styles.alignItemsCenter]}>
          <Image source={Constants.ALTA_VIDEO} style={styles.altaVideo} />
        </View>
      </ImageBackground>

      <FotterGroup />
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
});

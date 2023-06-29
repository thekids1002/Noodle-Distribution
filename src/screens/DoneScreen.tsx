import {StyleSheet, StatusBar, View, Image, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import HeaderGroup from '../components/HeaderGroup';
import Styles from '../ultils/Styles';
import Colors from '../ultils/Colors';
import Constants from '../ultils/Constants';
import FontSizes from '../ultils/FontSizes';
import MyButton from '../components/MyButton';
type Props = {
  navigation: any;
  route: any;
};
const DoneScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Background />
      <HeaderGroup title={'done'} />
      <View style={{flex: 4.5}}>
        <Image
          resizeMode="contain"
          source={Constants.DONE_IMG}
          style={{
            marginTop: 75,
            width: 220,
            height: 220,
            alignSelf: 'center',
          }}
        />
        {/* <Image
          source={require('../assets/enjoynoodle.png')}
          resizeMode="contain"
          style={[
            {
              opacity: 0.7,
              top: '-5%',
              width: 200,
              height: '14%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              resizeMode: 'contain',
            },
          ]}
        /> */}

        <Text
          style={[
            {
              color: '#C71A1A',
              height: '13.5%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              fontFamily: 'paytoneone',
              fontSize: 21,
            },
          ]}>
          Enjoy your Noodles{' '}
          <Image
            resizeMode="contain"
            source={require('../assets/IconHeart.png')}
          />
        </Text>
        <MyButton
          onPress={() => {
            navigation.replace('HomeScreen');
          }}
          text={'Back to home'}></MyButton>

        <Text
          style={[
            Styles.textCenter,
            Styles.textBold,
            FontSizes.h3,
            {color: '#F8C135', marginTop: '-8%'},
          ]}>
          Get them below
        </Text>
        <Image
          source={Constants.DOUBLE_ARROW_DOWN}
          resizeMode="center"
          style={{alignSelf: 'center', marginTop: '-2%'}}
        />
      </View>
    </View>
  );
};

export default DoneScreen;

const styles = StyleSheet.create({});

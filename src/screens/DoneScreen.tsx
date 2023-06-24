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
      <HeaderGroup title={'DONE'} />
      <View style={{flex: 4.5}}>
        <Image
          resizeMode="contain"
          source={Constants.DONE_IMG}
          style={{
            marginTop: 75,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Image
          source={require('../assets/enjoynoodle.png')}
          resizeMode="contain"
          style={[
            {
              marginTop: 10,
              width: 200,
              height: '14%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              resizeMode: 'contain',
            },
          ]}
        />

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
          style={{alignSelf: 'center', marginTop: '-5%'}}
        />
      </View>
    </View>
  );
};

export default DoneScreen;

const styles = StyleSheet.create({});

import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import React from 'react';
import Styles from '../ultils/Styles';
import FontSizes from '../ultils/FontSizes';
import Colors from '../ultils/Colors';

interface InformationBoxProps {
  avatar: string;
  fullName: string;
  birthday: string;
  gender: string;
  department: string;
}

const InfomationBox: React.FC<InformationBoxProps> = ({
  avatar,
  fullName,
  birthday,
  gender,
  department,
}) => {
  return (
    <View style={styles.infomationBox}>
      <ImageBackground
        resizeMode="stretch"
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
        source={require('../assets/bg_info.png')}>
        <View style={[Styles.alignItemsCenter, {marginHorizontal: 20}]}>
          <Image source={{uri: avatar}} style={styles.circleAvatar} />
        </View>
        <View style={[Styles.row]}>
          <View>
            <Text
              style={[
                FontSizes.h5,
                Styles.textWhite,
                Styles.textBold,
                styles.infomationText,
              ]}>
              Full name:
            </Text>
            <Text
              style={[
                FontSizes.h5,
                Styles.textWhite,
                Styles.textBold,
                styles.infomationText,
              ]}>
              Birthday:
            </Text>
            <Text
              style={[
                FontSizes.h5,
                Styles.textWhite,
                Styles.textBold,
                styles.infomationText,
              ]}>
              Gender:
            </Text>
            <Text
              style={[
                FontSizes.h5,
                Styles.textWhite,
                Styles.textBold,
                styles.infomationText,
              ]}>
              Department:
            </Text>
          </View>
          <View style={{marginStart: 10}}>
            <Text
              style={[FontSizes.h5, styles.infomationText]}
              numberOfLines={1}>
              {fullName}
            </Text>
            <Text style={[FontSizes.h5, styles.infomationText]}>
              {birthday}
            </Text>
            <Text style={[FontSizes.h5, styles.infomationText]}>{gender}</Text>
            <Text
              style={[FontSizes.h5, styles.infomationText]}
              numberOfLines={1}>
              {department}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InfomationBox;

const styles = StyleSheet.create({
  textInfo: {
    color: '#880B0B',
  },
  infomationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
    height: '100%',
    marginTop: '-5%',
  },
  circleAvatar: {
    width: 90,
    height: 90,
    borderRadius: 500,
    resizeMode: 'cover',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3.3,
  },
  infomationText: {
    color: '#880B0B',
    marginVertical: 4,
    maxWidth: 95,
  },
});

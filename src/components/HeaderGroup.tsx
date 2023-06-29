import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Constants from '../ultils/Constants';

interface headerGroupProps {
  title?: any;
  titleWidth?: any;
}
const HeaderGroup: React.FC<headerGroupProps> = ({title, titleWidth}) => {
  return (
    <View style={styles.headerGroup}>
      <Image source={Constants.LOGO_IMG} style={styles.logo} />
      <Text
        style={[
          styles.title,
          {
            fontFamily: 'Nexa-Rust',
            color: '#C71A1A',
            fontSize: 30,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderGroup;

const styles = StyleSheet.create({
  headerGroup: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 85,
    height: 69,
    resizeMode: 'stretch',
    marginBottom: 20,
    marginTop: 0,
  },
  title: {
    width: 500,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});

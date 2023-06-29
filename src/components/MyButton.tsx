// ButtonWithText.tsx
import React from 'react';
import {TouchableOpacity, Image, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import Constants from '../ultils/Constants';

interface ButtonWithTextProps {
  onPress: () => void;
  text: string;
}

const MyButton: React.FC<ButtonWithTextProps> = ({onPress, text}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image
        source={Constants.BTN_GET_NOODLES}
        style={{
          alignSelf: 'center',
          resizeMode: 'center',
        }}
      />
      <Text
        style={{
          fontFamily: 'Nexa-Rust',
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
          transform: [{translateY: -14}],
          color: '#A31616',
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

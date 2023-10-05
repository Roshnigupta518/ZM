import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors} from '../../global/theme/Theme';
import st from '../../global/styles/styles';
import {size, family} from '../../global/fonts/Fonts';
const Button = ({title, disabled, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          borderRadius: 50,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          backgroundColor: disabled ? colors.grey : '#87CEEB',
          padding: 10,
        },
      ]}>
      <Text
        style={[
          {
            color: colors.white,
            fontSize: size.subheading,
            fontFamily: family.semibold,
            textTransform: 'capitalize',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

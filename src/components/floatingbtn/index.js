import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import st from '../../global/styles/styles';
import {colors} from '../../global/theme/Theme';

const FloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.buttonsty}
      activeOpacity={0.5}
      onPress={onPress}>
      <Image
        source={require('../../assets/images/Images/logo2.jpeg')}
        style={{width: 32, height: 27}}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  buttonsty: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fefefe',
    position: 'absolute',
    bottom: 20,
    right: 20,
    ...st.shadowsty,
    ...st.justify_C,
    ...st.align_C,
    elevation:3
  },
});

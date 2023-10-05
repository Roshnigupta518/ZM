import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {images} from '../../../global/theme/Theme';
import {
  StackActions,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';

const Init = ({navigation}) => {
  const login_data = useSelector(state => state.login?.data);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (login_data) {
  //       if (login_data?.response?.ZRMV == true) {
  //         navigation.navigate('DrawerNavigationRoutes');
  //         // navigation.navigate('ProfilePictureScreen');
  //       } else if (login_data?.response?.ZRMV == false) {
  //         navigation.navigate('OtpScreen');
  //       }
  //     } else {
  //       navigation.dispatch(StackActions.replace('SplashScreen'));
  //     }
  //   }, 2000);
  // }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <View style={styles.center}>
        <Image
          source={images.logo}
          style={{width: 230, height: 100, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

export default Init;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

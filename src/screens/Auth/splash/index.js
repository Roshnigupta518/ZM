import React, {useState, useEffect} from 'react';
import {
  StackActions,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import {images} from '../../../global/theme/Theme';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  const login_data = useSelector(state => state.login?.data);

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Intro'));
    }, 5000);
  }, [navigation]);

  return (
    <View>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Video
        source={images.intro_vdo}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 900,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images} from '../../global/theme/Theme';
import {environment} from '../../utils/constant';

const ProfileImg = ({url, style}) => {
  // console.log({ProfileImg: environment.imagePath + url});
  return (
    <View>
      {url ? (
        <Image
          source={
            url != 'uploads/zeros-avatar.svg'
              ? {uri: environment.imagePath + url}
              : images.user
          }
          style={[styles.userImg, style]}
        />
      ) : (
        <Image source={images.user} style={[styles.userImg, style]} />
      )}
    </View>
  );
};

export default ProfileImg;

const styles = StyleSheet.create({
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
});

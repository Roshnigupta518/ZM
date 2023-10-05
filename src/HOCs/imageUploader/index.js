import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import Authbtn from '../../components/Authbtn';
import st from '../../global/styles/styles';
import Alert from '../../components/alert';
import {size, family} from '../../global/fonts/Fonts';
import { colors } from '../../global/theme/Theme';
import {useDispatch, useSelector} from 'react-redux';

const WithImageUpload = (WrappedComponent, uploadImageToServer) => {
  return props => {
    const [showModal, setShowModal] = useState(false);
    const darktheme = useSelector(state => state.darktheme?.data);
    
    const checkCameraPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          const result = await request(PERMISSIONS.IOS.CAMERA);

          if (result === 'granted') {
            handleTakePhoto();
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Zeros Camera Permission',
              message:
                'Zeros needs access to your camera ' +
                'so you can change your profile picture.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            await checkWriteToExternalPermission();
          } else {
            console.log('Camera permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const checkWriteToExternalPermission = async (key = 'camera') => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Zeros Storage Permission',
            message:
              'Zeros needs to write to your storage ' +
              'to save your picture in Gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          console.log('Storage permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const handleTakePhoto = async (storagePermission = true) => {
      const permissionsGranted = await checkCameraPermission();

      console.log({permissionsGranted});

      const options = {
        mediaType: 'photo',
        saveToPhotos: storagePermission,
      };

      launchCamera(options, res => {
        if (res.errorCode) {
          console.warn(res.errorCode);
          return;
        }
        console.log(res);
        if (!res.didCancel) {
          uploadImageToServer(res);
        }
      });
    };

    const handleChooseFromGallery = () => {
      const options = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, res => {
        if (res.errorCode) {
          console.warn(res.errorCode);
          return;
        }
        console.log(res);
        if (!res.didCancel) {
          uploadImageToServer(res);
        }
      });
    };

    return (
      <View>
        <WrappedComponent
          {...props}
          handleImageUpload={() => setShowModal(!showModal)}
        />
        <Alert showModal={showModal} setShowModal={setShowModal}>
          <View style={[st.pd20, st.align_C]}>
            <Text style={[st.tx16(darktheme), st.mt_v]}>Upload Image</Text>

            <Authbtn title={'Take a photo'} onPress={() => handleTakePhoto()} />
            <Authbtn
              title={'Pick from Gallery'}
              onPress={() => handleChooseFromGallery()}
            />
          </View>
        </Alert>
      </View>
    );
  };
};

export default WithImageUpload;

const styles = StyleSheet.create({
  heading:{
  fontSize: size.subheading,
  fontFamily: family.bold,
  color:colors.black
}
});

import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import Authbtn from '../../../components/Authbtn';
import st from '../../../global/styles/styles';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {setLogin, updateLogin} from '../../../redux/reducers/Login';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../components/input';
import {
  ValidateMobile,
  ValueEmpty,
  ValidatePassword,
} from '../../../utils/helperfunctions/validations';
import PopUpMessage from '../../../components/popup';
import uuid from 'react-native-uuid';

const GUID = uuid.v4();

const INITIALINPUT = {
  userNumber: '',
  userPassword: '',
};

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [loading, setLoading] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const passwordInputRef = createRef();

  const dispatch = useDispatch();
  const darktheme = useSelector(state => state.darktheme?.data);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const getfcmToken = async () => {
    let fcmtoken = await AsyncStorage.getItem('token');
    console.log(fcmtoken, 'The old token');
    if (!fcmtoken) {
      try {
        const fcmtoken = await messaging().getToken();
        if (fcmtoken) {
          console.log('new genrated token', fcmtoken);
          setFcmToken(fcmtoken);
          await AsyncStorage.setItem('token', fcmtoken);
        }
      } catch (e) {
        console.log(e);
        // alert(e);
      }
    } else {
      setFcmToken(fcmtoken);
    }
  };

  useEffect(() => {
    getfcmToken();
    console.log({darktheme});
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    const emptyNumber = ValueEmpty(inputs?.userNumber);
    const validNumber = ValidateMobile(inputs?.userNumber);
    const emptyPassword = ValueEmpty(inputs?.userPassword);
    const validPassword = ValidatePassword(inputs?.userPassword);

    let isValid = true;
    if (emptyNumber) {
      handleError('*Required', 'userNumber');
      isValid = false;
    } else if (validNumber != 'success') {
      handleError(validNumber, 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }
    if (emptyPassword) {
      handleError('*Required', 'userPassword');
      isValid = false;
    } else if (validPassword != 'success') {
      handleError(validPassword, 'userPassword');
      isValid = false;
    } else {
      handleError('', 'userPassword');
    }
    if (isValid) {
      handleSubmitPress();
    }
  };

  const handleSubmitPress = async () => {
    const userIdType = 'Phone';
    const reqData = {
      iDentity: inputs.userNumber,
      iIdType: userIdType,
      iPassKey: inputs.userPassword,
      iRememberMe: true,
      deviceToken: fcmToken,
    };

    setLoading(true);
    try {
      const url = API.LOGIN;
      console.log({url, reqData});
      const result = await postApi(url, reqData);
      console.log('result', result.data, 'check result');
      if (result?.data?.IsSuccessed) {
        const data = result?.data;
        await AsyncStorage.setItem('accessToken', data?.accessToken);
        await AsyncStorage.setItem('ZRID', data?.response?.ZRID); //GUID
        await AsyncStorage.setItem('GUID', GUID); 
        setLoading(false);
        dispatch(setLogin(data));
        dispatch(updateLogin(true));
        setInputs(INITIALINPUT);
        navigation.navigate('DrawerNavigationRoutes');
      } else {
        setLoading(false);
        console.log('no singup');
        alert(result?.data?.message);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
      if (e?.status) {
        setTitle('Sorry');
        setSubtitle(e?.data);
        setPopupMessageVisibility(true);
      }
    }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        darktheme={darktheme}
        twoButton={false}
        // onPress_api={deleteComment_handle}
      />
    );
  };

  return (
    <View style={st.container(darktheme)}>
      {/* <ImageBackground
      style={styles.mainBody}
      source={require('../../../assets/images/Images/welcome_back.png')}> */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={st.pd20}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/Images/logo.jpeg')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                marginTop:Platform.OS == 'android'?0:20
              }}
            />
          </View>
          <View style={styles.input}>
            <View style={st.mt_t10}>
              <Input
                label={'Phone Number'}
                onChangeText={text => handleOnchange(text, 'userNumber')}
                onFocus={() => handleError(null, 'userNumber')}
                placeholder="Enter Phone Number"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={10}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                error={errors?.userNumber}
                darktheme={darktheme}
              />
            </View>
            <View style={st.mt_t10}>
              <Input
                label={'Password'}
                onChangeText={text => handleOnchange(text, 'userPassword')}
                onFocus={() => handleError(null, 'userPassword')}
                placeholder="Enter Password"
                placeholderTextColor="#808080"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                password
                darktheme={darktheme}
                error={errors?.userPassword}
              />
              {/* {errors?.userPassword && (
                <Text style={styles.errorTextStyle}>{errors.userPassword}</Text>
              )} */}
            </View>
          </View>

          <TouchableOpacity
            // style={styles.headertextStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('forgotPassword')}>
            <Text
              style={[st.tx14(darktheme), {textAlign: 'right', marginTop: 5}]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <View style={{marginHorizontal: 40, marginTop: 30}}>
            <Authbtn title={'LOGIN'} onPress={validate} />
            <Authbtn
              title={'NEW HERE ? SIGNUP'}
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </View>
        </View>
      </ScrollView>
      {loading && <Loader />}
      {show_alert_msg()}
      {/* </ImageBackground>  */}
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    height: '100%',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
  },

  titleWithShadow: {
    textShadowColor: 'rgba(2, 2, 7, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'Passion One',
  },
  descriptionWithShadow: {
    textShadowColor: 'rgba(4, 5, 7, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: '67%',
    textAlign: 'center',
    width: 200,
    marginTop: 5,
  },
  input: {
    marginTop: 40,
  },
  inputStyle: {
    flex: 1,
    // paddingTop: '10px',
    color: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#000000',
    outline: 'none',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // marginVertical: 15,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
  },
  headertextStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

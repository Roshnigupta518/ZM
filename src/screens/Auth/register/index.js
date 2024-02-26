import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
} from 'react-native';
import st from '../../../global/styles/styles';
import Loader from '../../../components/Loader';
import CheckBox from '@react-native-community/checkbox';
import Authbtn from '../../../components/Authbtn';
import DatePicker from 'react-native-date-picker';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {setSignup} from '../../../redux/reducers/Signup';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../components/input';
import {colors} from '../../../global/theme/Theme';
import {
  ValueEmpty,
  ValidateMobile,
  ValidatePassword,
  ValidateMail,
} from '../../../utils/helperfunctions/validations';
import moment from 'moment';
import Header from '../../../components/header/Header';
import {icon_color} from '../../../utils/helperfunctions';
import {setLogin} from '../../../redux/reducers/Login';
import PopUpMessage from '../../../components/popup';
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_INPUT = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  password: '',
  dob: '', //new Date().toDateString()
  age: '',
  Terms: false,
};
const INITIAL_INPUTErr = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  password: '',
  dob: '',
  age: null,
  Terms: false,
};

const RegisterScreen = ({props, navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const [inputs, setInputs] = useState(INITIAL_INPUT);
  const [inputsErr, setInputsErr] = useState(INITIAL_INPUTErr);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [TermsConditons, setTerms] = React.useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const fnameInputRef = createRef();
  const lnameInputRef = createRef();
  const emailInputRef = createRef();
  const numberInputRef = createRef();
  const dobInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();

  const dispatch = useDispatch();

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setInputsErr(prevState => ({...prevState, [input]: error}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    console.log({inputs});

    const emptyFirstName = ValueEmpty(inputs?.firstName);
    const emptyLastName = ValueEmpty(inputs?.lastName);
    const emptyEmail = ValueEmpty(inputs?.email);
    const emptyPassword = ValueEmpty(inputs?.password);
    const emptyDOB = ValueEmpty(inputs?.dob);
    const validAge = ValueEmpty(inputs?.age);
    const emptyNumber = ValueEmpty(inputs?.number);
    const validPassword = ValidatePassword(inputs?.password);
    const validEmail = ValidateMail(inputs?.email);
    const validNumber = ValidateMobile(inputs?.number);
    const termsValid = inputs?.Terms;

    if (emptyFirstName) {
      handleError('*Required', 'firstName');
      isValid = false;
    } else {
      handleError('', 'firstName');
    }
    if (!termsValid) {
      isValid = false;
      setTerms('Please check terms & conditions');
    } else {
      setTerms('');
    }

    if (emptyLastName) {
      handleError('*Required', 'lastName');
      isValid = false;
    } else {
      handleError('', 'lastName');
    }

    if (emptyEmail) {
      handleError('*Required', 'email');
      isValid = false;
    } else if (validEmail != 'success') {
      handleError(validEmail, 'email');
      isValid = false;
    } else {
      handleError('', 'email');
    }

    if (emptyPassword) {
      handleError('*Required', 'password');
      isValid = false;
    } else if (validPassword != 'success') {
      handleError(validPassword, 'password');
      isValid = false;
    } else {
      handleError('', 'password');
    }

    if (emptyDOB) {
      handleError('*Required', 'dob');
      isValid = false;
    } else {
      handleError('', 'dob');
    }

    if (validAge) {
      handleError('*Required', 'age');
      isValid = false;
    } else if (inputs?.age < 18) {
      isValid = false;
      console.log('Valid user age', inputs?.age);
      handleError('user should be 18+', 'age');
    } else {
      handleError('', 'age');
    }

    if (emptyNumber) {
      handleError('*Required', 'number');
      isValid = false;
    } else if (validNumber != 'success') {
      handleError(validNumber, 'number');
      isValid = false;
    } else {
      handleError('', 'number');
    }

    if (isValid) {
      handleSubmitButton();
      // navigation.navigate('OtpScreen');
    } else {
      console.log('valid');
    }
  };

  const setDateFormet = date => {
    const dob = date.toDateString();
    handleOnchange(dob, 'dob');

    const currentDate = new Date();
    let age = '';
    console.log({currentDate, date});

    let ageDiffrence = currentDate - date;
    let daysOld = Math.floor(ageDiffrence / (1000 * 60 * 60 * 24));
    age = daysOld / 365;

    console.log({ageDiffrence, daysOld, age});
    console.log('age', Math.floor(age));
    const IntAge = Math.floor(age).toString();
    if (IntAge) {
      if (IntAge < 18) {
        console.log('Valid user age', IntAge);
        handleError('user should be 18+', 'age');
      } else {
        handleError('', 'age');
      }
      handleOnchange(IntAge, 'age');
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

  // const getfcmToken = async () => {
  //   let fcmtoken = await AsyncStorage.getItem('token');
  //   console.log(fcmtoken, 'The old token');

  //   if (!fcmtoken) {
  //     try {
  //       const fcmtoken = await messaging().getToken();
  //       if (fcmtoken) {
  //         console.log('new genrated token', fcmtoken);
  //         setFcmToken(fcmtoken);
  //         await AsyncStorage.setItem('token', fcmtoken);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       // alert(e);
  //     }
  //   } else {
  //     setFcmToken(fcmtoken);
  //   }
  // };

  useEffect(() => {
    //getfcmToken();
  }, []);

  const handleSubmitButton = async () => {
    setLoading(true);

    const register_data = {
      imRegFName: inputs.firstName,
      imRegLName: inputs.lastName,
      imRegIdentityId: inputs.number,
      imRegEmail: inputs.email,
      imRegPassword: inputs.password,
      imRegIdType: 'Phone',
      imRegDob: inputs.dob,
      deviceTokenId: fcmToken,
    };

    const reqData = {
      mobile: inputs.number,
      fullName: inputs.firstName + inputs.lastName,
    };
    // const url = API.SIGNUP;
    const url = API.OTP_SEND;
    try {
      const result = await postApi(url, reqData);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        setLoading(false);
        if ((data[1] = 'Success')) {
          navigation.navigate('OtpScreen', {register_data});
          // dispatch(setLogin(data));
          // setInputs(INITIAL_INPUT);
        } else {
          setTitle('Sorry');
          setSubtitle(data[1]);
          setPopupMessageVisibility(true);
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  if (isRegistraionSuccess) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}
        source={require('../../../assets/images/Images/welcome_back.png')}>
        <Text style={styles.successTextStyle}>OTP to verify</Text>

        <TextInput style={styles.otpInputStyle} placeholder="Enter OTP" />
        <View style={{marginHorizontal: 50, marginTop: 50}}>
          <Authbtn
            title={'Enter OTP'}
            onPress={() => navigation.navigate('ProfilePictureScreen')}
          />
        </View>
      </ImageBackground>
    );
  }
  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Register'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/Images/logo.jpeg')}
            style={{
              width: 150,
              height: 100,
              resizeMode: 'contain',
              marginTop: 10,
            }}
          />
        </View>
        <View style={[st.pd_H20, st.mt_t15]}>
          <KeyboardAvoidingView enabled>
            <View style={[st.row]}>
              <View style={st.wdh48}>
                <Input
                  onChangeText={text => handleOnchange(text, 'firstName')}
                  onFocus={() => handleError(null, 'firstName')}
                  underlineColorAndroid="#f000"
                  placeholder="Enter First Name"
                  placeholderTextColor="#808080"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    fnameInputRef.current && fnameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  error={inputsErr?.firstName}
                  darktheme={darktheme}
                />
              </View>
              <View style={[st.wdh48, st.ml_15]}>
                <Input
                  onChangeText={text => handleOnchange(text, 'lastName')}
                  onFocus={() => handleError(null, 'lastName')}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Last Name"
                  placeholderTextColor="#808080"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    lnameInputRef.current && lnameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  error={inputsErr?.lastName}
                  darktheme={darktheme}
                />
              </View>
            </View>

            <View style={[st.row]}>
              <View style={st.wdh48}>
                <Input
                  onChangeText={text => handleOnchange(text, 'number')}
                  onFocus={() => handleError(null, 'number')}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#808080"
                  maxLength={10}
                  keyboardType={'number-pad'}
                  ref={numberInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    numberInputRef.current && numberInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  error={inputsErr?.number}
                  darktheme={darktheme}
                />
              </View>

              <View style={[st.wdh48, st.ml_15]}>
                <View style={styles.inputdobStyle}>
                  <Text
                    style={{
                      color: inputs?.dob ? '#000' : '#808080',
                    }}
                    onPress={() => setOpen(true)}>
                    {inputs?.dob ? inputs?.dob : 'Enter DOB'}
                  </Text>

                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={'date'}
                    onConfirm={dateResp => {
                      setOpen(false);
                      setDate(dateResp);
                      setDateFormet(dateResp);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    maximumDate={moment()}
                    textColor={colors.skyblue}
                    // maximumDate={moment()?.subtract(5, 'years')}
                  />
                </View>
                {(inputsErr?.dob || inputsErr?.age) && (
                  <Text style={[st.tx12(darktheme), {color: colors.danger}]}>
                    {inputsErr?.dob || inputsErr?.age}
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Input
                onChangeText={text => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#808080"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
                error={inputsErr?.email}
                darktheme={darktheme}
              />
            </View>

            <View></View>

            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#808080"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
              error={inputsErr?.password}
              password
              darktheme={darktheme}
            />

            <View style={styles.termsStyles}>
              <CheckBox
                value={checked}
                onValueChange={value => {
                  setChecked(value);
                  handleOnchange(value, 'Terms');
                }}
                color={icon_color(darktheme)}
                tintColors={{color: icon_color(darktheme)}}
              />
              <Text style={[st.tx14(darktheme), {marginTop: 5}]}>
                By clicking signup, you agree to our{' '}
                <Text
                  onPress={() => navigation.navigate('Terms')}
                  style={[st.txDecor, st.txbold, {color: colors.blue}]}>
                  Terms of service
                </Text>{' '}
                and that you have read our{' '}
                <Text
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                  style={[st.txDecor, st.txbold, {color: colors.blue}]}>
                  Privacy Policy.
                </Text>
              </Text>
            </View>
            {TermsConditons && (
              <Text style={{color: colors.danger, fontSize: 12}}>
                {TermsConditons}
              </Text>
            )}

            <View style={{marginHorizontal: 50, marginTop: 50}}>
              <Authbtn
                title={'REGISTER'}
                onPress={() => {
                  validate();
                  // alert('hi')
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      {loading && <Loader />}
      {show_alert_msg()}
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#307ecc',
  },

  inputdobStyle: {
    backgroundColor: colors.light,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 48,
    justifyContent: 'center',
  },
  successTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  otpInputStyle: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    margin: 4,
    marginLeft: 70,
    height: 40,
    width: 250,
  },
  termsStyles: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginRight: 15,
  },
});

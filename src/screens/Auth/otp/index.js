import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, BackHandler, Button} from 'react-native';
import Header from '../../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import st from '../../../global/styles/styles';
import Authbtn from '../../../components/Authbtn';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {colors} from '../../../global/theme/Theme';
import PopUpMessage from '../../../components/popup';
import Loader from '../../../components/Loader';
import {updateLogin} from '../../../redux/reducers/Login';
import BackgroundTimer from 'react-native-background-timer';

export default function OtpScreen({navigation}) {
  const [code, setOtp] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [timerOn, setTimerOn] = useState(true);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer();
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const resendOtpHandle = async () => {
    const reqData = {
      iDentity: '', //number
    };
    const url = API.OTPActResend;
    try {
      setLoading(true);
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({resendOtpHandle: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        setMsg(data?.message[1]);
        setTimerOn(true)
        setSecondsLeft(5)
        startTimer()
      } else {
        setLoading(false);
        setMsg('');
      }
    } catch (e) {
      console.log(e);
      setMsg('');
      setLoading(false);
    }
  };

  const otpVarify_handle = async () => {
    if (code) {
      const reqData = {
        // iDentity: 'string', // number
        iPhoneOTP: code,
        iOTPMode: 'Phone',
      };
      const url = API.OtpVarify;
      try {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);
        console.log({result: result.data});
        if (result.status == 200) {
          const data = result.data;
          if (data.ResponseId == -1) {
            setPopupMessageVisibility(true);
            setTitle('Sorry');
            setSubtitle('This otp is not valid, Please try to resend otp');
          } else if (data.ResponseId == -2) {
            setPopupMessageVisibility(true);
            setTitle('Sorry');
            setSubtitle('This otp is expired, Please try to resend otp');
          } else {
            navigation.navigate('ProfilePictureScreen');
            dispatch(updateLogin(true));
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      alert('Please enter the otp');
    }
  };

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
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
      <Header
        title={'OTP'}
        onPress={() => BackHandler.exitApp()}
        darktheme={darktheme}
      />
      <View style={[st.pd20]}>
        <Text style={[st.tx14(darktheme), st.txAlignC]}>{msg}</Text>
        <View>
          <Text style={[st.tx14_s(darktheme), st.txAlignC]}>
            OTP to verify Z-
          </Text>

          <OTPInputView
            style={{width: '100%', height: 100}}
            pinCount={6}
            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => {
              setOtp(code);
            }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[
              styles.underlineStyleBase(darktheme),
              st.tx18(darktheme),
            ]}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />

          <Text style={styles.time}></Text>

          <View style={st.mt_t15}>
            <View style={[st.align_E]}>
              <Text style={st.tx12(darktheme)}>
                {' '}
                {clockify().displayMins}: {clockify().displaySecs}
                {'  '}
                <Text
                  onPress={() => {
                    if (
                      clockify().displayMins == '00' &&
                      clockify().displaySecs == '00'
                    ) {
                      resendOtpHandle();
                    }else{
                      console.log('button disable')
                    }
                  }}
                  style={[
                    st.tx14_menu,
                    st.txAlignR,
                    {
                      color:
                        clockify().displayMins == '00' &&
                        clockify().displaySecs == '00'
                          ? colors.skyblue
                          : colors.grey,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {'Resend Otp'}
                </Text>
              </Text>
            </View>
          </View>

          <Authbtn
            title={'Submit'}
            onPress={() => {
              otpVarify_handle();
            }}
          />
        </View>
      </View>
      {show_alert_msg()}
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 20,
    height: 50,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: darktheme => ({
    width: 43,
    height: 50,
    borderWidth: 2,
    borderColor: darktheme === 'dark' ? '#000' : '#fff',
    borderRadius: 5,
  }),

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

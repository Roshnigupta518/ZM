import React, {useState, createRef} from 'react';
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
} from 'react-native';
// import Loader from '../../../components/Loader';
import Authbtn from '../../../../components/Authbtn';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../../components/input';
import st from '../../../../global/styles/styles';
import {API} from '../../../../utils/endpoints';
import {postApi} from '../../../../utils/apicalls';
import {
  ValueEmpty,
  ValidateMail,
  ValidateMobile,
} from '../../../../utils/helperfunctions/validations';
import PopUpMessage from '../../../../components/popup';
import Toast from 'react-native-simple-toast';

export default function AccountInformation({navigation}) {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(login_data?.response?.ZRMN);
  const [numberErr, setNumberErr] = useState('');
  const [numberStatus, setNumberStatus] = useState(false);

  const [email, setEmail] = useState(login_data?.response?.ZRED);
  const [emailErr, setEmailErr] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);

  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [label, setLabel] = useState('');

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate_email = async () => {
    Keyboard.dismiss();

    const emptyEmail = ValueEmpty(email);
    const validEmail = ValidateMail(email);

    let isValid = true;

    if (emptyEmail) {
      setEmailErr('*Required');
      isValid = false;
    } else if (validEmail != 'success') {
      setEmailErr(validEmail);
      isValid = false;
    } else {
      setEmailErr('');
    }
    if (isValid) {
      setLabel('email');
      setTitle('Change Email?');
      setSubtitle('Are you sure you want to change your email address!');
      setPopupMessageVisibility(!popupMessageVisibility);
    }
  };

  const validate = async () => {
    Keyboard.dismiss();
    const emptyNumber = ValueEmpty(number);
    const validNumber = ValidateMobile(number);

    let isValid = true;
    if (emptyNumber) {
      setNumberErr('*Required');
      isValid = false;
    } else if (validNumber != 'success') {
      setNumberErr(validNumber);
      isValid = false;
    } else {
      setNumberErr('');
    }

    if (isValid) {
      setLabel('phone');
      setTitle('Change Phone?');
      setSubtitle('Are you sure you want to change your phone number!');
      setPopupMessageVisibility(!popupMessageVisibility);
    }
  };

  const mobileUpdate = async () => {
    const url = API.Phoneupdate;
    const param = {
      iuserphone: number,
      imIdType: 'Phone',
    };
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        if (data.ResponseId == -1) {
          setNumberErr(data.MessageText);
        } else {
          Toast.show(data.MessageText);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const emailUpdateHandle = async () => {
    const url = API.UPDATE_EMAIL;
    const param = {
      iuseremail: email,
      imIdType: 'phone',
    };
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        // if (data.ResponseId == -1) {
        //   setNumberErr(data.MessageText);
        // } else {
        //   Toast.show(data.MessageText);
        // }
      }
    } catch (e) {
      console.log(e);
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
        twoButton={true}
        onPress_api={() => {
          if (label == 'phone') {
            mobileUpdate();
          } else {
            emailUpdateHandle();
          }
        }}
      />
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={st.pd20}>
          <View>
            <View style={st.mt_t10}>
              <Input
                label={'Your Mobile'}
                onChangeText={text => {
                  setNumber(text);
                  if (text) {
                    setNumberStatus(true);
                  } else {
                    setNumberStatus(false);
                  }
                }}
                placeholder="Edit number"
                placeholderTextColor="#808080"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                value={number}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                darktheme={darktheme}
                error={numberErr}
              />
              {numberStatus && (
                <View style={[st.row, st.justify_S, st.mt_v]}>
                  <Authbtn
                    title={'Update'}
                    onPress={() => {
                      validate();
                    }}
                  />
                  <Authbtn
                    title={'Cancel'}
                    onPress={() => {
                      setNumberStatus(false);
                    }}
                  />
                </View>
              )}
            </View>

            <View style={st.mt_t10}>
              <Input
                label={'Your Email'}
                // onChangeText={text => handleOnchange(text, 'email')}
                // onFocus={() => handleError(null, 'email')}
                onChangeText={text => {
                  setEmail(text);
                  if (text) {
                    setEmailStatus(true);
                  } else {
                    setEmailStatus(false);
                  }
                }}
                placeholder="Edit Email"
                placeholderTextColor="#808080"
                autoCapitalize="none"
                returnKeyType="next"
                value={email}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                error={emailErr}
                darktheme={darktheme}
              />
              {emailStatus && (
                <View style={[st.row, st.justify_S, st.mt_v]}>
                  <Authbtn
                    title={'Update'}
                    onPress={() => {
                      validate_email();
                    }}
                  />
                  <Authbtn
                    title={'Cancel'}
                    onPress={() => {
                      setEmailStatus(false);
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {show_alert_msg()}
      </ScrollView>
    </View>
  );
}

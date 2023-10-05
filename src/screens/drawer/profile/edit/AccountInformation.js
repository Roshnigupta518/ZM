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

const INITIAL_INPUT = {
  number: '',
  email: '',
};

export default function AccountInformation({navigation}) {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const [inputs, setInputs] = useState(INITIAL_INPUT);
  const [errors, setErrors] = useState(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(login_data?.user?.ZRMN);
  const [numberErr, setNumberErr] = useState('');
  const [numberStatus, setNumberStatus] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    const emptyNumber = ValueEmpty(number);
    const validNumber = ValidateMobile(number);
    // const emptyEmail = ValueEmpty(inputs?.email);
    // const validEmail = ValidateMail(inputs?.email);

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
    // if (emptyEmail) {
    //   handleError('*Required', 'email');
    //   isValid = false;
    // } else if (validEmail != 'success') {
    //   handleError(validEmail, 'email');
    //   isValid = false;
    // } else {
    //   handleError('', 'email');
    // }
    if (isValid) {
      // mobileUpdate();
      setTitle('Change Phone?');
      setSubtitle('Are you sure you want to change your phone number!');
      setPopupMessageVisibility(!popupMessageVisibility);
    } else {
      console.log({validNumber});
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
        onPress_api={mobileUpdate}
      />
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={st.pd20}>
          <View>
            {/* <Text style={[st.tx18(darktheme), st.txAlignC, st.pd20]}>Account Information</Text> */}
            <View style={st.mt_t10}>
              <Input
                label={'Your Mobile'}
                // onChangeText={text => handleOnchange(text, 'number')}
                // onFocus={() => handleError(null, 'number')}
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
                onChangeText={text => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                placeholder="Edit Email"
                placeholderTextColor="#808080"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                value={inputs.email}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                error={errors?.email}
                darktheme={darktheme}
              />
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
                    validate();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        {show_alert_msg()}
      </ScrollView>
      {/* <View style={st.pd20}>
        <Authbtn
          title={'Save'}
          onPress={() => {
            validate();
          }}
        />
      </View> */}
    </View>
  );
}

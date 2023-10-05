import {StyleSheet, Text, View, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../../components/input';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Authbtn from '../../../components/Authbtn';
import {
  ValueEmpty,
  ValidatePassword,
} from '../../../utils/helperfunctions/validations';
import {useDispatch, useSelector} from 'react-redux';

const INITIALINPUT = {
  userPassword: '',
};

const ChangePassword = ({navigation, route}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [loading, setLoading] = useState(false);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const UserNewCode = route?.params?.UserNewCode

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate = async () => {
    Keyboard.dismiss();

    const emptyPassword = ValueEmpty(inputs?.userPassword);
    const validPassword = ValidatePassword(inputs?.userPassword);

    let isValid = true;

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
    const reqData = {
      iPassword: inputs?.userPassword,
      iUserCode: UserNewCode,
      iCodeMode: 'phone',
      iNumUniqs: '',
    };

    setLoading(true);
    try {
      const url = API.PasswordConfirm;
      console.log({url, reqData});
      const result = await postApi(url, reqData);
      console.log({changePassword:result.data})
      if (result.status == 200) {
        navigation.navigate('LoginScreen');
        setInputs(INITIALINPUT);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Change Password'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <View style={st.pd20}>
        <View style={st.mt_t10}>
          <Input
            label={'New Password'}
            onChangeText={text => handleOnchange(text, 'userPassword')}
            onFocus={() => handleError(null, 'userPassword')}
            placeholder="Enter New Password"
            placeholderTextColor="#808080"
            onSubmitEditing={Keyboard.dismiss}
            password
            darktheme={darktheme}
            error={errors?.userPassword}
          />
        </View>

        <View style={{marginHorizontal: 40, marginTop: 30}}>
          <Authbtn
            title={'Submit'}
            onPress={() => {
              validate();
              // navigation.navigate('LoginScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

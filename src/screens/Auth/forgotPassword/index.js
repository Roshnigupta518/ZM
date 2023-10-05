import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import Authbtn from '../../../components/Authbtn';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../components/input';
import Header from '../../../components/header/Header';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Loader from '../../../components/Loader';
import {
  ValueEmpty,
  ValidateMobile,
} from '../../../utils/helperfunctions/validations';

const INITIALINPUT = {
  userNumber: '',
};
export default function ForgotPassword({navigation}) {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [loading, setLoading] = useState(false);
  const darktheme = useSelector(state => state.darktheme?.data);

  useEffect(() => {}, []);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    const emptyNumber = ValueEmpty(inputs?.userNumber);
    const validNumber = ValidateMobile(inputs?.userNumber);

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

    if (isValid) {
      forgot_handle();
    }
  };

  const forgot_handle = async () => {
    const reqData = {
      iDentity: inputs.userNumber,
      iIdType: 'Phone',
    };
    const url = API.Forgot;
    try {
      setLoading(true);
      const result = await postApi(url, reqData);
      console.log({result: result.data});
      if (result.status == 200) {
        if(result.data.IsSuccessed){
        const data = result.data;
        navigation.navigate('forgotPasswordOtp', {number: inputs?.userNumber, hash:data.response});
        setLoading(false);
        setInputs(INITIALINPUT)
      }
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={[st.container(darktheme)]}>
      <Header
        title={'Forgot Password'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <View style={[st.pd20, st.flex, st.justify_C]}>
        <Input
          // onChangeText={text => setChangeNumber(text)}
          onChangeText={text => handleOnchange(text, 'userNumber')}
          onFocus={() => handleError(null, 'userNumber')}
          placeholder="Enter Phone Number"
          keyboardType="numeric"
          darktheme={darktheme}
          placeholderTextColor="#808080"
          maxLength={10}
          error={errors?.userNumber}
        />
        <View style={{marginTop: 30}}>
          <Authbtn
            title={'Submit'}
            onPress={() => {
              validate();
              // navigation.navigate('forgotPasswordOtp',{number:inputs?.userNumber});
            }}
          />
        </View>
      </View>
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#307ecc',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  otpInputStyle: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    margin: 4,
    marginLeft: 55,
    height: 40,
    width: 250,
  },
  title: {
    fontWeight: '1600',
    fontSize: 28,
    marginBottom: 20,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: '64',
  },
  successTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: '#87CEEB',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    margin: 4,
  },
});

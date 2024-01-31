import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Authbtn from '../../../components/Authbtn';
import st from '../../../global/styles/styles';
import Header from '../../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../global/theme/Theme';
import {icon_color} from '../../../utils/helperfunctions';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls';
import Input from '../../../components/input';
import {ValueEmpty} from '../../../utils/helperfunctions/validations';
import Toast from 'react-native-simple-toast';

const INITIAL_INPUT = {
  userBio: '',
};

export default function BioScreen({navigation, route}) {
  const [inputs, setInputs] = useState(INITIAL_INPUT);
  const [inputsErr, setInputsErr] = useState(INITIAL_INPUT);
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const initVal = route?.params?.data;

  console.log({initVal});

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setInputsErr(prevState => ({...prevState, [input]: error}));
  };
  console.log({token: login_data.accessToken});

  const bioHandle = async () => {
    const url = API.UserBio;
    const reqData = {
      iBio: inputs.userBio,
    };
    try {
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        if (initVal == true) {
          Toast.show(data?.message[1], Toast.LONG);
          navigation.goBack();
        } else {
          navigation.navigate('SuggestionScreen');
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const validBio = ValueEmpty(inputs?.userBio);
    if (validBio) {
      isValid = false;
      handleError('*Required', 'userBio');
    } else {
      handleError('', 'userBio');
    }

    if (isValid) {
      bioHandle();
    }
  };

  const getBiohandle = async () => {
    const url = API.GET_BIO + login_data?.response.ZRID;

    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        console.log({getBiohandle: data});
        const biodata = {userBio: data?.BIO}
        setInputs(biodata);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBiohandle();
  }, []);

  return (
    <View style={[st.container(darktheme)]}>
      {!initVal == true && (
        <Header
          title={'Add Bio'}
          onPress={() => navigation.goBack()}
          darktheme={darktheme}
          onEditHandle={validate}
          edit={true}
        />
      )}

      <View style={[st.pd20]}>
        <Text style={[st.tx18(darktheme), st.txAlignC]}>Describe yourself</Text>

        <Text style={[st.tx14_s(darktheme), st.txAlignC]}>
          What's special about you? Describe yourSelf.
        </Text>
        <View style={{marginTop: 40}}>
          <Input
            onChangeText={text => handleOnchange(text, 'userBio')}
            onFocus={() => handleError(null, 'userBio')}
            placeholder={'Write something about you'}
            placeholderTextColor="#808080"
            error={inputsErr?.userBio}
            darktheme={darktheme}
            multiline
            value={inputs?.userBio}
          />
        </View>
      </View>
      {initVal == true && (
        <View style={st.align_C}>
          <Authbtn title={'Add Bio'} onPress={() => validate()} />
        </View>
      )}
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
  successTextStyle: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '14%',
    marginTop: '5%',
  },
  successTextStyleHead: {
    marginLeft: '30%',
    marginBottom: '5%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  bioInputStyle: darktheme => ({
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    color: darktheme === 'dark' ? colors.black : colors.white,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    // margin: 4,
    // marginLeft: 55,
    // height: 70,
    // width: 250,
    textAlign: 'center',
    margin: 20,
  }),
});

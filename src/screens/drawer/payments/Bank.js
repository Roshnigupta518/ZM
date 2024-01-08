import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles/styles';
import Header from '../../../components/header/Header';
import {useSelector} from 'react-redux';
import Input from '../../../components/input';
import Authbtn from '../../../components/Authbtn';
import {
  ValueEmpty,
  ValidateMobile,
} from '../../../utils/helperfunctions/validations';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls';
import PopUpMessage from '../../../components/popup';
import RadioButton from '../report/RadioButton';

const INITIALINPUT = {
  name: '',
  account: '',
  number: '',
  ifsc: '',
  code: '',
  type: '',
  relation: '',
  bank: '',
  bankId: 0,
};

const UPI = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const bank_details = route?.params?.details;
  const edit = route?.params?.edit;

  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [selectedOption, setSelectedOption] = useState(1);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [options, setOptions] = useState(custom_op);
  const [details, setDetails] = useState();
  const [showBank, setShowBank] = useState();

  const onSelect = item => {
    if (selectedOption && selectedOption.id === item.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    navigation.goBack();
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
      />
    );
  };

  const validation = () => {
    const emptyName = ValueEmpty(inputs?.name);

    const emptyNumber = ValueEmpty(inputs?.number);
    const validNumber = ValidateMobile(inputs?.number);
    const emptyAccountNum = ValueEmpty(inputs?.account);
    const emptyIFSC = ValueEmpty(inputs.ifsc);
    const emptyCode = ValueEmpty(inputs?.code);

    let isValid = true;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const amountRegex = /^\d+(\.\d{1,2})?$/;
    const accountNumberRegex = /^\d+$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const zipCodeRegex = /^[1-9][0-9]{5}$/;

    if (emptyNumber) {
      handleError('*Required', 'number');
      isValid = false;
    } else if (validNumber != 'success') {
      handleError(validNumber, 'number');
      isValid = false;
    } else {
      handleError('', 'number');
    }

    if (emptyName) {
      handleError('*Required', 'name');
      isValid = false;
    } else if (!nameRegex.test(inputs?.name)) {
      handleError(
        'Please enter a valid account holder name (only letters and spaces allowed)',
        'name',
      );
      isValid = false;
    } else {
      handleError('', 'name');
    }

    if (emptyCode) {
      handleError('*Required', 'code');
      isValid = false;
    } else if (!zipCodeRegex.test(inputs?.code)) {
      handleError('Please enter a valid ZIP code.', 'code');
    } else {
      handleError('', 'code');
    }

    if (emptyAccountNum) {
      handleError('*Required', 'account');
      isValid = false;
    } else if (!accountNumberRegex.test(inputs?.account)) {
      handleError(
        'Invalid account number. Please enter a numeric value.',
        'account',
      );
      isValid = false;
    } else {
      handleError('', 'account');
    }

    if (!selectedOption) {
      handleError('*Required', 'type');
      isValid = false;
    } else if (selectedOption?.id == 1) {
      if (inputs?.relation) {
        handleError('', 'relation');
      } else {
        handleError('*Required', 'relation');
      }
    } else if (selectedOption?.id != 1) {
      handleOnchange('', 'relation');
    } else {
      handleError('', 'type');
    }

    if (emptyIFSC) {
      handleError('*Required', 'ifsc');
      isValid = false;
    } else if (!ifscRegex.test(inputs?.ifsc)) {
      handleError('Invalid IFSC code. Please enter a valid code.', 'ifsc');
      isValid = false;
    } else {
      handleError('', 'ifsc');
    }

    console.log({errors});
    if (isValid) {
      handleSubmitPress();
    }
  };

  const getZipCode = async val => {
    const url = 'https://api.postalpincode.in/pincode/' + val;

    try {
      const result = await getApi(url);
      console.log({zipcode: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        if (data.length > 0) {
          if (data[0].Status == 'Success') {
            const temp = data[0].PostOffice;
            const mydata = temp[0];
            console.log({mydata});
            setDetails(mydata);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBankName = async val => {
    const url = 'https://ifsc.razorpay.com/' + val;
    try {
      const result = await getApi(url);
      console.log({bankName: result.data});
      if (result.status == 200) {
        const data = result.data; //BANK
        handleOnchange(data.BANK, 'bank');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitPress = async () => {
    const url = API.UPI_PAY;
    const param = {
      Id: inputs?.bankId,
      UserId: login_data.response.ZRID,
      MobileNumber: inputs?.number,
      AccountHolderName: inputs?.name,
      AccountNumber: inputs?.account,
      IFSCCode: inputs?.ifsc,
      State: details?.State,
      Address: details?.District,
      City: details?.District,
      ZipCode: inputs?.code,
      SelfOther: selectedOption?.value,
      bankName: inputs?.bank,
      relation: inputs?.relation,
    };

    console.log({param});
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({addBank: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        setSubtitle(data[1]);
        setPopupMessageVisibility(true);
        setTitle('Congratulations');
        setInputs(INITIALINPUT);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBankDetails = () => {
    const data = bank_details;
    console.log({bank_details: data});
    const mydata = {
      name: data.ACCOUNT_HOLDER_NAME,
      account: data.ACCOUNT_NUMBER,
      number: data.MOBILENUMBER,
      ifsc: data.IFSC_CODE,
      code: data.ZIP_CODE,
      type: data.SELF_OTHER == 'Self' ? 0 : 1,
      relation: data.RELATION,
      bank: data.BANKNAME,
      bankId: data.ID,
    };
    const relation =
      data.SELF_OTHER == 'Self'
        ? {id: 0, value: 'Self'}
        : {id: 1, value: 'Other'};
    setSelectedOption(relation);
    setShowBank(true)
    setInputs(mydata);
  };

  useEffect(() => {
    getBankDetails();
  }, []);

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Add Bank Account'}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <Input
            label={'Account holder Name'}
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            underlineColorAndroid="#f000"
            error={errors?.name}
            darktheme={darktheme}
            value={inputs?.name}
          />

          <Input
            label={'Account Number'}
            onChangeText={text => handleOnchange(text, 'account')}
            onFocus={() => handleError(null, 'account')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            underlineColorAndroid="#f000"
            error={errors?.account}
            darktheme={darktheme}
            value={inputs?.account}
            keyboardType="numeric"
          />

          <Input
            label={'IFSC'}
            onChangeText={text => {
              handleOnchange(text, 'ifsc');
              getBankName(text);
            }}
            onFocus={() => handleError(null, 'ifsc')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            underlineColorAndroid="#f000"
            error={errors?.ifsc}
            darktheme={darktheme}
            value={inputs?.ifsc}
            onEndEditing={() => setShowBank(true)}
          />

          {showBank && inputs?.bank && (
            <Input
              label={'Bank Name'}
              onChangeText={text => handleOnchange(text, 'bank')}
              onFocus={() => handleError(null, 'bank')}
              placeholder="Enter here"
              placeholderTextColor="#808080"
              underlineColorAndroid="#f000"
              error={errors?.bank}
              darktheme={darktheme}
              value={inputs?.bank}
              editable={false}
            />
          )}

          <Input
            label={'Mobile Number'}
            onChangeText={text => handleOnchange(text, 'number')}
            onFocus={() => handleError(null, 'number')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            underlineColorAndroid="#f000"
            error={errors?.number}
            darktheme={darktheme}
            value={inputs?.number}
            maxLength={10}
            keyboardType="numeric"
          />

          <Input
            label={'Zip Code'}
            onChangeText={text => {
              handleOnchange(text, 'code');
              getZipCode(text);
            }}
            onFocus={() => handleError(null, 'code')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            underlineColorAndroid="#f000"
            error={errors?.code}
            darktheme={darktheme}
            value={inputs?.code}
          />

          <Text style={st.tx16(darktheme)}>Relation</Text>
          <RadioButton
            selectedOption={selectedOption}
            onSelect={item => {
              onSelect(item);
              handleError(null, 'type');
            }}
            options={options}
          />
          {errors?.type && <Text style={st.error}>{errors?.type}</Text>}

          {selectedOption?.id == 1 && (
            <View>
              <Input
                label={''}
                onChangeText={text => {
                  handleOnchange(text, 'relation');
                }}
                onFocus={() => handleError(null, 'relation')}
                placeholder="Enter here"
                placeholderTextColor="#808080"
                underlineColorAndroid="#f000"
                error={errors?.relation}
                darktheme={darktheme}
                value={inputs?.relation}
              />
              <Text style={[st.tx12(darktheme), {marginTop: -10}]}>
                Kindly mention your realtion here.
              </Text>
            </View>
          )}

          <View style={[st.mt_t10, st.align_C]}>
            <Authbtn title={'Submit'} onPress={() => validation()} />
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
    </View>
  );
};

export default UPI;

const styles = StyleSheet.create({});
const custom_op = [
  {id: 0, value: 'Self'},
  {id: 1, value: 'Other'},
];

//note - Mentioned  Phone number should be linked with UPI-ID for smooth payment process.

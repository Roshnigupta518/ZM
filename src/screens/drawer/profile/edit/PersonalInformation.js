import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import st from '../../../../global/styles/styles';
import Authbtn from '../../../../components/Authbtn';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../../components/input';
import {colors} from '../../../../global/theme/Theme';
import {Picker} from '@react-native-picker/picker';
import {arrayState} from '../../../../utils/array';
import {postApi} from '../../../../utils/apicalls';
import {ValueEmpty} from '../../../../utils/helperfunctions/validations';
import {API} from '../../../../utils/endpoints';
import {useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PopUpMessage from '../../../../components/popup';

const INITIAL_INPUT = {
  fname: '',
  mname: '',
  lname: '',
  gender: '',
  dob: '',
  address: '',
  city: '',
  locality: '',
  pincode: '',
  age: '',
};

export default function PersonalInformation({navigation}) {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const UserMeta = useSelector(state => state.UserMeta?.data);

  const [inputs, setInputs] = useState(INITIAL_INPUT);
  const [errors, setErrors] = useState(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState({name: 'India'});
  const [visible, setVisible] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [choosenLabel, setChoosenLabel] = useState();
  const [choosenIndex, setChoosenIndex] = useState();
  const [data, setData] = useState(arrayState);
  const [stateErr, setStateErr] = useState(false);
  const [gender, setGender] = useState();
  const [genderErr, setGenderErr] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const genderData = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onSelect = country => {
    setCountryCode(country?.cca2);
    setCountry(country);
    console.log({country});
  };

  const getUserProfile_handle = async () => {
    const url = API.GetUserProfileData;
    const param = {
      iDentity: '',
    };
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({url, param});
      if (result.status == 200) {
        const tempdata = JSON.parse(result.data.Response);
        console.log('get----------------dataprofile', tempdata)
        let data = null;
        for (let i = 0; tempdata.length > i; i++) {
          let obj = {
            fname: tempdata[i].NICK_NAME,
            mname: tempdata[i].MIDDLE_NAME,
            lname: tempdata[i].LAST_NAME,
            dob: tempdata[i].DOB,
            address: tempdata[i].ADDRESS,
            city: tempdata[i].CITY,
            locality: tempdata[i].LOCALITY,
            pincode: tempdata[i].PINCODE,
          };
          setGender(tempdata[i].GENDER);
          setChoosenLabel(tempdata[i].STATE);
          data = obj;
        }
        console.log({data});
        setInputs(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserProfile_handle();
    // console.log({UserMeta});
  }, []);

  const validation = () => {
    const emptyFname = ValueEmpty(inputs?.fname);
    const emptyLname = ValueEmpty(inputs?.lname);
    const emptyGender = ValueEmpty(gender);
    const emptyDob = ValueEmpty(inputs?.dob);
    const emptyAdderss = ValueEmpty(inputs?.address);
    const emptyState = ValueEmpty(choosenLabel);
    const emptyCity = ValueEmpty(inputs?.city);
    const emptyLocality = ValueEmpty(inputs?.locality);
    const emptyPin = ValueEmpty(inputs?.pincode);

    let isValid = true;
    if (emptyFname) {
      handleError('*Required', 'fname');
      isValid = false;
    } else {
      handleError('', 'fname');
    }

    if (emptyLname) {
      handleError('*Required', 'lname');
      isValid = false;
    } else {
      handleError('', 'lname');
    }

    if (emptyDob) {
      handleError('*Required', 'dob');
      isValid = false;
    } else if (inputs?.age < 18) {
      console.log('Valid user age', inputs?.age);
      isValid = false;
      handleError('user should be 18+', 'age');
    } else {
      handleError('', 'dob');
    }

    if (emptyAdderss) {
      handleError('*Required', 'address');
      isValid = false;
    } else {
      handleError('', 'address');
    }

    if (emptyCity) {
      handleError('*Required', 'city');
      isValid = false;
    } else {
      handleError('', 'city');
    }

    if (emptyLocality) {
      handleError('*Required', 'locality');
      isValid = false;
    } else {
      handleError('', 'locality');
    }

    if (emptyPin) {
      handleError('*Required', 'pincode');
      isValid = false;
    } else {
      handleError('', 'pincode');
    }

    if (emptyState) {
      setStateErr('*Required');
      isValid = false;
    } else {
      setStateErr('');
    }

    if (emptyGender) {
      setGenderErr('*Required');
      isValid = false;
    } else {
      setGenderErr('');
    }

    if (isValid) {
      editPost_handle();
      console.log('sccudd');
    } else {
      console.log('fail');
    }
  };

  const setDateFormet = date => {
    const dob = moment(date).format('DD.MMMM.YYYY');
    handleOnchange(dob, 'dob');
    console.log({monthname: dob});

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
        console.log('InValid user age', IntAge);
        handleError('user should be 18+', 'age');
      } else {
        handleError('', 'age');
      }
      handleOnchange(IntAge, 'age');
    }
  };

  const editPost_handle = async () => {
    const url = API.UserProfileSave;
    const req = {
      first_name: inputs.fname,
      middle_name: inputs.mname,
      last_name: inputs.lname,
      gender: gender,
      dob: inputs.dob,
      school_id: '',
      school_name: '',
      class_id: '',
      class_name: '',
      mobile_no: '',
      email_id: '',
      guardian_name: '',
      guardian_relation: '',
      guardian_mobile: '',
      guardian_email: '',
      guardian_occup: '',
      address: inputs.address,
      country: country?.name,
      state: choosenLabel,
      city: inputs.city,
      locality: inputs.locality,
      pincode: inputs.pincode,
      profile_per: UserMeta.PP,
    };

    try {
      console.log({editPostparams: req});
      const result = await postApi(url, req, login_data?.accessToken);
      console.log({editPost: result.data});
      if (result.status == 200) {
        const data = result.data;
        setTitle(data.MessageStatus);
        setSubtitle(data.MessageText);
        setPopupMessageVisibility(true);
      }
    } catch (e) {
      console.log(e);
    }
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

  return (
    <View style={st.container(darktheme)}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={st.pd20}>
          <View>
            <View>
              <Input
                label={'First Name'}
                onChangeText={text => handleOnchange(text, 'fname')}
                onFocus={() => handleError(null, 'fname')}
                placeholder="Edit First Name"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.fname}
                error={errors?.fname}
              />
            </View>

            <View style={st.mt_t10}>
              <Input
                label={'Middle Name (Optional)'}
                onChangeText={text => handleOnchange(text, 'mname')}
                // onFocus={() => handleError(null, 'mname')}
                placeholder="Edit Middle Name"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.mname}
                // error={errors.mname}
              />
            </View>

            <View style={st.mt_t10}>
              <Input
                label={'Last Name'}
                onChangeText={text => handleOnchange(text, 'lname')}
                onFocus={() => handleError(null, 'lname')}
                placeholder="Edit Last Name"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.lname}
                error={errors.lname}
              />
            </View>
            <View style={st.mt_t10}>
              <Text style={[st.tx16(darktheme)]}>{'Gender'}</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => {
                    setGender(itemValue);
                    setGenderErr('');
                  }}>
                  <Picker.Item label="Select Gender" value="" color="grey" />
                  {genderData.map(item => {
                    return (
                      <Picker.Item value={item.value} label={item.label} />
                    );
                  })}
                </Picker>
              </View>
              <Text style={styles.error}>{genderErr}</Text>
            </View>
            <View style={st.mt_t10}>
              <Text style={[st.tx16(darktheme)]}>{'DOB'}</Text>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={[styles.inputContainer, st.justify_C]}>
                <Text style={st.tx14(darktheme)}>{inputs.dob}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}
                textColor={colors.skyblue}
                onConfirm={dateResp => {
                  setOpen(false);
                  setDate(dateResp);
                  setDateFormet(dateResp);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                maximumDate={moment()}
                // maximumDate={moment()?.subtract(5, 'years')}
              />
            </View>
            {errors?.dob ||
              (errors?.age && (
                <Text style={[st.tx12(darktheme), {color: colors.danger}]}>
                  {errors?.dob || errors?.age}
                </Text>
              ))}

            <View style={st.mt_t10}>
              <Input
                label={'Address'}
                onChangeText={text => handleOnchange(text, 'address')}
                onFocus={() => handleError(null, 'address')}
                placeholder="Edit Address"
                placeholderTextColor="#808080"
                value={inputs?.address}
                error={errors?.address}
                darktheme={darktheme}
              />
            </View>
            <View style={st.mt_t10}>
              <Text style={[st.tx16(darktheme)]}>{'Your Country'}</Text>
              <View
                style={[styles.inputContainer, st.row, st.align_C]}
                onPress={() => {
                  onSelect();
                  setVisible(true);
                }}>
                <CountryPicker
                  {...{
                    countryCode,
                    onSelect,
                    withCallingCode,
                    withAlphaFilter,
                    withFilter,
                  }}
                  visible={visible}
                />
                <Text style={st.tx14(darktheme)}>{country?.name}</Text>
              </View>
            </View>
            <View style={st.mt_t10}>
              <Text style={[st.tx16(darktheme)]}>{'Your State'}</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={choosenLabel}
                  onValueChange={(itemValue, itemIndex) => {
                    setChoosenLabel(itemValue);
                    setChoosenIndex(itemIndex);
                    setStateErr('');
                  }}>
                  <Picker.Item label="Select State" value="" color="grey" />
                  {data.map(item => {
                    return (
                      <Picker.Item value={item.value} label={item.label} />
                    );
                  })}
                </Picker>
              </View>
              <Text style={styles.error}>{stateErr}</Text>
            </View>
            <View style={st.mt_t10}>
              <Input
                label={'Your City'}
                onChangeText={text => handleOnchange(text, 'city')}
                onFocus={() => handleError(null, 'city')}
                placeholder="Edit Your City"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.city}
                error={errors?.city}
              />
            </View>
            <View style={st.mt_t10}>
              <Input
                label={'Your Locality'}
                onChangeText={text => handleOnchange(text, 'locality')}
                onFocus={() => handleError(null, 'locality')}
                placeholder="Edit Your Locality"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.locality}
                error={errors?.locality}
              />
            </View>
            <View style={st.mt_t10}>
              <Input
                label={'Your Pincode'}
                onChangeText={text => handleOnchange(text, 'pincode')}
                onFocus={() => handleError(null, 'pincode')}
                placeholder="Edit Your Pincode"
                placeholderTextColor="#808080"
                darktheme={darktheme}
                value={inputs.pincode}
                error={errors?.pincode}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Authbtn
              title={'Save'}
              onPress={() => {
                validation();
              }}
            />
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    height: '100%',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
  },
  error: {color: colors.danger, fontSize: 12},

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
  inputContainer: {
    backgroundColor: colors.light,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    fontSize: 12,
    // alignItems: 'center',
    height: 50,
  },
});

import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles/styles';
import Header from '../../../components/header/Header';
import {useSelector} from 'react-redux';
import {colors} from '../../../global/theme/Theme';
import Input from '../../../components/input';
import Authbtn from '../../../components/Authbtn';
import {ValueEmpty} from '../../../utils/helperfunctions/validations';
import {getApi, postApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';
import Loader from '../../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {icon_color} from '../../../utils/helperfunctions';
import PopUpMessage from '../../../components/popup';

const INITIALINPUT = {
  amt: '',
};

const Redeem = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const [selectedCard, setSelectedCard] = useState(null);
  const [details, setDetails] = useState([]);
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState();
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();

  const login_data = useSelector(state => state.login?.data);
  const data = route?.params?.data;
  const Payment_Type = route?.params?.Payment_Type;

  const handleCardPress = cardId => {
    // Update the state to reflect the selected card
    setSelectedCard(cardId);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    const emptyAmt = ValueEmpty(inputs?.amt);
    const amountRegex = /^\d+(\.\d{1,2})?$/;
    let isValid = true;

    const myPoint = data?.TOTAL_POINTS - data?.THRESHOLD;
    if (Payment_Type == 1) {
      if (emptyAmt) {
        handleError('*Required', 'amt');
        isValid = false;
      } else if (!amountRegex.test(inputs?.amt)) {
        isValid = false;
        handleError('Please enter a valid numeric amount', 'amt');
      } else if (myPoint > 0) {
        if (parseInt(inputs?.amt) <= myPoint) {
          handleError('', 'amt');
        } else {
          handleError('Invalid', 'amt');
          isValid = false;
        }
      } else {
        handleError('', 'amt');
      }
    }

    if (isValid) {
      handleSubmitPress();
    }
  };

  const handleSubmitPress = async () => {
    const url = API.ADD_PROMOTIONAL;
    const params = {
      userId: login_data.response.ZRID,
      bankId: selectedCard,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url, params, login_data.accessToken);
      console.log({addBank: result.data});
      if (result.status == 200) {
        setIsLoading(false);
        const data = result.data;
        setSubtitle(data[1]);
        setPopupMessageVisibility(true);
        setTitle('Congratulations');
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    const url = API.GET_BACKACC + login_data.response.ZRID;
    try {
      setIsLoading(true);
      const result = await getApi(url, login_data.accessToken);
      console.log({addBank: result.data});
      if (result.status == 200) {
        const data = result.data.reverse();
        const enable = data.some(i =>
          i.IS_BENEFICIARY_VERFIED == 0 ? true : false,
        );
        console.log({enable});
        setIsLoading(false);
        setEnabled(enable);
        setDetails(data);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

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
      <Header
        onPress={() => navigation.goBack()}
        title={''}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View style={st.align_S}>
            <Pressable
              onPress={() => navigation.navigate('UPI')}
              style={[st.bankBtn]}>
              <Icon name={'bank-plus'} size={20} color={colors.white} />
              <Text style={[st.tx14_s(darktheme), {color: colors.white}]}>
                {' Click to add new bank account'}
              </Text>
            </Pressable>
          </View>
          {details?.map((item, index) => {
            return (
              <Pressable
                disabled={item.IS_BENEFICIARY_VERFIED == 0 ? true : false}
                onPress={() => handleCardPress(index)}
                style={[st.row, st.align_C, st.mt_B]}>
                <View style={st.wdh10}>
                  <View style={[styles.circle]}>
                    {selectedCard === index && (
                      <View style={styles.checkedCircle} />
                    )}
                  </View>
                </View>

                <View style={st.wdh90}>
                  <View
                    style={[
                      st.pd20,
                      st.radius,
                      st.bgCardColor(darktheme),
                      st.shadowsty,
                    ]}>
                    <Text style={st.tx14_s(darktheme)}>
                      Account holder name :-{' '}
                      <Text style={st.tx13(darktheme)}>
                        {item.ACCOUNT_HOLDER_NAME}
                      </Text>
                    </Text>
                    <Text style={st.tx14_s(darktheme)}>
                      Account Number :-{' '}
                      <Text style={st.tx13(darktheme)}>
                        {item.ACCOUNT_NUMBER}
                      </Text>
                    </Text>
                    <Text style={st.tx14_s(darktheme)}>
                      IFSC :-{' '}
                      <Text style={st.tx13(darktheme)}>{item.IFSC_CODE}</Text>
                    </Text>

                    <View style={[st.row, st.justify_S]}>
                      <Text style={st.tx14_s(darktheme)}>
                        Status :-{' '}
                        <Text
                          onPress={() =>
                            navigation.navigate('MyCoins', {
                              message:
                                'Your back account varification is in-progress, Please wait 24 hours to complete it',
                            })
                          }
                          style={[
                            st.tx13(darktheme),
                            {
                              color:
                                item.IS_BENEFICIARY_VERFIED == 0
                                  ? colors.danger
                                  : colors.green,
                              textDecorationLine:
                                item.IS_BENEFICIARY_VERFIED == 0
                                  ? 'underline'
                                  : 'none',
                            },
                          ]}>
                          {item.IS_BENEFICIARY_VERFIED == 0
                            ? 'In-Progress'
                            : 'Verified'}
                        </Text>
                      </Text>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('UPI', {
                            edit: true,
                            details: item,
                          })
                        }>
                        <Text style={[st.tx14_s(darktheme), st.txDecor]}>
                          Edit
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}

          <View style={st.mt_t15}></View>
          {Payment_Type == 1 && (
            <Input
              label={'Brainbit'}
              onChangeText={text => handleOnchange(text, 'amt')}
              onFocus={() => handleError(null, 'amt')}
              placeholder="Enter here"
              placeholderTextColor="#808080"
              underlineColorAndroid="#f000"
              error={errors?.amt}
              darktheme={darktheme}
              value={inputs?.amt}
              keyboardType="numeric"
            />
          )}

          <View style={[st.mt_t10, st.align_C]}>
            <Authbtn
              title={'Submit'}
              onPress={() => validation()}
              disabled={enabled}
            />
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loader />}
      {show_alert_msg()}
    </View>
  );
};

export default Redeem;

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skyblue,
  },
});

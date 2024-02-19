import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NavigationDrawerHeader from '../../../components/drawerheader';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import PopUpMessage from '../../../components/popup';
import {icon_color} from '../../../utils/helperfunctions';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';

export default function Coins({navigation}) {
  const [dataSource, setDataSource] = useState();
  const [showPromotional, setShowPromotional] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [data, setData] = useState('');
  const [promotionalData, setPromotionalData] = useState();
  const [Payment_Type, setPayment_Type] = useState();
  const [details, setDetails] = useState([]);
  const [socialStatus, setSocialStatus] = useState();
  const [promoStatus, setPromoStatus] = useState();
  const [actStatus, setActStatus] = useState([]);
  const [infoStatus, setInfoStatus] = useState(false);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];

  const animationX = new Animated.Value(0);
  const inputRangeX = [0, 1];
  const outputRangeX = [1, 0.8];

  const scale = animation.interpolate({inputRange, outputRange});
  const scaleX = animationX.interpolate({
    inputRange: inputRangeX,
    outputRange: outputRangeX,
  });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      friction: 1,
      useNativeDriver: true,
    }).start();
    console.log({scale, animation});
  };

  const onPressInSocial = () => {
    Animated.spring(animationX, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOutSocial = () => {
    Animated.spring(animationX, {
      toValue: 0,
      friction: 1,
      useNativeDriver: true,
    }).start();
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
        twoButton={!infoStatus ? true : false}
        onPress_api={() =>
          navigation.navigate('Redeem', {
            data: data,
            Payment_Type: Payment_Type,
          })
        }
      />
    );
  };

  const getPromotionalPoint = async () => {
    const url = API.PROMOTIONAL_POINT + login_data?.response.ZRID; //12345
    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({pro_point: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        setPromotionalData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitPress = async () => {
    const url = API.SOCIAL_POINT + login_data?.response.ZRID; //12345
    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({social_point: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        setDataSource(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSocialStatusHandle = async () => {
    const url = API.SOCIAL_STATUS + login_data?.response.ZRID; //12345
    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({getSocialStatusHandle: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        setSocialStatus(data[1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPromotionalStatusHandle = async () => {
    const url = API.PROMOTIONAL_STATUS + login_data?.response.ZRID; //12345
    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({getPromotionalStatusHandle: result.data});
      if (result.status == 200) {
        //-----goto
        const data = result.data;
        setPromoStatus(data[1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const url = API.GET_BACKACC + login_data.response.ZRID;

    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({addBank: result.data});
      if (result.status == 200) {
        const data = result.data;
        setDetails(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getActivityStatusHandle = async () => {
    const url = API.ACTIVITY_STATUS + login_data.response.ZRID;

    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({getActivityStatusHandle: result.data});
      if (result.status == 200) {
        const data = result.data;
        setActStatus(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleSubmitPress();
    getPromotionalPoint();
    getData();
    getSocialStatusHandle();
    getPromotionalStatusHandle();
    getActivityStatusHandle();
  }, []);

  return (
    <View style={st.container(darktheme)}>
      <NavigationDrawerHeader
        navigationProps={navigation}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('UPI', {edit: false});
            }}
            style={styles.coinsBox}>
            <View style={st.align_C}>
              <View style={[st.row, st.align_C]}>
                <Text style={[st.tx16(darktheme)]}>
                  {'Add Your Bank Details'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {promotionalData?.SIGNUPREDIMSTATUS != 1 && (
            <Animated.View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => {
                  setShowPromotional(!showPromotional);
                }}
                style={styles.coinsBox}>
                <View style={st.align_C}>
                  <View style={[st.row, st.align_C]}>
                    <Icon
                      name={'rotate-orbit'}
                      size={35}
                      color={icon_color(darktheme)}
                    />
                    <Text style={[st.tx16(darktheme)]}>
                      {'  Promotional Brainbits  '}
                    </Text>
                    <Icon
                      name={'rotate-orbit'}
                      size={35}
                      color={icon_color(darktheme)}
                    />
                  </View>

                  {showPromotional && (
                    <View>
                      <Text
                        style={[st.tx20(darktheme)]}
                        numberOfLines={1}
                        adjustsFontSizeToFit>
                        {promotionalData?.SIGNUPAMOUNT}
                        <Text style={st.tx14_s(darktheme)}>{' Points'}</Text>
                      </Text>
                    </View>
                  )}
                </View>
                {showPromotional && (
                  <View style={[st.row, st.justify_S]}>
                    <TouchableOpacity
                      // disabled={promoStatus != 'Pending' ? false : true}
                      onPressIn={onPressIn}
                      onPressOut={onPressOut}
                      onPress={() => {
                        if (details?.length > 0) {
                          onPopupMessageModalClick(!popupMessageVisibility);
                          setTitle('Are you sure ?');
                          setSubtitle('Do you want to redeem it?');
                          setData(promotionalData);
                          setPayment_Type(0);
                        } else {
                          navigation.navigate('UPI', {edit: false});
                        }
                      }}
                      style={[
                        styles.redeemBtn,
                        // {
                        //   backgroundColor:
                        //     promoStatus != 'Pending'
                        //       ? colors.green
                        //       : colors.grey,
                        // },
                      ]}>
                      <Text
                        style={[st.tx14_s(darktheme), {color: colors.white}]}>
                        Redeem
                      </Text>
                    </TouchableOpacity>

                    <View style={st.mt_t10}>
                      <Text style={[st.tx14_s(darktheme), st.txAlignC]}>
                        Status
                      </Text>
                      <Pressable
                        onPress={() => {
                          if (promoStatus != 'Pending') {
                            navigation.navigate('MyCoins');
                          }
                        }}>
                        <Text
                          style={[
                            st.tx14(darktheme),
                            {
                              color:
                                promoStatus != 'Pending'
                                  ? colors.green
                                  : colors.danger,
                              textDecorationLine:
                                promoStatus != 'Pending' ? 'underline' : 'none',
                            },
                          ]}>
                          {promoStatus}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}

          <Animated.View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPressIn={onPressInSocial}
              onPressOut={onPressOutSocial}
              onPress={() => {
                setShowSocial(!showSocial);
              }}
              style={styles.coinsBox}>
              <View style={st.align_C}>
                <View style={[st.row, st.align_C]}>
                  <Icon
                    name={'rotate-orbit'}
                    size={35}
                    color={icon_color(darktheme)}
                  />
                  <Text style={[st.tx16(darktheme), st.txAlignC, ,]}>
                    Social Media Activity {'\n'} Brainbits
                  </Text>
                  <Icon
                    name={'rotate-orbit'}
                    size={35}
                    color={icon_color(darktheme)}
                  />
                </View>

                {showSocial && (
                  <View>
                    <Text
                      style={[st.tx20(darktheme)]}
                      numberOfLines={1}
                      adjustsFontSizeToFit>
                      {dataSource?.SOCIAL_ACTIVITY_POINT}
                      <Text style={st.tx14_s(darktheme)}>{' Points'}</Text>
                    </Text>
                  </View>
                )}
              </View>

              {showSocial && (
                <View style={[st.row, st.justify_S]}>
                  {dataSource?.TOTAL_POINTS > dataSource?.THRESHOLD && (
                    <TouchableOpacity
                      disabled={socialStatus != 'Pending' ? false : true}
                      onPressIn={onPressInSocial}
                      onPressOut={onPressOutSocial}
                      onPress={() => {
                        if (details?.length > 0) {
                          onPopupMessageModalClick(!popupMessageVisibility);
                          setData(dataSource);
                          setPayment_Type(1);
                        } else {
                          navigation.navigate('UPI', {edit: false});
                        }
                      }}
                      style={[
                        styles.redeemBtn,
                        {
                          backgroundColor:
                            promoStatus != 'Pending'
                              ? colors.green
                              : colors.grey,
                        },
                      ]}>
                      <Text
                        style={[st.tx14_s(darktheme), {color: colors.white}]}>
                        Redeem
                      </Text>
                    </TouchableOpacity>
                  )}
                  {dataSource?.TOTAL_POINTS > dataSource?.THRESHOLD && (
                    <View style={st.mt_t10}>
                      <Text style={[st.tx14_s(darktheme), st.txAlignC]}>
                        Status
                      </Text>
                      <Pressable
                        onPress={() => {
                          if (socialStatus != 'Pending') {
                            navigation.navigate('MyCoins');
                          }
                        }}>
                        <Text
                          style={[
                            st.tx14(darktheme),
                            {
                              color:
                                socialStatus != 'Pending'
                                  ? colors.green
                                  : colors.danger,
                              textDecorationLine:
                                socialStatus != 'Pending'
                                  ? 'underline'
                                  : 'none',
                            },
                          ]}>
                          {socialStatus}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View>
            <Text style={[st.tx12(darktheme)]}>
              Activity Status To Earn Brainbit
            </Text>
          </View>

          <View style={st.mt_t10}>
            <View style={[styles.coinsBox, {backgroundColor: 'transparent'}]}>
              <View style={[st.row, st.justify_S]}>
                <Text style={[st.tx16(darktheme)]}>{'Activity'}</Text>
                <Text style={[st.tx16(darktheme)]}>{'Status'}</Text>
              </View>

              <View style={{borderBottomWidth: 1, borderColor: colors.grey}} />
              {/* {actStatus.map((i,n)=>{ */}
              <View style={[st.row, st.justify_S, st.mt_t10]}>
                <View style={st.row}>
                  <Text style={[st.tx16(darktheme)]}>{'Nuggets'}</Text>
                  <Icon
                    name="information-outline"
                    size={25}
                    color={colors.black}
                    style={st.ml_15}
                    onPress={() => {
                      setInfoStatus(true);
                      setTitle('Information');
                      setSubtitle('Nuggets details showing here');
                      setPopupMessageVisibility(!popupMessageVisibility);
                    }}
                  />
                </View>
                <Icon name="check" size={25} color={colors.green} />
              </View>
              {/* })} */}

              <View style={[st.row, st.justify_S, st.mt_t10]}>
                <Text style={[st.tx16(darktheme)]}>{'Session'}</Text>
                <Icon name="check" size={25} color={colors.green} />
              </View>

              <View style={[st.row, st.justify_S, st.mt_t10]}>
                <Text style={[st.tx16(darktheme)]}>{'Quiz'}</Text>
                <Entypo name="cross" size={25} color={colors.danger} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
    </View>
  );
}

const styles = StyleSheet.create({
  coinsBox: {
    // backgroundColor: colors.skyblue,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0.3},
    shadowOpacity: 0.6,
    shadowRadius: 0.4,
    borderWidth: 0.6,
    borderColor: colors.grey,
    marginBottom: 20,
    elevation: 1,
    // flexDirection: 'row',
  },
  redeemBtn: {
    borderRadius: 10,
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginTop: 20,
  },
  items_sty: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    width: 100,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 20,
  },
  hr: {
    borderTopColor: colors.skyblue,
    borderTopWidth: 2,
  },
});

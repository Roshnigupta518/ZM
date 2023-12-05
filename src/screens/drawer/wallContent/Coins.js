import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import NavigationDrawerHeader from '../../../components/drawerheader';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Coins({navigation}) {
  const [dataSource, setDataSource] = useState(data);
  const [showPromotional, setShowPromotional] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const darktheme = useSelector(state => state.darktheme?.data);

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

  return (
    <View style={st.container(darktheme)}>
      <NavigationDrawerHeader
        navigationProps={navigation}
        darktheme={darktheme}
      />
      <View style={st.pd20}>
        <Animated.View style={{transform: [{scale: scale}]}}>
          <TouchableOpacity activeOpacity={0.7}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {
              setShowPromotional(!showPromotional);
            }}
            style={styles.coinsBox}>
            <View style={st.align_C}>
              <View style={[st.row, st.align_C]}>
                <Icon name={'rotate-orbit'} size={35} color={colors.white} />
                <Text style={[st.tx18(darktheme), {color: colors.white}]}>
                  {'  Promotional Brainbits  '}
                </Text>
                <Icon name={'rotate-orbit'} size={35} color={colors.white} />
              </View>

              {showPromotional && (
                <View>
                  <Text
                    style={[st.bigtxt]}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    19987<Text style={st.tx14_s(darktheme)}>{' Points'}</Text>
                  </Text>
                </View>
              )}

              {showPromotional && (
                <TouchableOpacity
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  onPress={() => alert('Redeem points')}
                  style={styles.redeemBtn}>
                  <Text style={[st.tx14_s(darktheme), {color: colors.white}]}>
                    Redeem
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{transform: [{scale: scaleX}]}}>
          <TouchableOpacity activeOpacity={0.7}
            onPressIn={onPressInSocial}
            onPressOut={onPressOutSocial}
            onPress={() => {
              setShowSocial(!showSocial);
            }}
            style={styles.coinsBox}>
            <View style={st.align_C}>
              <View style={[st.row, st.align_C]}>
                <Icon name={'rotate-orbit'} size={35} color={colors.white} />
                <Text
                  style={[
                    st.tx18(darktheme),
                    st.txAlignC,
                    {color: colors.white},
                  ]}>
                  Social Media Activity {'\n'} Brainbits
                </Text>
                <Icon name={'rotate-orbit'} size={35} color={colors.white} />
              </View>

              {showSocial && (
                <View>
                  <Text
                    style={[st.bigtxt]}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    19987<Text style={st.tx14_s(darktheme)}>{' Points'}</Text>
                  </Text>
                </View>
              )}

              {showSocial && (
                <TouchableOpacity
                  onPressIn={onPressInSocial}
                  onPressOut={onPressOutSocial}
                  onPress={() => alert('Redeem points')}
                  style={styles.redeemBtn}>
                  <Text style={[st.tx14_s(darktheme), {color: colors.white}]}>
                    Redeem
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coinsBox: {
    backgroundColor: colors.skyblue,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom: 20,
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

const data = [
  {min_point: 200, max_point: 300},
  {min_point: 100, max_point: 200},
  {min_point: 300, max_point: 400},
  {min_point: 500, max_point: 600},
  {min_point: 700, max_point: 800},
  {min_point: 800, max_point: 900},
  {min_point: 500, max_point: 900},
  {min_point: 200, max_point: 300},
  {min_point: 200, max_point: 300},
  {min_point: 200, max_point: 300},
];

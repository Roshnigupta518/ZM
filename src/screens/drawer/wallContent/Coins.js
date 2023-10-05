import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavigationDrawerHeader from '../../../components/drawerheader';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';
import {useDispatch, useSelector} from 'react-redux';

export default function Coins({navigation}) {
  const [dataSource, setDataSource] = useState(data);
  const darktheme = useSelector(state => state.darktheme?.data);
  
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.items_sty}>
        <Text style={[st.tx16, {color: colors.skyblue}]}>{item.min_point}</Text>
        <View style={styles.hr} >
        <Text style={[st.tx16, {color: colors.skyblue}]}>{item.max_point}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <NavigationDrawerHeader navigationProps={navigation} darktheme={darktheme} />
      <View style={st.pd20}>
        <View style={styles.coinsBox}>
          <View style={st.wdh70}>
            <Text style={[st.tx18, {color: colors.white}]}>
              Available Coins
            </Text>
            <View style={styles.redeemBtn}>
              <Text style={[st.tx14_s, {color: colors.white}]}>
                Points histroy
              </Text>
            </View>
          </View>
          <View style={[st.wdh30, st.align_E, st.justify_C]}>
            <Text
              style={[st.bigtxt, {fontSize: 45}]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              100
            </Text>
          </View>
        </View>
      </View>
      <View style={st.mt_v}>
        <View style={st.mt_v}>
          <Text style={[st.tx18,{marginLeft:20}]}>Choose your range</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
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
    flexDirection: 'row',
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
    marginStart:10,
    marginEnd:20,
    
  },
  hr: {
    borderTopColor:colors.skyblue,
    borderTopWidth:2,
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

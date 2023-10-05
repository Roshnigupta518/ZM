import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import NavigationDrawerHeader from '../../../components/drawerheader';

const ActivityScreen = ({navigation}) => {

  const darktheme = useSelector(state => state.darktheme?.data);

  const renderItem = ({item, index}) => {
    return (
      <View style={[st.mt_t15]}>
        <View style={[st.row, st.align_C]}>
          <View style={st.wdh20}>
          </View>
          <View style={st.wdh50}>
            <Text style={st.tx14_s(darktheme)}>{item.name}</Text>
            <Text style={st.tx12(darktheme)}>{item.username}</Text>
          </View>
          <View style={st.wdh30}>
            <View style={styles.statusSty}>
              
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <NavigationDrawerHeader navigationProps={navigation} darktheme={darktheme} />
      
    </View>
  );
};
export default ActivityScreen;

const styles = StyleSheet.create({
  
});

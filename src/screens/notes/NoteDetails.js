import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../global/styles/styles';
import Header from '../../components/header/Header';
import {useSelector, useDispatch} from 'react-redux';
import {getbgColor} from '../../utils/helperfunctions';
const NoteDetails = ({route, navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const details = route?.params?.details;

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <Text style={st.tx16(darktheme)}>{details?.TITLE}</Text>
          <View style={[st.row,st.align_C]}>
          <Text style={[st.tx12(darktheme)]}>{details?.NDATE}</Text>
          <View
            style={[st.statusBoxSty, {backgroundColor: getbgColor(details?.TYPE), width:80}]}>
            <Text style={[st.tx14_menu, {color: '#fff'}]}>{details?.TYPE}</Text>
          </View>
          </View>
          <View style={st.mt_t10}>
            <Text style={st.tx14(darktheme)}>{details?.NOTE}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({});

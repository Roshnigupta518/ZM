import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';
import Header from '../../../components/header/Header';
import {useSelector} from 'react-redux';

const MyCoins = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={''}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <Text>MyCoins</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCoins;

const styles = StyleSheet.create({});

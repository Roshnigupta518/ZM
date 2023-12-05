import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';

const About = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'About Us'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <Text>About</Text>
      
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';
import Video from 'react-native-video';

const helpDetails = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const url = route?.params?.image;
  const video = route?.params?.video;

  console.log({url: url?.length});
  return (
    <View style={st.container(darktheme)}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      {video && (
        <Video
          source={video}
          style={{width: '100%', height: '100%'}}
          controls={true}
        />
      )}

      {url?.length == 1 && (
        <View style={st.flex}>
          {url.map((i, n) => {
            return (
              <ImageBackground source={i} style={st.flex}></ImageBackground>
            );
          })}
        </View>
      )}

      <ScrollView style={st.flex}>
        {url?.length == 2 && (
          <View style={st.flex}>
            {url.map((i, n) => {
              return (
                <ImageBackground
                  source={i}
                  style={{height: 760}}></ImageBackground>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default helpDetails;

const styles = StyleSheet.create({});

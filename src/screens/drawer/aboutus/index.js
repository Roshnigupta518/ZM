import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
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
      <ScrollView>
        <View style={st.pd20}>
          <Text style={[st.tx16(darktheme), st.txAlignC]}>
            Discover the joy in lifelong exploration!
            {'\n'} {'\n'}
            Explore, acquire a skill or be inspired from the comfort of your
            home! Your only requirement is curiosity
          </Text>

          <View style={{marginTop: 30}}>
            <Text style={[st.tx20(darktheme), st.txAlignC, st.mt_t15]}>
              OUR COMMUNITY
            </Text>
            <Image
              style={{width: '100%', height: 200, resizeMode: 'contain'}}
              source={{
                uri: 'https://zeros.co.in/assets/images/home/CameraPhtoto.jpeg',
              }}
            />

            <View style={st.mt_v}>
              <Text style={[st.tx14(darktheme), st.txAlignC, {lineHeight: 25}]}>
                We use social media to facilitate community learning in a safe
                space! We bring ancient wisdom to social media interactions. We
                are creating a community that gives you access to a multitude of
                activities, classes and guidance. Zeroos makes it possible for
                people to interact, share, explore new skills and network.
              </Text>
            </View>
            <Image
              style={{width: '100%', height: 200, resizeMode: 'contain'}}
              source={{
                uri: 'https://zeros.co.in/assets/images/home/ramanayan.jpeg',
              }}
            />

            <View style={st.mt_v}>
              <Text style={[st.tx14(darktheme), st.txAlignC, {lineHeight: 25}]}>
                We have a wide range of activities including photography, health
                & fitness, business, technical skills, arts & entertainment,
                lifestyle, ancient values and many more. We have tailored
                contents that encourages personal exploration. What more, be a
                creator to share your expertise and earn money!
              </Text>
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Text style={[st.tx20(darktheme), st.txAlignC, st.mt_t15]}>
              OUR STORY
            </Text>
            <Image
              style={{width: '100%', height: 200, resizeMode: 'contain'}}
              source={{
                uri: 'https://zeros.co.in/assets/images/home/laptop.jpeg',
              }}
            />

            <View style={st.mt_v}>
              <Text style={[st.tx14(darktheme), st.txAlignC, {lineHeight: 25}]}>
                It was in the year 2020 when the entire world went under
                lockdown. Chaos and uncertainty prevailed over the pandemic. The
                world we knew changed drastically!
                {'\n'}
                {'\n'}
                There was zero access to friends and family. All forms of social
                interactions moved online leading to exponential use of screen
                time. It also enabled bullying, unhealthy expectations,
                depression, peer pressure and social anxiety
              </Text>
            </View>
            <Image
              style={{width: '100%', height: 150, resizeMode: 'contain'}}
              source={{
                uri: 'https://zeros.co.in/assets/images/home/Noteshang.jpeg',
              }}
            />

            <View style={st.mt_v}>
              <Text style={[st.tx14(darktheme), st.txAlignC, {lineHeight: 25}]}>
                Technology is there to stay. How do we bring a balance to social
                media interactions? Can we bridge ancient wisdom with
                technology?
                {'\n'} {'\n'}
                These questions opened up the world of Zeroos with infinite
                possibilities! Traditional values such as sense of belonging and
                communities existed much before technology. It brought people
                together, instilled integrity and tolerance. Our goal is to
                bring ancient wisdom to modern technology.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ImageBackground,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Authbtn from '../../../components/Authbtn';
import st from '../../../global/styles/styles';
import {setIntroSlide} from '../../../redux/reducers/IntroSlide';
import {useDispatch, useSelector} from 'react-redux';

const Intro = ({navigation}) => {
  const dispatch = useDispatch();
  const introSlideData = useSelector(state => state.IntroSlide.data);

  const onDone = () => {
    dispatch(setIntroSlide(true));
    navigation.navigate('LoginScreen');
  };
  const onSkip = () => {
    dispatch(setIntroSlide(true));
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    console.log({introSlideData});
  }, []);

  const RenderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={[st.tx16, {color: '#fff'}]}>Next</Text>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={[st.tx16, {color: '#fff'}]}>Done</Text>
      </View>
    );
  };

  const RenderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={[st.tx16, {color: '#fff'}]}>Skip</Text>
      </View>
    );
  };

  const RenderItem = ({item}) => {
    return (
      <ImageBackground source={item.image} style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            marginBottom: 70,
          }}>
          <Image style={styles.introImageStyle} source={item.logo} />
          <Text
            style={[
              styles.introTitleStyle,
              {color: item.id == '2' ? '#000' : '#fff'},
            ]}>
            {item.title}
          </Text>
          <View style={st.align_C}>
            <Text style={styles.introdescTextStyle}>{item.description}</Text>
          </View>
          <View style={{marginHorizontal: 70}}>
            <Authbtn
              title={'SIGN UP'}
              onPress={() => {
                navigation.navigate('RegisterScreen');
                dispatch(setIntroSlide(true));
              }}
            />
            <Authbtn
              title={'Login'}
              onPress={() => {
                navigation.navigate('LoginScreen');
                dispatch(setIntroSlide(true));
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        renderDoneButton={RenderDoneButton}
        renderNextButton={RenderNextButton}
        renderSkipButton={RenderSkipButton}
      />
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 220,
    height: 100,
    alignSelf: 'center',
    marginTop:20
    // resizeMode:'center'
  },
  introTextStyle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    // paddingVertical: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  introTitleStyle: {
    textShadowColor: 'rgba(2, 2, 7, 0.75)',
    fontSize: 50,
    textShadowRadius: 10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    marginTop: '50%',
    fontFamily: 'Passion One',
    textShadowOffset: {width: -1, height: 1},
  },
  introdescTextStyle: {
    textShadowColor: 'rgba(2, 2, 7, 0.75)',
    fontSize: 20,
    textShadowRadius: 10,
    color: 'black',
    backgroundColor: '#EDEADE',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
    fontFamily: 'Passion One',
    textShadowOffset: {width: -1, height: 1},
  },
  buttonCircle: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#87CEEB',
    marginTop: 10,
    paddingVertical: 5,
  },
});

const slides = [
  {
    id: 1,
    title: `Safe & Inclusive ${'\n'}Forum`,
    description: `Zeros invests in cummunities and ${'\n'}real connections.`,
    image: require('../../../assets/images/carausel.jpg'),
    logo: require('../../../assets/images/logo.jpeg'),
    color: 'black',
  },

  {
    id: 2,
    title: `Earn & Be  ${'\n'}Informed`,
    description: 'Earn for all social media activities.',
    image: require('../../../assets/images/carauseltwo.jpg'),
    logo: require('../../../assets/images/logo.jpeg'),
    color: 'blue',
  },

  {
    id: 3,
    title: `Validated  ${'\n'}Users`,
    description: `Holistically cured environment with ${'\n'}verified content creators.`,
    image: require('../../../assets/images/carauselthree.jpg'),
    logo: require('../../../assets/images/logo.jpeg'),
  },
  {
    id: 4,
    title: `Zeros Online  ${'\n'}Community`,
    description: 'Just Like Real Life!',
    image: require('../../../assets/images/carauselfour.jpg'),
    logo: require('../../../assets/images/logo.jpeg'),
  },
];

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {StatusBar, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import Init from '../screens/Auth/init';
import Interest from '../screens/Auth/interest';
import HandleBackPress from '../components/Backhandle';

const Route = () => {
  const [isLoading, setIsLoading] = useState(true);
  const login_data = useSelector(state => state.login?.data);

  const darktheme = useSelector(state => state.darktheme?.data);
  const introSlideData = useSelector(state => state.IntroSlide.data);
  const scheme = useColorScheme();
  console.log({darktheme});

  useEffect(() => {
    // console.log('onRoutescreen ----------------------', login_data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // HandleBackPress();
  
  return (
    <NavigationContainer
      fallback={<ActivityIndicator />}
      // theme={scheme === darktheme ? DarkTheme : DefaultTheme}
    >
      

      {isLoading ? (
        <Init />
      ) : login_data ? (
        <HomeStack InitialRoute={login_data?.response?.ZRMV} />
      ) : (
        <AuthStack introSlides={introSlideData} />
      )}

      
    </NavigationContainer>
  );
};

export default Route;

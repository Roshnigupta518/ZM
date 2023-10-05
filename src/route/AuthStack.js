import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Auth/splash';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';
import Otp from '../screens/Auth/otp';
import Intro from '../screens/Auth/intro';
import ForgotPassword from '../screens/Auth/forgotPassword/index';
import ForgotPasswordOtp from '../screens/Auth/forgotPasswordOtp/index';
import Init from '../screens/Auth/init';
import ChangePassword from '../screens/Auth/changePassword';

const Stack = createNativeStackNavigator();

const AuthStack = ({introSlides}) => {
  return (
    <Stack.Navigator initialRouteName={introSlides ? 'LoginScreen' : 'Intro'}>
      {/* <Stack.Screen
        name="Init"
        component={Init}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgotPasswordOtp"
        component={ForgotPasswordOtp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

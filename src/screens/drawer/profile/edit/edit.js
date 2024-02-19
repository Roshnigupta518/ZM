import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
import st from '../../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountInformation from './AccountInformation';
import PersonalInformation from './PersonalInformation';
import Header from '../../../../components/header/Header';
import {colors} from '../../../../global/theme/Theme'
import BioScreen from '../../../Auth/bio';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();


function TabStack() {
  const darktheme = useSelector(state => state.darktheme?.data);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#F8F8F8',
        tabBarStyle: st.bgColor(darktheme),
        tabBarLabelStyle: st.tx14_s(darktheme),
        tabBarIndicatorStyle: {
          borderBottomColor: colors.skyblue,
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="AccountInformation"
        component={AccountInformation}
        options={{
          tabBarLabel: 'Account Information',
        }}  />
      <Tab.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{
          tabBarLabel: 'Personal Information',
        }} />
         <Tab.Screen
        name="BioScreen"
        component={BioScreen}
        initialParams={{data:true}}
        options={{
          tabBarLabel: 'Bio',
        }} />
    </Tab.Navigator>
  );
}

function App({navigation}) {
const darktheme = useSelector(state => state.darktheme?.data);

  return (
    
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{
            header:()=><Header title={'Edit Profile'} onPress={()=>navigation.goBack()} darktheme={darktheme} />
          }}
        />
      </Stack.Navigator>
    
  );
}

export default App;

const styles = StyleSheet.create({
   
});

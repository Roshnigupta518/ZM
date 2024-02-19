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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllFeed from './AllFeed';
import ContentFeed from './Content';
import Header from '../../../components/header/Header';
import {colors} from '../../../global/theme/Theme';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack({route, navigation}) {
  const darktheme = useSelector(state => state.darktheme?.data);
  // console.log('TabStack', interestId);
  const interestId = route?.params?.interestId;
  return (
    <>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />

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
          name="All Feed"
          component={() => (
            <AllFeed interestId={interestId} navigation={navigation} />
          )}
          options={{
            tabBarLabel: 'All Feed',
          }}
        />
        <Tab.Screen
          name="Content Creater"
          component={() => (
            <ContentFeed interestId={interestId} navigation={navigation} />
          )}
          options={{
            tabBarLabel: 'Content Creater',
          }}
        />
      </Tab.Navigator>
    </>
  );
}

// function App({navigation, route}) {
//   const darktheme = useSelector(state => state.darktheme?.data);
//   const interestId = route?.params?.interestId;

//   console.log({interestId});
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {backgroundColor: '#633689'},
//         headerTintColor: 'white',
//         headerTitleStyle: {fontWeight: 'bold'},
//       }}>
//       <Stack.Screen
//         name="TabStack"
//         component={() => <TabStack interestId={interestId} />}
//         options={{
//           header: () => (
//             <Header
//               title={''}
//               onPress={() => navigation.goBack()}
//               darktheme={darktheme}
//             />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

export default TabStack;

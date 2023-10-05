import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import Home from '../wallContent/Home';
import Interest from '../wallContent/Interest';
import Followers from '../wallContent/Followers';
import ProfileTab from '../../drawer/profile';
import Coins from '../wallContent/Coins';
import Icon from 'react-native-vector-icons/FontAwesome';
import Edit from '../profile/edit/edit';
import InterestFeed from '../interestFeed/InterestFeed';
import InstaFeed from '../interestFeed/InstaFeed';
import Feeds from '../interestFeed/Feeds';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileTab">
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const InterestTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="InterestTab">
      <Stack.Screen
        name="InterestTab"
        component={Interest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InterestFeed"
        component={InterestFeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InstaFeed"
        component={InstaFeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        options={{headerShown: false}}
      />
      {/*  */}
    </Stack.Navigator>
  );
};

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#000'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'dashboard') {
            iconName = focused
              ? require('../../../assets/images/drawericons/icons_home-01.png')
              : require('../../../assets/images/drawericons/home_white-01.png');
          } else if (route.name === 'post') {
            iconName = focused
              ? require('../../../assets/images/drawericons/post_white-01.png')
              : require('../../../assets/images/drawericons/post_white-01.png');
          } else if (route.name === 'Coins') {
            iconName = focused
              ? require('../../../assets/images/drawericons/coin.png')
              : require('../../../assets/images/drawericons/coin.png');
          } else if (route.name === 'Interest') {
            iconName = focused
              ? require('../../../assets/images/drawericons/icon_categories-01.png')
              : require('../../../assets/images/drawericons/categories_white-01.png');
          } else if (route.name === 'Profile') {
            iconName = focused
              ? require('../../../assets/images/drawericons/avatar.png')
              : require('../../../assets/images/drawericons/user.png');
          } else if (route.name === 'Notification') {
            iconName = focused
              ? require('../../../assets/images/drawericons/notifications_black-01.png')
              : require('../../../assets/images/drawericons/notifications_black-01.png');
          }
          return (
            <Image
              source={iconName}
              style={{
                width: size,
                height: size,
                borderRadius: size,
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="dashboard"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="Interest"
        component={InterestTabStack}
        options={{
          tabBarLabel: 'Interest',
          title: 'Interest',
        }}
      />
      <Tab.Screen
        name="Coins"
        component={Coins}
        options={{
          tabBarLabel: 'Coins',
          title: 'Coins',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabStack}
        options={{
          tabBarLabel: 'Profile',
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

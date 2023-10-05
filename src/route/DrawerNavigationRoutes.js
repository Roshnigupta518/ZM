import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsScreen from '../screens/drawer/settings';
import CustomSidebarMenu from '../route/CustomSidebarMenu';
import {colors} from '../global/theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Activity from '../screens/drawer/activities';
import {clearLogin} from '../redux/reducers/Login';
import {useDispatch, useSelector} from 'react-redux';
import TabBar from '../screens/drawer/home';
import st from '../global/styles/styles';
import About from '../screens/drawer/aboutus';
import {API} from '../utils/endpoints';
import {postApi} from '../utils/apicalls';
import {setUserMeta} from '../redux/reducers/UserMeta';
import SavePost from '../screens/savePost';
import DrawerSaved from '../screens/savePost/DrawerSaved';

import Notes from '../screens/notes';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = props => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const dispatch = useDispatch();
  const login_data = useSelector(state => state.login?.data);
  const [metaData, setMetaData] = useState(null);

  const getProfileMeta = async () => {
    const url = API.GetProfileInformeta;
    const param = {
      iPrometheus: login_data?.response?.ZRTC,
    };
    try {
      const result = await postApi(url, param, login_data.accessToken);
      // console.log({getProfileMeta: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result?.data?.Response);
        let tempdata = null;
        for (let i = 0; data.length > i; i++) {
          tempdata = data[i];
        }

        // console.log({tempdata});
        setMetaData(tempdata);
        dispatch(setUserMeta(tempdata));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfileMeta();
  }, []);
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: {marginVertical: 10, color: 'white'},
      }}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveTintColor: colors.skyblue,
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: st.tx14_s(darktheme),
      }}
      drawerContent={props => (
        <CustomSidebarMenu {...props} metaData={metaData} />
      )}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color}) => <Icon name="home" size={22} color={color} />,
        }}
        component={TabBar}
      />
      <Drawer.Screen
        name="DrawerSaved"
        options={{
          drawerLabel: 'Saved Post',
          drawerIcon: ({color}) => <Icon name="user" size={22} color={color} />,
        }}
        component={DrawerSaved}
      />
      <Drawer.Screen
        name="Notes"
        options={{
          drawerLabel: 'Notes',
          drawerIcon: ({color}) => <Icon name="user" size={22} color={color} />,
        }}
        component={Notes}
      />
      {/* <Drawer.Screen
        name="Calender"
        options={{
          drawerLabel: 'Calender',
          drawerIcon: ({color}) => <Icon name="user" size={22} color={color} />,
        }}
        component={SavePost}
      /> */}
      {/* <Drawer.Screen
        name="activityStack"
        options={{
          drawerLabel: 'Activities',
          drawerIcon: ({color}) => <Icon name="user" size={22} color={color} />,
        }}
        component={Activity}
      /> */}
      <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({color}) => <Icon name="cog" size={22} color={color} />,
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;

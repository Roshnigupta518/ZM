import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Switch,
} from 'react-native';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {clearLogin} from '../../../redux/reducers/Login';
import {icon_color} from '../../../utils/helperfunctions';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {setTheme} from '../../../redux/reducers/Darktheme';

const SettingsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const dispatch = useDispatch();

  const onPress_handle = screenName => {
    if (screenName == 'logout') {
      Logout_handle();
    } else {
      navigation.navigate(screenName);
    }
  };

  const Logout_handle = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            // dispatch(clearLogin());
            postLogOut_handle();
            dispatch(setTheme('dark'));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const postLogOut_handle = async () => {
    const reqData = {
      iAuthen: login_data.accessToken,
    };
    const url = API.Logout;
    try {
      setLoading(true);
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({postLogOut: result.data});
      if (result?.data?.IsSuccessed) {
        dispatch(clearLogin());
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={st.mt_B}>
        <TouchableOpacity
          style={[st.row]}
          onPress={() => onPress_handle(item.screenName)}>
          <View style={st.wdh10}>
            <Icon
              name={item.iconName}
              size={25}
              color={icon_color(darktheme)}
            />
          </View>
          <View style={st.wdh80}>
            <Text style={st.tx16(darktheme)}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Settings'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={st.pd20}
      />
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({});

const list = [
  {name: 'Help', iconName: 'help', screenName: 'About'},
  {name: 'About', iconName: 'info-circle', screenName: 'About'},
  {name: 'Terms & Conditions', iconName: 'file-text-o', screenName: 'Terms'},
  {
    name: 'Privacy Policy',
    iconName: 'unlock-alt',
    screenName: 'PrivacyPolicy',
  },
  {name: 'Theme', iconName: 'sun-o', screenName: 'Theme'},
  {name: 'Log-out', iconName: 'sign-out', screenName: 'logout'},
];

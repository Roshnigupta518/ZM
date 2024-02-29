import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StatusBar, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {colors, images} from '../../global/theme/Theme';
import {icon_color} from '../../utils/helperfunctions';
import styles from '../../global/styles/styles';
import {API} from '../../utils/endpoints';
import {postApi} from '../../utils/apicalls';
import {useDispatch, useSelector} from 'react-redux';

const NavigationDrawerHeader = props => {
  const [count, setCount] = useState();
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  const login_data = useSelector(state => state.login?.data);

  const getNotifCount = async () => {
    try {
      const url = API.GET_NOTIF_COUNT;
      const params = {
        identity: 'None',
      };
      const result = await postApi(url, params, login_data.accessToken);
      if (result.status == 200) {
        const data = result.data;
        console.log({getNotifCount: data});
        setCount(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotifCount();
  }, []);

  return (
    <View>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View
        style={[
          styles.row,
          {
            paddingTop: Platform.OS == 'android' ? 40 :60,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 0.5,
          },
        ]}>
        <View style={[styles.wdh60]}>
          <View style={[styles.row]}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Icon name="menu" size={23} color={icon_color(props.darktheme)} />
            </TouchableOpacity>

            <Image
              source={images.logo}
              style={{width: 90, height: 25, marginLeft: 10}}
            />
          </View>
        </View>

        <View style={[styles.wdh30, styles.align_E]}>
          <View style={[styles.row]}>
            <Icon
              name="search"
              color={icon_color(props.darktheme)}
              size={25}
              onPress={() => props.navigationProps.navigate('Search')}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigationProps.navigate('SuggestionScreen', {
                  fromWall: true,
                })
              }>
              <Image
                source={images.friend}
                style={[
                  {
                    width: 22,
                    height: 22,
                    marginHorizontal: 15,
                    tintColor: icon_color(props.darktheme),
                  },
                ]}
              />
            </TouchableOpacity>

            {/* Suggestion */}
            <TouchableOpacity
              onPress={() => props.navigationProps.navigate('Notification')}>
              {count > 0 && (
                <View
                  style={{
                    minHeight: 20,
                    minWidth: 20,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: -15,
                    right: -5,
                  }}>
                  <Text style={[styles.tx14_menu, {color: '#fff'}]}>
                    {count}
                  </Text>
                </View>
              )}
              <Feather
                name="bell"
                color={icon_color(props.darktheme)}
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default NavigationDrawerHeader;

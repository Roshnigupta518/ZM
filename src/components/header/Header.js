import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../global/theme/Theme';
import {icon_color} from '../../utils/helperfunctions';
import PostMenu from '../component-parts/postmenu';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Material from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  title,
  onPress,
  darktheme,
  menu,
  navigation,
  edit,
  onEditHandle,
  interestType,
  onPressInterestAll,
  onPressContent,
  notification,
  onPressNotif,
}) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Content Creater');

  const hideMenu = () => {
    setVisible(false);
  };
  const showMenu = () => {
    setVisible(true);
  };

  return (
    <View>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View
        style={{
          backgroundColor: darktheme === 'dark' ? colors.white : colors.black,
          borderBottomColor: '#ccc',
          borderBottomWidth: 0.5,
        }}>
        <View style={[st.row, st.justify_S, st.align_C, st.pd20, {marginTop:Platform.OS == 'android'?10:40}]}>
          <TouchableOpacity onPress={onPress} style={{width: 50}}>
            <Icon name="arrow-left" size={25} color={icon_color(darktheme)} />
          </TouchableOpacity>
          <View>
            <Text style={st.tx18(darktheme)}>{title}</Text>
          </View>
          <View>
            {menu && <PostMenu darktheme={darktheme} navigation={navigation} />}

            {edit && (
              <Icon
                name={'check'}
                size={30}
                color={colors.skyblue}
                onPress={onEditHandle}
              />
            )}

            {interestType && (
              <Menu
                visible={visible}
                anchor={
                  <Material
                    name={'more-vert'}
                    size={25}
                    onPress={() => {
                      showMenu();
                    }}
                    color={icon_color(darktheme)}
                  />
                }
                onRequestClose={hideMenu}>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    onPressInterestAll();
                    setStatus('All');
                  }}
                  textStyle={[
                    st.tx14_menu,
                    {color: status == 'All' ? colors.green : null},
                  ]}>
                  {'All Post'}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    hideMenu();
                    onPressContent();
                    setStatus('Content Creater');
                  }}
                  textStyle={[
                    st.tx14_menu,
                    {color: status == 'Content Creater' ? colors.green : null},
                  ]}>
                  Content Creater
                </MenuItem>
              </Menu>
            )}

            {notification && (
              <Menu
                visible={visible}
                anchor={
                  <Material
                    name={'more-vert'}
                    size={25}
                    onPress={() => {
                      showMenu();
                    }}
                    color={icon_color(darktheme)}
                  />
                }
                onRequestClose={hideMenu}>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    onPressNotif();
                  }}
                  textStyle={[st.tx14_menu]}>
                  {'Mark all as read'}
                </MenuItem>
              </Menu>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

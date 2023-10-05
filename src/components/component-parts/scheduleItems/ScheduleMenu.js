import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import st from '../../../global/styles/styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import {icon_color} from '../../../utils/helperfunctions';
import {colors} from '../../../global/theme/Theme';

const ScheduleMenu = ({darktheme,deletePost_handle}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => {
    setVisible(false);
  };
  const showMenu = () => {
    setVisible(true);
  };

  return (
    <View style={[st.align_E]}>
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
            deletePost_handle()
          }}
          textStyle={st.tx14_menu}>
          {'Delete'}
        </MenuItem>
        <MenuDivider />
      </Menu>
    </View>
  );
};

export default ScheduleMenu;

const styles = StyleSheet.create({});

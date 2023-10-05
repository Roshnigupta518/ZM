import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {icon_color} from '../../utils/helperfunctions';
import Material from 'react-native-vector-icons/MaterialIcons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import st from '../../global/styles/styles';

const NoteMenu = ({
  navigation,
  darktheme,
  getId,
  onPopupMessageModalClick,
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <Menu
      visible={visible}
      anchor={
        <Material
          name={'more-vert'}
          size={25}
          onPress={showMenu}
          color={icon_color(darktheme)}
        />
      }
      onRequestClose={hideMenu}>
      {/* <MenuItem
        onPress={() => {
          hideMenu();
        }}
        textStyle={st.tx14_menu}>
        Edit
      </MenuItem>
      <MenuDivider /> */}
      <MenuItem
        onPress={() => {
          hideMenu();
          getId();
          onPopupMessageModalClick(true);
        }}
        textStyle={st.tx14_menu}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default NoteMenu;

const styles = StyleSheet.create({});

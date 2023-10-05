import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import st from '../../../global/styles/styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import {icon_color} from '../../../utils/helperfunctions';
import PopUpMessage from '../../../components/popup';

const CommentMenu = ({
  item,
  darktheme,
  onPopupMessageModalClick,
  getId,
  hideComment_handle,
  login_data,
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={st.align_E}>
      <View style={{width: 20}}>
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
          {/* {item.PROMETH == login_data?.user?.ZRTC && (
            <MenuItem
              onPress={() => {
                hideMenu();
              }}
              textStyle={st.tx14_menu}>
              {'Edit Comment'}
            </MenuItem>
          )}
          <MenuDivider /> */}

          {item.PROMETH == login_data?.response?.ZRTC && (
            <MenuItem
              onPress={() => {
                hideMenu();
                onPopupMessageModalClick(true);
                getId(item.CID);
              }}
              textStyle={st.tx14_menu}>
              {'Delete Comment'}
            </MenuItem>
          )}

          <MenuDivider />
          {item.PROMETH != login_data?.response?.ZRTC && (
            <MenuItem
              onPress={() => {
                hideMenu();
                hideComment_handle(item.CID);
              }}
              textStyle={st.tx14_menu}>
              {item.UHIDED == 'true' ? 'Unhide Comment' : 'Hide Comment'}
            </MenuItem>
          )}
          <MenuDivider />

          {item.PROMETH != login_data?.response?.ZRTC && (
            <MenuItem
              onPress={() => {
                hideMenu();
              }}
              textStyle={st.tx14_menu}>
              {'Report this Comment'}
            </MenuItem>
          )}
        </Menu>
      </View>
    </View>
  );
};

export default CommentMenu;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import st from '../../../global/styles/styles';
import Material from 'react-native-vector-icons/MaterialIcons';
import {icon_color} from '../../../utils/helperfunctions';
import {colors} from '../../../global/theme/Theme';

const PostMenu = ({
  darktheme,
  deletePost_handle,
  item,
  hidePost_handle,
  unSavedPost_handle,
  index,
  gotoSavePost,
  gotoEditPost,
  login_data,
  gotoReport,
}) => {
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
        // ref={}
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
            if (item?.SAVE_ID) {
              unSavedPost_handle(item?.PID);
            } else {
              gotoSavePost(item?.PID);
            }
          }}
          textStyle={st.tx14_menu}>
          {item?.SAVE_ID ? 'Unsaved Post' : 'Save post'}
        </MenuItem>
        <MenuDivider />
        {/* <MenuItem onPress={hideMenu} textStyle={st.tx14_menu}>
          Copy link to post
        </MenuItem>
        <MenuDivider /> */}

        {item?.PROMETH != login_data?.response?.ZRTC && (
          <MenuItem
            onPress={() => {
              hideMenu();
              hidePost_handle(item?.PID);
            }}
            textStyle={st.tx14_menu}>
            Hide post
          </MenuItem>
        )}

        <MenuDivider />

        {item?.PROMETH != login_data?.response?.ZRTC && (
          <MenuItem
            disabled={item.ISREPORTED == 1 ? true : false}
            onPress={() => {
              hideMenu();
              console.log({ISREPORTED: item.ISREPORTED});
              gotoReport();
            }}
            textStyle={[
              st.tx14_menu,
              {color: item.ISREPORTED == 1 ? '#ccc' : '#000'},
            ]}>
            Report post
          </MenuItem>
        )}

        <MenuDivider />

        {item?.PROMETH === login_data?.response?.ZRTC && (
          <MenuItem
            onPress={() => {
              hideMenu();
              gotoEditPost(item?.PID);
            }}
            textStyle={st.tx14_menu}>
            Edit post
          </MenuItem>
        )}

        <MenuDivider />

        {item?.PROMETH == login_data?.response?.ZRTC && (
          <MenuItem
            onPress={() => {
              hideMenu();
              deletePost_handle(item?.PID);
            }}
            textStyle={st.tx14_menu}>
            Delete post
          </MenuItem>
        )}
      </Menu>
    </View>
  );
};

export default PostMenu;

const styles = {
  titleBox: {
    background: 'pink',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageBox: {
    height: 45,
  },
};

const message =
  'We want to notify the member of your report unless you report it as intellectual property infringement.';

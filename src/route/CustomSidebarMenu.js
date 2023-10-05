import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {colors} from '../global/theme/Theme';
import {size} from '../global/fonts/Fonts';
import styles from '../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import ProfileImg from '../components/profileImg';

const CustomSidebarMenu = props => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  // console.log({metaData: props.metaData});

  const data = login_data;

  return (
    <View style={stylesSidebar.sideMenuContainer(darktheme)}>
      <View style={styles.mt_v} />
      <View style={stylesSidebar.profileHeader}>
      <View style={styles.wdh30}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <ProfileImg url={props?.metaData?.UI} style={stylesSidebar.imgsty} />
        </View>
        </View>
        <View style={styles.wdh70}>
          {
            <Text
              numberOfLines={1}
              style={[styles.tx16(darktheme)]}>
              {props?.metaData?.FN} {props?.metaData?.LN}
            </Text>
          }
          <Text style={[styles.tx12(darktheme)]}>
            {props?.metaData?.PM}
          </Text>
        </View>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: darktheme => ({
    width: '100%',
    height: '100%',
    backgroundColor: darktheme !== 'dark' ? colors.black : colors.white,
    // paddingTop: 40,
    color: 'white',
  }),
  imgsty: {
    width: 50,
    height: 50,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    // backgroundColor: '#ddd',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileHeaderText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: size.title,
    color: colors.black,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  logoutCon: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

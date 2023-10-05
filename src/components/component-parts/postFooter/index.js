import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';
import {icon_color} from '../../../utils/helperfunctions';
import Material from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';

const Footer = ({
  onlikePress,
  item,
  darktheme,
  footerSty,
  gotoCommnetScreen,
  gotoSharePost
}) => {
  const shareHandle = () => {
    const url = 'https://awesome.contents.com/';
    const title = 'Awesome Contents';
    const message = 'Please check this out.';

    const options = {
      title,
      url,
      message,
    };

    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <View style={[st.footer, footerSty]}>
      <View style={[st.row, st.justify_S]}>
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity activeOpacity={0.5} onPress={onlikePress}>
            <Material
              name={item?.ULIKED == 'false' ? 'favorite-outline' : 'favorite'}
              size={25}
              color={item?.ULIKED == 'false' ? icon_color(darktheme) : 'red'}
            />
          </TouchableOpacity>
          <Text style={[st.tx14(darktheme), st.pd_H20]}>{item?.PLIKES}</Text>
        </View>
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => gotoCommnetScreen(item)}>
            <Material
              name="messenger-outline"
              size={25}
              color={icon_color(darktheme)}
            />
          </TouchableOpacity>

          <Text style={[st.tx14(darktheme), st.pd_H20]}>{item?.PCOMMENTS}</Text>
        </View>
        {/* <View style={[st.row, st.align_C]}>
          <SimpleLineIcon name="eye" size={23} color={icon_color(darktheme)} />
          <Text style={[st.tx14(darktheme), st.pd_H20]}>
            {item?.VISIBILITY}
          </Text>
        </View> */}
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => gotoSharePost()}>
            <Icon
              name="navigate-outline"
              size={25}
              color={icon_color(darktheme)}
            />
          </TouchableOpacity>
          <Text style={[st.tx14(darktheme), st.pd_H20]}>{item?.PSHARES}</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});

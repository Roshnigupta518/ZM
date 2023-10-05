import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import QuixPost from '../quizPost';
import ProfileImg from '../../profileImg';
import {environment} from '../../../utils/constant';
import st from '../../../global/styles/styles';
import ScheduleMenu from './ScheduleMenu';

const regex = /(<([^>]+)>)/gi;
const {width, height} = Dimensions.get('window');

const ScheduleItems = ({item, darktheme, deletePost_handle, gotoDetails}) => {
  // console.log({ScheduleItems:item})
  return (
    <View
      style={[
        st.mt_B,
        {borderWidth: 0.7, borderColor: '#777', borderRadius: 10},
      ]}>
      <View style={[st.row, st.align_C, st.pd10]}>
        <View style={st.wdh80}>
          <Pressable style={[st.row, st.align_C]}>
            <ProfileImg url={item.DP_IMAGE} style={st.profileImgSty} />
            <View>
              <Text style={st.tx14_s(darktheme)}>{item?.POSTED_BY}</Text>
              <Text style={st.tx12(darktheme)}>
                Will post on {item?.POSTED_DATE}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={st.wdh20}>
          <ScheduleMenu
            darktheme={darktheme}
            deletePost_handle={deletePost_handle}
          />
        </View>
      </View>

      {item.POST_TYPE == '3' && (
        <QuixPost
          // gotoDetails={gotoDetails}
          darktheme={darktheme}
          item={item}
        />
      )}

      {item.POST_TYPE == '2' && item.POST_PICS && (
        <TouchableOpacity
          onPress={() => gotoDetails(item)}
          style={{height: height * 0.4}}>
          <ImageBackground
            source={{uri: environment.postImgPath + item.POST_PICS}}
            style={[st.flex, st.mt_B]}
            // imageStyle={{borderTopRadius: 10}}
          />
        </TouchableOpacity>
      )}

      {item.POST_TYPE != '3' && item.P_CONTENT && (
        <View style={[st.pd10, st.pdT0]}>
          <Text style={st.tx14_s(darktheme)}>
            {item.POSTED_BY}
            <Text style={st.tx14(darktheme)}>
              {' '}
              {item?.P_CONTENT?.replace(regex, '')}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default ScheduleItems;

const styles = StyleSheet.create({});

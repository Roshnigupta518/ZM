import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles/styles';
import ProfileImg from '../../profileImg';
import PeopleKnow from '../peopleKnow';
import Footer from '../postFooter';
import PostMenu from '../postmenu';
import QuixPost from '../quizPost';
import {environment} from '../../../utils/constant';
import YoutubePlayer from 'react-native-youtube-iframe';
import Hyperlink from 'react-native-hyperlink';
import Autolink from 'react-native-autolink';

const {width, height} = Dimensions.get('window');
const regex = /(<([^>]+)>)/gi;
const Photo = ({
  item,
  index,
  darktheme,
  mode,
  onlikePress,
  fromWall,
  deletePost_handle,
  hidePost_handle,
  unSavedPost_handle,
  gotoCommnetScreen,
  gotoProfileTab,
  gotoDetails,
  gotoSavePost,
  gotoEditPost,
  login_data,
  gotoSharePost,
  gotoReport,
  quizVote_handle,
  gotoInterest,
}) => {
  return (
    <View
      key={index}
      style={[
        st.mt_B,
        st.bgCardColor(darktheme),
        {
          borderRadius: 10,
          elevation: 1,
        },
      ]}>
      <View style={[st.row, st.pd10, st.align_C]}>
        <View style={st.wdh80}>
          <Pressable
            onPress={() => {
              if (fromWall) {
                gotoProfileTab(item.PROMETH);
              }
            }}
            style={[st.row, st.align_C]}>
            <ProfileImg url={item.DP_IMAGE} style={st.profileImgSty} />
            <View>
              <Text style={st.tx14_s(darktheme)}>{item.POSTED_BY}</Text>
              <Text style={st.tx12(darktheme)}>{item.PROMETH}</Text>
              <Text style={st.tx12(darktheme)}>{item.POSTED_DATE?.trim()}</Text>
            </View>
          </Pressable>
        </View>
        <View style={st.wdh20}>
          <PostMenu
            index={index}
            darktheme={darktheme}
            deletePost_handle={deletePost_handle}
            hidePost_handle={hidePost_handle}
            item={item}
            unSavedPost_handle={unSavedPost_handle}
            gotoSavePost={gotoSavePost}
            gotoEditPost={gotoEditPost}
            login_data={login_data}
            gotoReport={gotoReport}
          />
        </View>
      </View>

      {item.POST_TYPE == '3' && (
        <QuixPost index={index}
          gotoDetails={gotoDetails}
          darktheme={darktheme}
          quizVote_handle={quizVote_handle}
          item={item}
          gotoProfileTab={gotoProfileTab}
          gotoInterest={gotoInterest}
        />
      )}

      {item.POST_TYPE == '2' && item.POST_PICS && (
        <TouchableOpacity
          onPress={() => gotoDetails(item)}
          style={{height: height * 0.4}}>
          <ImageBackground
            source={{uri: environment.postImgPath + item.POST_PICS}}
            style={[st.flex, st.mt_B]}
            // imageStyle={{borderRadius: 15}}
          />
        </TouchableOpacity>
      )}

      {item.POST_TYPE != '3' && item.P_CONTENT && (
        <View style={[st.pd10, st.pdT0]}>
        
          <Autolink
            text={
              item?.P_CONTENT?.replace(regex, '') +
              ' ' +
              (item?.TaggUser ? item?.TaggUser : '')
            }
         
            email
            hashtag="instagram"
            mention="twitter"
            phone="sms"
            url
            onPress={(url, match) => {
              switch (match.getType()) {
                case 'mention':
                  console.log('Mention pressed!', item?.TaggUser);
                  gotoProfileTab(item?.TaggUser);
                  break;
                case 'hashtag':
                  console.log('hashtag presseddd!');
                  gotoInterest();
                  break;
                default:
                  console.log('Link pressed!');
                  // gotoInterest();
              }
            }}
            linkStyle={{ color: 'blue' }} 
            style={st.tx14(darktheme)}
          />
          {item?.YouTubeId && (
            <View style={st.mt_t10}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId={item?.YouTubeId}
              />
            </View>
          )}
        </View>
      )}

      {/* SharedID post data */}

      {item?.SharedPostData &&
        item.SharedPostData.length > 0 &&
        item.SharedPostData.map((i, n) => {
          return (
            <View>
              <View style={[st.row, st.pd10, st.align_C]}>
                <View style={st.wdh80}>
                  <Pressable
                    onPress={() => {
                      if (fromWall) {
                        gotoProfileTab(i.PROMETH);
                      }
                    }}
                    style={[st.row, st.align_C]}>
                    <ProfileImg url={i.DP_IMAGE} style={st.profileImgSty} />
                    <View>
                      <Text style={st.tx14_s(darktheme)}>{i.POSTED_BY}</Text>
                      <Text style={st.tx12(darktheme)}>{i.POSTED_DATE}</Text>
                    </View>
                  </Pressable>
                </View>
              </View>

              {i.POST_TYPE == '2' && i.POST_PICS && (
                <TouchableOpacity
                  onPress={() => gotoDetails(i)}
                  style={{height: height * 0.4}}>
                  <ImageBackground
                    source={{uri: environment.postImgPath + i.POST_PICS}}
                    style={[st.flex, st.mt_B]}
                    // imageStyle={{borderRadius: 15}}
                  />
                </TouchableOpacity>
              )}

              {i.P_CONTENT && (
                <View style={[st.pd10, st.pdT0]}>
                  <Autolink
                    text={i?.P_CONTENT?.replace(regex, '')}
                    email
                    hashtag="instagram"
                    mention="twitter"
                    phone="sms"
                    url
                    linkStyle={{ color: 'blue' }} 
            style={st.tx14(darktheme)}
                  />
                  {i?.YouTubeId && (
                    <View style={st.mt_t10}>
                      <YoutubePlayer
                        height={200}
                        play={false}
                        videoId={i?.YouTubeId}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}

      {/* added footer here */}
      <Footer
        onlikePress={onlikePress}
        item={item}
        darktheme={darktheme}
        gotoCommnetScreen={gotoCommnetScreen}
        gotoSharePost={gotoSharePost}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({});

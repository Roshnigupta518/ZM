import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';
import {Menu, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImg from '../../../components/profileImg';
import {colors} from '../../../global/theme/Theme';
import Input from '../../../components/input';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Loader from '../../../components/Loader';
import {environment} from '../../../utils/constant';
import Toast from 'react-native-simple-toast';
import {
  MentionInput,
  Suggestion,
  replaceMentionValues,
  mentionRegEx,
} from 'react-native-controlled-mentions';
import Autolink from 'react-native-autolink';
import YoutubePlayer from 'react-native-youtube-iframe';

const regex = /(<([^>]+)>)/gi;

const SharePost = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const UserMeta = useSelector(state => state.UserMeta?.data);
  // UserMeta
  const shareId = route?.params?.shareId;

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Public');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const [interestId, setInterestId] = useState([]);
  const [showMention, setShowMention] = useState(false);
  const [mentionUser, setMentionUser] = useState('');

  const onEditHandle = () => {
    handleSubmitPress();
  };

  const hideMenu = val => {
    setVisible(false);
    setStatus(val);
  };
  const showMenu = () => {
    setVisible(true);
  };

  const renderSuggestions: (
    suggestions: Suggestion[],
  ) => FC<MentionSuggestionsProps> =
    suggestions =>
    ({keyword, onSuggestionPress}) => {
      if (keyword == null) {
        return null;
      }

      return (
        <View style={styles.mentionInputList(darktheme)}>
          <ScrollView nestedScrollEnabled style={st.flex}>
            {suggestions
              ?.filter(one =>
                one.name
                  .toLocaleLowerCase()
                  .includes(keyword.toLocaleLowerCase()),
              )
              .map((one, i) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    onSuggestionPress(one);
                    // console.log('mm',replaceMentionValues(caption, ({name}) => `#${name}`))
                    let ids = [];
                    ids.push(one.id);
                    setInterestId([...interestId, ids]);
                  }}
                  style={{padding: 6}}>
                  <Text style={st.tx14(darktheme)}>{one.name}</Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      );
    };

  const renderMentionSuggestions = renderSuggestions(users);

  const renderHashtagSuggestions = renderSuggestions(hashTags);

  const getHashTagHandle = async () => {
    const url = API.GET_HASHTAG;
    const params = {
      hagTagValue: '%%',
    };

    try {
      const result = await postApi(url, params);
      if (result.status == 200) {
        const data = result.data;
        // console.log({hashtag: data});
        const transformed = data.map(({id, value}) => ({
          id: id,
          name: value,
        }));
        setHashTags(transformed);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUsersTagHandle = async () => {
    const url = API.GET_Tag;
    const params = {
      tagValue: '%%',
    };

    try {
      const result = await postApi(url, params, login_data.accessToken);
      if (result.status == 200) {
        const data = result.data;
        const transformed = data.map(({id, value}) => ({
          id: id,
          name: value,
        }));

        const key = 'name';

        const arrayUniqueByKey = [
          ...new Map(transformed.map(item => [item[key], item])).values(),
        ];
        // console.log({tag: arrayUniqueByKey});

        setUsers(arrayUniqueByKey);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getShareData = async () => {
    const reqData = {
      iShareId: shareId,
    };

    setLoading(true);
    const api = API.GetSharedPostData;
    // console.log({reqData});
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      // console.log({result: result.data});
      if (result.status == 200) {
        let newData = JSON.parse(result.data.Response);
        console.log({newData});
        setData(newData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const handleSubmitPress = async () => {
    let intID = '';
    if (interestId?.length > 0) {
      intID = interestId?.toString();
    }

    let tempUserMention = '';

    if (mentionUser) {
      tempUserMention = replaceMentionValues(
        mentionUser,
        ({name}) => `@${name}`,
      );
    }

    const reqData = {
      ipostData: value
        ? replaceMentionValues(value, ({name}) => `#${name}`)
        : '',
      ipostType: status,
      ipostTags: '',
      imediaIds: shareId,
      ipostMode: '7',
      ischdlat: '',
      ishareId: shareId,
      iTagguser: tempUserMention,
      interestId: intID ? intID : '',
    };

    console.log(reqData, 'check data');
    setLoading(true);
    try {
      const url = API.NEWPOST;
      const result = await postApi(url, reqData, login_data.accessToken);
      if (result.status == 200) {
        const data = result.data;
        console.log({data}, 'data aaya');
        setLoading(false);
        Toast.show(data?.message[1], Toast.LONG);
        navigation.goBack();
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getShareData();
    getHashTagHandle();
    getUsersTagHandle();
    console.log({UserMeta});
  }, []);

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Share Post'}
        darktheme={darktheme}
        edit={true}
        onEditHandle={onEditHandle}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={st.pd20}>
          <View style={[st.row, st.align_C]}>
            <View style={st.wdh20}>
              <ProfileImg url={UserMeta?.UI} style={st.profileImgSty} />
            </View>
            <View style={st.wdh80}>
              <Text style={st.tx14_s(darktheme)}>
                {UserMeta?.DN} {UserMeta?.LN}
              </Text>
              <Menu
                style={{marginRight: 20}}
                visible={visible}
                anchor={
                  <TouchableOpacity
                    style={[st.row, st.align_C, styles.statusCon]}
                    onPress={showMenu}>
                    <Text style={st.tx14}>{status}</Text>
                    <Icon name={'chevron-down'} size={20} style={st.pd_H20} />
                  </TouchableOpacity>
                }
                onRequestClose={() => hideMenu(status)}>
                <MenuItem
                  onPress={() => hideMenu('Public')}
                  textStyle={[
                    st.tx14_s,
                    {color: status == 'Public' && colors.skyblue},
                  ]}>
                  {'Public'}
                </MenuItem>
                <MenuItem
                  onPress={() => hideMenu('Only me')}
                  textStyle={[
                    st.tx14_s,
                    {color: status == 'Only me' && colors.skyblue},
                  ]}>
                  {'Only me'}
                </MenuItem>
              </Menu>
            </View>
          </View>

          {/* <Input
            inputsty={styles.inputsty}
            value={value}
            darktheme={darktheme}
            onChangeText={text => setValue(text)}
            multiline={true}
            placeholder={`What are you doing now ${UserMeta?.DN} ${UserMeta?.LN} ?`}
          /> */}

          <View style={st.mt_v}>
            <MentionInput
              value={value}
              onChange={text => {
                setValue(text);
              }}
              partTypes={[
                {
                  trigger: '#',
                  allowedSpacesCount: 0,
                  renderSuggestions: renderHashtagSuggestions,
                },
                {
                  pattern:
                    /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
                  textStyle: {color: 'blue'},
                },
              ]}
              style={[styles.inputsty, st.tx14_s(darktheme)]}
              placeholder={`What are you doing now ${UserMeta?.DN} ${UserMeta?.LN} ?`}
              placeholderTextColor={colors.grey}
            />
            {/* {errors?.userNumber && (
              <Text style={st.error}>{errors?.userNumber}</Text>
            )} */}
          </View>

          <View>
            <View style={st.wdh40}>
              <Pressable
                onPress={() => setShowMention(!showMention)}
                style={st.editboxsty(darktheme)}>
                <Text style={st.tx16(darktheme)}>@ Mention</Text>
              </Pressable>
            </View>
            {showMention && (
              <MentionInput
                value={mentionUser}
                onChange={text => {
                  setMentionUser(text);
                  console.log({text});
                }}
                partTypes={[
                  {
                    trigger: '@',
                    allowedSpacesCount: 0,
                    renderSuggestions: renderMentionSuggestions,
                  },
                  {
                    pattern:
                      /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
                    textStyle: {color: 'blue'},
                  },
                ]}
                style={[styles.inputsty, st.tx14_s(darktheme)]}
                placeholder="Add mentioned users..."
                placeholderTextColor={colors.grey}
              />
            )}
          </View>

          {data?.length > 0 &&
            data.map(i => (
              <View style={[st.mt_t10, styles.crdsty]}>
                <View style={[st.row, st.align_C, st.pd20]}>
                  <View style={st.wdh25}>
                    <ProfileImg url={i?.DP_IMAGE} style={st.profileImgSty} />
                  </View>
                  <View style={st.wdh75}>
                    <Text style={st.tx14_s(darktheme)}>{i?.POSTED_BY}</Text>
                    <Text style={st.tx12(darktheme)}>{i?.POSTED_DATE}</Text>
                  </View>
                </View>

                <View>
                  {i?.POST_PICS && (
                    <Image
                      source={{uri: environment.postImgPath + i?.POST_PICS}}
                      style={{width: '100%', height: 300}}
                    />
                  )}
                  <View style={st.pd_H20}>
                    {/* <Text style={st.tx14(darktheme)}>
                      {i?.P_CONTENT.replace(regex, '')} {i?.TaggUser}
                    </Text> */}

                    <Autolink
                      text={
                        i?.P_CONTENT?.replace(regex, '') +
                        ' ' +
                        (i?.TaggUser ? i?.TaggUser : '')
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
                            // gotoProfileTab(item?.TaggUser);
                            break;
                          case 'hashtag':
                            console.log('hashtag pressed!');
                            // gotoInterest();
                            break;
                          default:
                            console.log('Link pressed!');
                        }
                      }}
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
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default SharePost;

const styles = StyleSheet.create({
  inputsty: {borderWidth: 0, borderBottomWidth: 1},
  crdsty: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  mentionInputList: darktheme => ({
    height: 150,
    overflow: 'hidden',
    backgroundColor: st.bgColor(darktheme),
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  }),
});

// {"result": {"Response": "[{\"PID\": 331, \"PROMETH\": \"KeshavD534795\", \"DP_IMAGE\": \"uploads/zeros-avatar.svg\", \"ZRUSERID\": 1047387, \"POSTED_BY\": \"Keshav Dhaka\", \"POST_PICS\": null, \"POST_TAGS\": null, \"POST_TYPE\": 2, \"P_CONTENT\": \"<p><br></p>\", \"QUIZ_DATA\": null, \"POST_MEDIA\": \"\", \"SUBM_FILES\": null, \"VISIBILITY\": 1, \"POSTED_DATE\": \" March 23 at 12:27 AM\"}]", "message": null}}

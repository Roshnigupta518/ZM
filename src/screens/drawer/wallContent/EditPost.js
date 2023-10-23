import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../global/theme/Theme';
import {useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import ProfileImg from '../../../components/profileImg';
import Input from '../../../components/input';
import {API} from '../../../utils/endpoints';
import {postApi, uploadApi} from '../../../utils/apicalls';
import Toast from 'react-native-simple-toast';
import {Menu, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../../components/Loader';
import {environment} from '../../../utils/constant';
import {images} from '../../../global/theme/Theme';
import WithImageUpload from '../../../HOCs/imageUploader';
import DatePicker from 'react-native-date-picker';
import {getPickerImageResp} from '../../../utils/helperfunctions';
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import Authbtn from '../../../components/Authbtn';
import {ValueEmpty} from '../../../utils/helperfunctions/validations';
import Autolink from 'react-native-autolink';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  MentionInput,
  Suggestion,
  replaceMentionValues,
  mentionRegEx,
} from 'react-native-controlled-mentions';

const dimensions = Dimensions.get('window');
const regex = /(<([^>]+)>)/gi;

const INITIAL_Options = [{value: ''}, {value: ''}, {value: ''}, {value: ''}];
const INITIAL_OptionsErr = [{value: ''}, {value: ''}, {value: ''}, {value: ''}];
const INITIAL_Quiz = {question: ''};

const EditPost = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Public');
  const [showModal, setShowModal] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [removeMdia, setRemoveMdia] = useState('');
  const [options, setOptions] = useState(INITIAL_Options);
  const [optionsErr, setOptionsErr] = useState(INITIAL_OptionsErr);
  const [quizId, setQuizId] = useState(INITIAL_Quiz);
  const [quizQus, setQuizQues] = useState(INITIAL_Quiz);
  const [quizQusErr, setQuizQuesErr] = useState(INITIAL_Quiz);
  const [checked, setChecked] = useState(-1);
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const [disabled, setDisabled] = useState(false);

  const [MinutesArray, setMinutesArray] = useState(minData);
  const [Minutes, setMinutes] = useState(0);
  const [openMinutes, setOpenMinutes] = useState(false);
  const [Hours, setHours] = useState(0);
  const [openHours, setOpenHours] = useState(false);
  const [HoursArray, setHoursArray] = useState(hourData);
  const [days, setDays] = useState(1);
  const [openDays, setOpenDays] = useState(false);
  const [DaysArray, setDaysArray] = useState(dayData);
  const [hashTags, setHashTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [mentionUser, setMentionUser] = useState('');
  const [showMention, setShowMention] = useState(false);
  const [sharedData, setSharedData] = useState([]);
  const [errors, setErrors] = useState({});

  const postId = route?.params?.postId;
  const UserMeta = useSelector(state => state.UserMeta?.data);

  const onChange_handle = (text, postId) => {
    const tempdata = [...data];
    if (tempdata) {
      tempdata[0].P_CONTENT = text;
      setData(tempdata);
      console.log({tempdata});
    }
  };

  const checkYoutbURl = url => {
    console.log({url});
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    const tempdata = [...data];
    if (match && match[7].length == 11) {
      console.log('true', match);
      if (tempdata) {
        tempdata[0].P_CONTENT = url;
        tempdata[0].YouTubeId = match[7];
        setData(tempdata);
        console.log({tempdata});
      } else {
        tempdata[0].YouTubeId = null;
      }
    } else {
      // tempdata[0].YouTubeId = null;
    }
  };

  const onChange_Mentionhandle = (text, postId) => {
    const tempdata = [...data];
    if (tempdata) {
      tempdata[0].TaggUser = text;
      setData(tempdata);
      console.log({tempdata});
    }
  };

  const clearImageHandle = () => {
    const tempdata = [...data];
    setRemoveMdia(tempdata[0].POST_PICS);
    if (tempdata) {
      tempdata[0].POST_PICS = null;
      setData(tempdata);
      console.log({tempdata});
    }
    setAttachment(null);
  };

  const OptionSetters = {
    addItem: () => {
      setOptions([...options, {value: ''}]);
      setOptionsErr([...optionsErr, {value: ''}]);
    },
  };

  const hideMenu = val => {
    setVisible(false);
    setStatus(val);
  };
  const showMenu = () => {
    setVisible(true);
  };

  const onEditHandle = () => {
    if (attachment) {
      userMediaPost_handle();
    } else {
      if (attachment == null && data[0]?.POST_PICS == null) {
        if(data && data[0].P_CONTENT){
        savePost_handle('', '1', data[0]?.POST_MEDIA, removeMdia);
        setErrors({userNumber:''})
        }else{
                setErrors({userNumber:'*Required'})
        }
      } else {
        savePost_handle(data[0]?.POST_MEDIA, data[0]?.POST_TYPE, '', '');
      }
    }
  };

  const EditPost_handle = async () => {
    const reqData = {
      iPostId: postId,
    };

    setLoading(true);
    const api = API.EditPostData;
    console.log({api, reqData});
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      console.log({EditPost_handle: result.data});
      if (result.status == 200) {
        let newData = JSON.parse(result.data.Response);
        console.log({newData: newData});
        setData(newData);
        setLoading(false);

        if (newData[0]?.TaggUser) {
          setShowMention(true);
        }

        if (newData[0].POST_TYPE == 7) {
          const shareId = newData[0].SHARED_ID;
          getShareData(shareId);
        }

        //set quiz

        const data = newData[0]?.QUIZ_DATA;
        const quiz = data?.split('|');
        setQuizId(quiz[0]);
        const quizData = quiz?.slice(5);
        console.log({quizId: quiz[0]});
        const tempdata = [];
        for (let i = 0; quizData?.length > i; i++) {
          if (quizData[i]) {
            let obj = {
              value: quizData[i],
            };
            tempdata.push(obj);
          }
        }

        setOptions(tempdata);
        // console.log({tempdata});
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const savePost_handle = async (mediaId, type, removeId, removeMdiaurl) => {
    let tempUserMention = '';

    if (data && data[0]?.TaggUser) {
      tempUserMention = replaceMentionValues(
        data && data[0]?.TaggUser,
        ({name}) => `@${name}`,
      );
    }
    const reqData = {
      ieditPId: postId,
      ipostType: status,
      ipostData:
        data && data[0]?.P_CONTENT
          ? replaceMentionValues(data[0]?.P_CONTENT, ({name}) => `#${name}`)
          : quizQus?.question
          ? replaceMentionValues(quizQus?.question, ({name}) => `#${name}`)
          : '', //type == 3 ? quizQus?.question : data && data[0]?.P_CONTENT
      ipostTags: '',
      imediaIds: sharedData?.length > 0 ? data && data[0]?.SHARED_ID : mediaId,
      irmediaIds: removeId ? removeId : '',
      irmediaUrls: removeMdiaurl ? removeMdiaurl : '',
      ipostMode: sharedData?.length > 0 ? 7 : type,
      ischdlat: '',
      ishareId: sharedData?.length > 0 ? data && data[0]?.SHARED_ID : '',
      iTaggUser: tempUserMention,
      iYoutubeId: data && data[0]?.YoutubeId ? data[0]?.YoutubeId : '',
      // interestId: intID ? intID : '',
    };

    console.log({reqData});
    setLoading(true);
    const api = API.Postingeditpost;
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      // console.log({result: result.data});
      if (result.status == 200) {
        let newData = result.data;
        // console.log({newData});
        Toast.show(newData?.message[1], Toast.LONG);
        navigation.goBack();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const userMediaPost_handle = async () => {
    const url = API.NEWMEDIAPOST;
    const formdata = new FormData();
    formdata.append('file', attachment);
    console.log('----------------form data------------', formdata);
    setLoading(true);
    try {
      const result = await uploadApi(url, formdata, login_data.accessToken);
      // console.log({uploadApi: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result.data);
        setLoading(false);
        console.log('mediapost=>', data);
        savePost_handle(data[0]?.id, '2');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const modifyQuizHandle = async () => {
    const url = API.ModifyQuizPost;
    const params = {
      ianswer: '',
      idays: days,
      ieditPId: postId,
      ihours: Hours,
      iminutes: Minutes,
      ioption1: options[0]?.value,
      ioption2: options[1]?.value,
      ioption3: options[2]?.value ? options[2]?.value : '',
      ioption4: options[3]?.value ? options[3]?.value : '',
      iquizId: quizId,
      ischdlat: '',
    };
    console.log({editquizparams: params});
    setLoading(true);
    try {
      const result = await postApi(url, params, login_data.accessToken);
      console.log({quizEdit: result.data});
      if (result.status == 200) {
        savePost_handle(quizId, '3');
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getShareData = async shareId => {
    console.log('*********************************', shareId);
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
        console.log({getShareData: newData});
        setSharedData(newData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    EditPost_handle();
  }, []);

  const quizValidation = async () => {
    Keyboard.dismiss();
    let isValid = true;
    const emptyQues = ValueEmpty(data && data[0].P_CONTENT);

    for (let i = 0; i < options.length; i++) {
      if (i == 0 || i == 1) {
        console.log({i});
        if (options[i].value.trim() == '') {
          handleOptionsError('*Required', i);
          isValid = false;
        } else {
          handleOptionsError('', i);
        }
      }
    }

    if (emptyQues) {
      handleQuizError('*Required', 'question');
      isValid = false;
    } else {
      handleQuizError('', 'question');
    }

    if (isValid) {
      modifyQuizHandle();
    } else {
    }
    console.log('dfbgfdg', emptyQues);
  };

  const uploadProfileToServer = async res => {
    const imageResp = getPickerImageResp(res);
    console.log(imageResp);
    setAttachment(imageResp);
  };

  const onChangeTextHandle = (text, index) => {
    console.log({text, index});
    const data = [...options];
    data[index].value = text;
    console.log({data});
    setOptions(data);
  };

  const handleOnchange = (text, input) => {
    // setStatus(prevState=>({...prevState, [input]: text}));
    setQuizQues(prevState => ({...prevState, [input]: text}));
  };

  const handleOptionsError = (text, index) => {
    const data = [...optionsErr];
    data[index].value = text;
    console.log({data});
    setOptionsErr(data);
  };

  const handleQuizError = (error, input) => {
    setQuizQuesErr(prevState => ({...prevState, [input]: error}));
  };

  const AvatarImageWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <Pressable
        style={[st.row, st.align_C]}
        onPress={handleImageUpload}
        {...props}>
        <Image source={images.camera} style={st.icnsty} />
        <Text style={st.tx14(darktheme)}>Take a photo</Text>
      </Pressable>
    ),
    uploadProfileToServer,
    null,
  );

  const SchedulePost = ({}) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            // setOpen(true);
            navigation.navigate('SchedulePost');
          }}
          style={[st.row, st.align_C, st.mt_B]}>
          <Image source={images.shedule} style={st.icnsty} />
          <Text style={st.tx14(darktheme)}>Schedule</Text>
        </Pressable>

        <DatePicker
          modal
          open={open}
          date={date}
          textColor={colors.black}
          onConfirm={dateResp => {
            setOpen(false);
            setDate(dateResp);
            // setScheduleDate(dateResp);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };
  // "QUIZ_DATA\": \"10422|2-1,2-2,||2023-04-02 00:34:56|1|A|B||\"

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

  useEffect(() => {
    getHashTagHandle();
    getUsersTagHandle();
  }, []);

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
                    // let ids = [];
                    // ids.push(one.id);
                    // setInterestId([...interestId, ids]);
                  }}
                  style={{padding: 6}}>
                  <Text style={st.tx14(darktheme)}>{one.name}</Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      );
    };

  const renderHashtagSuggestions = renderSuggestions(hashTags);
  const renderMentionSuggestions = renderSuggestions(users);

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Edit'}
        darktheme={darktheme}
        edit={true}
        onEditHandle={() => onEditHandle()}
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

          <View>
            {data &&
              data?.map((i, n) => {
                return (
                  <View key={n}>
                    {i.POST_TYPE != '3' && (
                      <MentionInput
                        value={i?.P_CONTENT.replace(regex, '')}
                        // defaultValue={i?.P_CONTENT.replace(regex, '')}
                        onChange={text => {
                          onChange_handle(text, postId);
                          checkYoutbURl(text, postId);
                          setDisabled(false);
                          setErrors({userNumber:''})
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
                        placeholder="Share your thought's..."
                        placeholderTextColor={colors.grey}
                      />
                    )}

                    {errors?.userNumber && (
                      <Text style={st.error}>{errors?.userNumber}</Text>
                    )}

                    <View style={st.mt_t10}>
                      <View style={st.wdh40}>
                        <Pressable
                          onPress={() => setShowMention(!showMention)}
                          style={st.editboxsty(darktheme)}>
                          <Text style={st.tx16(darktheme)}>@ Mention</Text>
                        </Pressable>
                      </View>
                      {showMention && (
                        <MentionInput
                          value={i?.TaggUser}
                          onChange={text => {
                            onChange_Mentionhandle(text, postId);
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
                          style={[
                            styles.inputsty,
                            st.tx14_s(darktheme),
                            st.mt_B,
                          ]}
                          placeholder="Add mentioned users..."
                          placeholderTextColor={colors.grey}
                        />
                      )}

                      {i?.YouTubeId && (
                        <View style={st.mt_t10}>
                          <TouchableOpacity
                            onPress={() => {
                              console.log('hi');
                              const tempdata = [...data];
                              if (tempdata) {
                                tempdata[0].YouTubeId = '';
                                setData(tempdata);
                              }
                            }}>
                            <Icon
                              name="close-circle"
                              size={25}
                              color={colors.skyblue}
                            />
                          </TouchableOpacity>
                          <YoutubePlayer
                            height={200}
                            play={false}
                            videoId={i?.YouTubeId}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
          </View>

          {/* Share post data details */}
          {sharedData?.length > 0 &&
            sharedData.map(i => (
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
                            console.log('Mention pressed!');
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

          {data &&
            data?.map((i, n) => {
              return (
                <View>
                  {i.POST_TYPE == '2' && <AvatarImageWithPicker />}
                  {i.POST_TYPE == '3' && (
                    <View style={st.mt_t10}>
                      <MentionInput
                        value={i.P_CONTENT.replace(regex, '')}
                        onChange={text => {
                          onChange_handle(text, 'P_CONTENT');
                          checkYoutbURl(text);
                          setDisabled(false);
                          // quizUtubehandle(text);
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
                        style={[styles.inputsty, st.tx14_s(darktheme), st.mt_B]}
                        placeholder="Ask a Question..."
                        placeholderTextColor={colors.grey}
                      />

                      {quizQusErr?.question && (
                        <Text style={st.error}>{quizQusErr?.question}</Text>
                      )}

                      {quizQus?.question && (
                        <Autolink
                          text={
                            quizQus?.question?.replace(regex, '') +
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
                                console.log('Mention pressed!', i?.TaggUser);
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
                      )}
                      {options.map((i, n) => {
                        if (n > 3) {
                          return <View key={n} />;
                        }
                        var onPress = (value, index) => {
                          setChecked(value);
                          setCheckedIndex(index);
                        };
                        return (
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: '85%'}}>
                              <Input
                                onChangeText={text =>
                                  onChangeTextHandle(text, n)
                                }
                                onFocus={() => handleOptionsError(null, n)}
                                placeholder={`Enter Option ${n + 1}`}
                                placeholderTextColor="#808080"
                                darktheme={darktheme}
                                error={optionsErr[n]?.value}
                                defaultValue={i.value}
                              />
                            </View>
                            <View
                              style={{
                                width: '15%',
                                alignItems: 'flex-end',
                                marginTop: 10,
                              }}>
                              <RadioButton labelHorizontal={true} key={i}>
                                <RadioButtonInput
                                  obj={i}
                                  index={n}
                                  isSelected={checkedIndex === n}
                                  onPress={onPress}
                                  buttonInnerColor={colors.skyblue}
                                  buttonOuterColor={
                                    checkedIndex === n ? colors.skyblue : '#ccc'
                                  }
                                  buttonSize={10}
                                  buttonOuterSize={25}
                                  buttonStyle={{}}
                                  buttonWrapStyle={{marginRight: 10}}
                                />
                                <RadioButtonLabel
                                  obj={i}
                                  index={n}
                                  onPress={onPress}
                                  labelStyle={st.tx14(darktheme)}
                                  labelWrapStyle={{}}
                                />
                              </RadioButton>
                            </View>
                          </View>
                        );
                      })}

                      <View style={[st.row, st.justify_S]}>
                        <View style={styles.dropDown}>
                          <DropDownPicker
                            listMode="MODAL"
                            style={styles.dropDownBorder}
                            placeholderStyle={{
                              color: '#ccc',
                              fontSize: 12,
                            }}
                            placeholder="Days"
                            labelProps={{
                              numberOfLines: 1,
                            }}
                            open={openDays}
                            value={days}
                            items={DaysArray}
                            setOpen={setOpenDays}
                            setValue={setDays}
                            onChangeValue={value => {
                              console.log('value', value);
                              calculatedHoursDuration(value);
                            }}
                            setItems={setDaysArray}
                            modalTitle="Select Day"
                            modalProps={{
                              animationType: 'fade',
                            }}
                          />
                        </View>

                        <View style={styles.dropDown}>
                          <DropDownPicker
                            listMode="MODAL"
                            style={styles.dropDownBorder}
                            placeholderStyle={{
                              color: '#ccc',
                              fontSize: 12,
                            }}
                            placeholder="Hours"
                            labelProps={{
                              numberOfLines: 1,
                            }}
                            open={openHours}
                            value={Hours}
                            items={HoursArray}
                            setOpen={setOpenHours}
                            setValue={setHours}
                            onChangeValue={value => {
                              console.log('value', value);
                              calculateMintuesDuration(value);
                            }}
                            setItems={setHoursArray}
                            modalTitle="Select Minute"
                            modalProps={{
                              animationType: 'fade',
                            }}
                          />
                        </View>

                        <View style={styles.dropDown}>
                          <DropDownPicker
                            listMode="MODAL"
                            style={styles.dropDownBorder}
                            placeholderStyle={{
                              color: '#ccc',
                              fontSize: 12,
                            }}
                            placeholder="Minutes"
                            labelProps={{
                              numberOfLines: 1,
                            }}
                            open={openMinutes}
                            value={Minutes}
                            items={MinutesArray}
                            setOpen={setOpenMinutes}
                            setValue={setMinutes}
                            setItems={setMinutesArray}
                            modalTitle="Select Minute"
                            modalProps={{
                              animationType: 'fade',
                            }}
                          />
                        </View>
                      </View>

                      {options.length < 4 && (
                        <Authbtn
                          title={'Add more options'}
                          onPress={OptionSetters.addItem}
                        />
                      )}

                      <Authbtn
                        title={'Post'}
                        onPress={() => {
                          quizValidation();
                        }}
                        disabled={disabled}
                      />
                    </View>
                  )}
                  {/* <SchedulePost /> */}
                </View>
              );
            })}
        </View>

        {data &&
          data?.map((i, n) => {
            const img = i?.POST_PICS;
            return (
              <View key={n}>
                {(i?.POST_PICS || attachment) && (
                  <Icon
                    name="close-circle"
                    size={25}
                    color={colors.skyblue}
                    style={{marginLeft: 20}}
                    onPress={() => clearImageHandle()}
                  />
                )}
                <Image
                  resizeMode={'cover'}
                  style={{
                    width: dimensions.width / 1,
                    height: dimensions.height,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: attachment?.uri
                      ? attachment?.uri
                      : environment.postImgPath + img,
                  }}
                />
              </View>
            );
          })}
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  inputsty: {borderWidth: 0, borderBottomWidth: 1},
  dropDown: {
    zIndex: 100,
    width: '32%',
  },
  mentionInputList: darktheme => ({
    height: 150,
    overflow: 'hidden',
    backgroundColor: st.bgColor(darktheme),
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  }),
  dropDownBorder: {
    zIndex: 100,
    height: 45,
    borderColor: colors.grey,
    borderWidth: 0.7,
  },
});

const minData = [
  {label: '0 min', value: 0},
  {label: '1 min', value: 1},
  {label: '2 mins', value: 2},
  {label: '3 mins', value: 3},
  {label: '4 mins', value: 4},
  {label: '5 mins', value: 5},
  {label: '6 mins', value: 6},
  {label: '7 mins', value: 7},
  {label: '8 mins', value: 8},
  {label: '9 mins', value: 9},
  {label: '10 mins', value: 10},
  {label: '11 mins', value: 11},
  {label: '12 mins', value: 12},
  {label: '13 mins', value: 13},
  {label: '14 mins', value: 14},
  {label: '15 mins', value: 15},
  {label: '16 mins', value: 16},
  {label: '17 mins', value: 17},
  {label: '18 mins', value: 18},
  {label: '19 mins', value: 19},
  {label: '20 mins', value: 20},
  {label: '21 mins', value: 21},
  {label: '22 mins', value: 22},
  {label: '23 mins', value: 23},
  {label: '24 mins', value: 24},
  {label: '25 mins', value: 25},
  {label: '26 mins', value: 26},
  {label: '27 mins', value: 27},
  {label: '28 mins', value: 28},
  {label: '29 mins', value: 29},
  {label: '30 mins', value: 30},
  {label: '31 mins', value: 31},
  {label: '32 mins', value: 32},
  {label: '33 mins', value: 33},
  {label: '34 mins', value: 34},
  {label: '35 mins', value: 35},
  {label: '36 mins', value: 36},
  {label: '37 mins', value: 37},
  {label: '38 mins', value: 38},
  {label: '39 mins', value: 39},
  {label: '40 mins', value: 40},
  {label: '41 mins', value: 41},
  {label: '42 mins', value: 42},
  {label: '43 mins', value: 43},
  {label: '44 mins', value: 44},
  {label: '45 mins', value: 45},
  {label: '46 mins', value: 46},
  {label: '47 mins', value: 47},
  {label: '48 mins', value: 48},
  {label: '49 mins', value: 49},
  {label: '50 mins', value: 50},
  {label: '51 mins', value: 51},
  {label: '52 mins', value: 52},
  {label: '53 mins', value: 53},
  {label: '54 mins', value: 54},
  {label: '55 mins', value: 55},
  {label: '56 mins', value: 56},
  {label: '57 mins', value: 57},
  {label: '58 mins', value: 58},
  {label: '59 mins', value: 59},
];

const dayData = [
  {label: '0 day', value: 0},
  {label: '1 day', value: 1},
  {label: '2 days', value: 2},
  {label: '3 days', value: 3},
  {label: '4 days', value: 4},
  {label: '5 days', value: 5},
  {label: '6 days', value: 6},
  {label: '7 days', value: 7},
];

const hourData = [
  {label: '0 Hour', value: 0},
  {label: '1 Hour', value: 1},
  {label: '2 Hours', value: 2},
  {label: '3 Hours', value: 3},
  {label: '4 Hours', value: 4},
  {label: '5 Hours', value: 5},
  {label: '6 Hours', value: 6},
  {label: '7 Hours', value: 7},
  {label: '8 Hours', value: 8},
  {label: '9 Hours', value: 9},
  {label: '10 Hours', value: 10},
  {label: '11 Hours', value: 11},
  {label: '12 Hours', value: 12},
  {label: '13 Hours', value: 13},
  {label: '14 Hours', value: 14},
  {label: '15 Hours', value: 15},
  {label: '16 Hours', value: 16},
  {label: '17 Hours', value: 17},
  {label: '18 Hours', value: 18},
  {label: '19 Hours', value: 19},
  {label: '20 Hours', value: 20},
  {label: '21 Hours', value: 21},
  {label: '22 Hours', value: 22},
  {label: '23 Hours', value: 23},
];

const mentionUserList = [
  {id: '1', name: 'David Tabaka'},
  {id: '2', name: 'Mary'},
  {id: '3', name: 'Tony'},
  {id: '4', name: 'Mike'},
  {id: '5', name: 'Grey'},
];

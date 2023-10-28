import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Keyboard,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import st from '../../../global/styles/styles';
import Authbtn from '../../../components/Authbtn';
import ProfileImg from '../../../components/profileImg';
import {colors} from '../../../global/theme/Theme';
import {Menu, MenuItem} from 'react-native-material-menu';
import {images} from '../../../global/theme/Theme';
import WithImageUpload from '../../../HOCs/imageUploader';
import {getPickerImageResp, icon_color} from '../../../utils/helperfunctions';
import DatePicker from 'react-native-date-picker';
import Header from '../../../components/header/Header';
import Loader from '../../../components/Loader/index';
import {API} from '../../../utils/endpoints';
import {postApi, uploadApi} from '../../../utils/apicalls';
import {setNewPost} from '../../../redux/reducers/NewPost';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../components/input';
import {ValueEmpty} from '../../../utils/helperfunctions/validations';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import {clearSchedulePost} from '../../../redux/reducers/SchedulePost';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  MentionInput,
  Suggestion,
  replaceMentionValues,
  mentionRegEx,
} from 'react-native-controlled-mentions';

const INITIAL_Options = [{value: ''}, {value: ''}];
const INITIAL_OptionsErr = [{value: ''}, {value: ''}];
const INITIAL_Quiz = {question: ''};

export default function Post({navigation}) {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Public');
  const [caption, setCaption] = useState('');
  const [mentionUser, setMentionUser] = useState('');
  const [showMention, setShowMention] = useState(false);
  const [quizQus, setQuizQues] = useState(INITIAL_Quiz);
  const [quizQusErr, setQuizQuesErr] = useState(INITIAL_Quiz);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(INITIAL_Options);
  const [optionsErr, setOptionsErr] = useState(INITIAL_OptionsErr);
  // const [scheduleDate, setScheduleDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [MinutesArray, setMinutesArray] = useState(minData);
  const [Minutes, setMinutes] = useState(0);
  const [openMinutes, setOpenMinutes] = useState(false);
  const [Hours, setHours] = useState(0);
  const [openHours, setOpenHours] = useState(false);
  const [HoursArray, setHoursArray] = useState(hourData);
  const [days, setDays] = useState(1);
  const [openDays, setOpenDays] = useState(false);
  const [DaysArray, setDaysArray] = useState(dayData);
  const [checked, setChecked] = useState(-1);
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [utubeUrl, setUtubeUrl] = useState(false);
  const [utubeId, setUtubeId] = useState('');
  const [quizutubeUrl, setQuizUtubeUrl] = useState(false);
  const [quizutubeId, setQuizUtubeId] = useState('');
  const [link, setLink] = useState('');
  const [users, setUsers] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const [interestId, setInterestId] = useState([]);

  const dispatch = useDispatch();
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const scheduleDate = useSelector(state => state.SchedulePost?.data);
  const UserMeta = useSelector(state => state.UserMeta?.data);

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
              .filter(one =>
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

  // console.log({UserMeta});quizutubeUrl

  const hideMenu = val => {
    setVisible(false);
    setStatus(val);
  };
  const showMenu = () => {
    setVisible(true);
  };

  const OptionSetters = {
    addItem: () => {
      setOptions([...options, {value: ''}]);
      setOptionsErr([...optionsErr, {value: ''}]);
    },
  };

  const handleOnchange = (text, input) => {
    // setStatus(prevState=>({...prevState, [input]: text}));
    setQuizQues(prevState => ({...prevState, [input]: text}));
  };

  const handleQuizError = (error, input) => {
    setQuizQuesErr(prevState => ({...prevState, [input]: error}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleSubmitPress = async (imediaIds, mode) => {
    let ischdlat = '';
    if (scheduleDate) {
      ischdlat = moment(scheduleDate.date).format('MM/DD/YYYY');
    }

    let tempUserMention = '';

    if (mentionUser) {
      tempUserMention = replaceMentionValues(
        mentionUser,
        ({name}) => `@${name}`,
      );
    }

    console.log({link});
    let intID = '';
    if (interestId?.length > 0) {
      intID = interestId?.toString();
    }
    const reqData = {
      ipostData: caption
        ? replaceMentionValues(caption, ({name}) => `#${name}`)
        : quizQus?.question
        ? replaceMentionValues(quizQus?.question, ({name}) => `#${name}`)
        : '',
      ipostType: status,
      ipostTags: '',
      imediaIds: imediaIds ? imediaIds : '',
      ipostMode: mode,
      ischdlat: ischdlat ? ischdlat + ' ' + scheduleDate?.time : '',
      ishareId: '',
      iYoutubeId: utubeId ? utubeId : quizutubeId ? quizutubeId : '',
      interestId: intID ? intID : '',
      iTagguser: tempUserMention,
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
        // dispatch(setNewPost(data));
        setInterestId([]);
        if (ischdlat) {
          dispatch(clearSchedulePost());
        }
        Toast.show(data?.message[1], Toast.LONG);
        navigation.goBack();
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
      if (ischdlat) {
        dispatch(clearSchedulePost());
      }
    }
  };

  const CreateQuiz_handle = async () => {
    let ischdlat = '';
    if (scheduleDate) {
      ischdlat = moment(scheduleDate.date).format('DD/MM/YYYY');
    }
    const url = API.CreateQuiz;
    const param = {
      ioption1: options[0]?.value,
      ioption2: options[1]?.value,
      ioption3: options[2]?.value ? options[2]?.value : '',
      ioption4: options[3]?.value ? options[3]?.value : '',
      ianswer: checkedIndex == -1 ? '' : checkedIndex + 1,
      idays: days,
      ihours: Hours,
      iminutes: Minutes,
      ischdlat: ischdlat ? ischdlat + ' ' + scheduleDate?.time : '',
    };
    console.log({quizParam: param, url});

    try {
      setLoading(true);
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        setOptions(INITIAL_Options);
        setLoading(false);
        setShowModal(!showModal);
        const quizId = data.message[2];
        const myArray = quizId?.split('|');
        handleSubmitPress(myArray[0], '3');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const userMediaPost_handle = async () => {
    const url = API.NEWMEDIAPOST;
    const formdata = new FormData();
    formdata.append('file', attachment);
    console.log('----------------form data------------', formdata, url);
    setLoading(true);
    try {
      const result = await uploadApi(url, formdata, login_data.accessToken);
      // console.log({uploadApi: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result.data);
        setLoading(false);
        console.log('mediapost=>', data);
        handleSubmitPress(data[0]?.id, '2');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

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

  const uploadProfileToServer = async res => {
    const imageResp = getPickerImageResp(res);
    setAttachment(imageResp);
    setDisabled(false);
  };

  const AvatarImageWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <Pressable
        style={[st.row, st.align_C, st.mt_B]}
        onPress={handleImageUpload}
        {...props}>
        <Image source={images.camera} style={st.icnsty} />
        <Text style={st.tx14(darktheme)}>Take a photo</Text>
      </Pressable>
    ),
    uploadProfileToServer,
    null,
  );

  const calculatedHoursDuration = val => {
    console.log({horsset: val});
    if (val == 0) {
      if (Hours == 0) {
        setHours(1);
      }
    }
  };

  const calculateMintuesDuration = val => {
    console.log({minset: val});
    if (Hours == 0) {
      if (Minutes == 0) {
        const data = MinutesArray;
        const removed = data.splice(0, 5);
        setMinutesArray(data);
        setMinutes(5);
      }
    }
  };

  const onChangeTextHandle = (text, index) => {
    const data = [...options];
    data[index].value = text;
    console.log({data});
    setOptions(data);
  };

  const handleOptionsError = (text, index) => {
    const data = [...optionsErr];
    data[index].value = text;
    console.log({data});
    setOptionsErr(data);
  };

  const quizValidation = async () => {
    Keyboard.dismiss();
    let isValid = true;
    const emptyQues = ValueEmpty(quizQus.question);

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
      CreateQuiz_handle();
    }
  };

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
          textColor={colors.black}
          date={date}
          onConfirm={dateResp => {
            setOpen(false);
            setDate(dateResp);
            setScheduleDate(dateResp);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };

  const ShowScheduleDate = () => {
    return (
      <View>
        {scheduleDate != null && (
          <View style={[st.mt_v, st.row, st.justify_S, st.align_C]}>
            <Text
              style={[st.tx14, styles.datecont]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              Will post on {moment(scheduleDate?.date).format('MMM Do YYYY')}
              {' at '}
              {scheduleDate?.time}
            </Text>
            <Pressable onPress={() => dispatch(clearSchedulePost())}>
              <Icon name={'close'} size={20} color={colors.skyblue} />
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const checkYoutbURl = url => {
    console.log({url});
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      console.log('true', match);
      setDisabled(false);
      setUtubeUrl(true);
      setUtubeId(match[7]);
      setLink(url);
    } else {
      setUtubeUrl(true);
      setLink(url);
      setDisabled(false);
      console.log('false');
    }
  };

  const quizUtubehandle = url => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    if (match && match[7]?.length == 11) {
      console.log('true', match[7]);
      setDisabled(false);
      setQuizUtubeUrl(true);
      setQuizUtubeId(match[7]);
      setLink(url);
    } else {
      setQuizUtubeUrl(true);
      setLink(url);
      console.log('false', match);
    }
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Create Post'}
        darktheme={darktheme}
      />
      <ScrollView
        style={st.flex}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps={'handled'}>
        <View style={st.pd20}>
          <View style={[st.row, st.align_C]}>
            <ProfileImg url={UserMeta?.UI} />
            <View>
              <Text style={st.tx16(darktheme)}>
                {UserMeta?.FN} {UserMeta?.LN}
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

          {ShowScheduleDate()}

          <View style={st.mt_v}>
            <MentionInput
              value={caption}
              onChange={text => {
                setCaption(text);
                checkYoutbURl(text);
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
            {errors?.userNumber && (
              <Text style={st.error}>{errors?.userNumber}</Text>
            )}
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
                  console.log({text})
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

          {utubeUrl && utubeId && (
            <View style={{width: '100%', height: 260}}>
              <TouchableOpacity
                onPress={() => {
                  setUtubeId('');
                  setUtubeUrl(false);
                  setLink('');
                }}>
                <Icon name="close-circle" size={25} color={colors.skyblue} />
              </TouchableOpacity>

              <YoutubePlayer height={300} play={false} videoId={utubeId} />
            </View>
          )}

          {attachment && (
            <View style={st.mt_v}>
              <View>
                <Image
                  source={{uri: attachment ? attachment?.uri : null}}
                  style={styles.imgsty}
                />
                <Icon
                  name={'close'}
                  size={20}
                  color={colors.skyblue}
                  style={styles.closebtn}
                  onPress={() => {
                    setAttachment(null);
                    setDisabled(true);
                  }}
                />
              </View>
            </View>
          )}

          <View style={st.mt_v}>
            <AvatarImageWithPicker />
            <View>
              <Pressable
                style={[st.row, st.align_C, st.mt_B]}
                onPress={() => setShowModal(!showModal)}>
                <Image source={images.quiz} style={st.icnsty} />
                <Text style={st.tx14(darktheme)}>Quiz</Text>
              </Pressable>
            </View>
            <SchedulePost />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBtn}>
        <Authbtn
          title="Post"
          onPress={() => {
            if (!attachment) {
              handleSubmitPress('', '1');
            } else {
              userMediaPost_handle();
            }
          }}
          disabled={disabled}
        />
      </View>

      {loading && <Loader />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        style={[styles.center]}
        onBackdropPress={() => setShowModal(!showModal)}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View>
          <View style={styles.modalView(darktheme)}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={styles.closeIconCont}>
              <Icon
                name="arrow-back"
                color={colors.skyblue}
                size={25}
                style={styles.closeIcon}
              />
            </TouchableOpacity>

            <ScrollView keyboardShouldPersistTaps={'handled'} style={st.flex}>
              <View style={[st.pd20]}>
                {ShowScheduleDate()}
                <View>
                 
                  <MentionInput
                    value={quizQus?.question}
                    onChange={text => {
                      handleOnchange(text, 'question');
                      setDisabled(false);
                      quizUtubehandle(text);
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
                        style={[styles.inputsty, st.tx14_s(darktheme), st.mt_B]}
                        placeholder="Add mentioned users..."
                        placeholderTextColor={colors.grey}
                      />
                    )}
                  </View>

                  {quizutubeUrl && quizutubeId && (
                    <View style={{width: '100%', height: 260}}>
                      <TouchableOpacity
                        onPress={() => {
                          setQuizUtubeId('');
                          setQuizUtubeUrl(false);
                          setLink('');
                        }}>
                        <Icon
                          name="close-circle"
                          size={25}
                          color={colors.skyblue}
                        />
                      </TouchableOpacity>

                      <YoutubePlayer
                        height={300}
                        play={false}
                        videoId={quizutubeId}
                      />
                    </View>
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
                      <View style={st.row} key={n}>
                        <View style={{width: '85%'}}>
                          <Input
                            onChangeText={text => onChangeTextHandle(text, n)}
                            onFocus={() => handleOptionsError(null, n)}
                            placeholder={`Enter Option ${n + 1}`}
                            placeholderTextColor="#808080"
                            darktheme={darktheme}
                            error={optionsErr[n]?.value}
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
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const radio_props = [
  {label: 'Public', value: 0},
  {label: 'Only me', value: 1},
];

const styles = StyleSheet.create({
  bottomBtn: {
    // position: 'absolute',
    // bottom: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
    // right: 20,
    // left: 20,
  },
  inputsty: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  modalView: darktheme => ({
    backgroundColor: darktheme === 'dark' ? '#fff' : '#404040',
    width: '100%',
    height: '100%',
    // borderRadius: 7,
    // marginTop: Dimensions.get('window').height * 0.3,
    borderColor: darktheme === 'dark' ? '#d9d9d9' : '#404040',
    // borderWidth:0.7,
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
  }),
  closeIcon: {
    marginTop: 20,
    marginRight: 20,
  },

  closeIconCont: {
    // alignItems: 'flex-end',
    marginLeft: 20,
  },
  statusCon: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    paddingLeft: 10,
  },
  imgsty: {
    width: 140,
    height: 140,
  },
  closebtn: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  datecont: {
    borderColor: '#e4ecf3',
    borderWidth: 0.7,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f6fbff',
  },
  dropDown: {
    zIndex: 100,
    width: '32%',
  },
  dropDownBorder: {
    zIndex: 100,
    height: 45,
    borderColor: colors.grey,
    borderWidth: 0.7,
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

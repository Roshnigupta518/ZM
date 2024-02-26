import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ScrollView,
  BackHandler,
  Alert,
  Dimensions,
  ActivityIndicator,
  AppState,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import st from '../../../global/styles/styles';
import {instaStory} from '../../../utils/array';
import InstaStory from 'react-native-insta-story';
import PostItems from '../../../components/component-parts/photo';
import Rightsheet from './Rightsheet';
import NavigationDrawerHeader from '../../../components/drawerheader';
import {useFocusEffect} from '@react-navigation/native';
import FloatingButton from '../../../components/floatingbtn';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls/index';
import {icon_color} from '../../../utils/helperfunctions';
import Toast from 'react-native-simple-toast';
import {
  requestUserPermission,
  notificationListner,
  requestNotificationPermission,
} from '../../../pushNoti/NotificationService';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

export default function Dashboard({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [nuggets, setNuggets] = useState(instaStory);
  const [seenStories, setSeenStories] = useState(new Set());
  const [appState, setAppState] = useState(AppState.currentState);
  const [startTime, setStartTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const login_data = useSelector(state => state.login?.data);
  const darktheme = useSelector(state => state.darktheme?.data);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    setTimeout(() => {
      if (appState === 'active') {
        var a = moment();
        var b = moment(currentTime);
        console.log({a, b, startTime});
        console.log(a.diff(b, 'minutes')); // 44700
        brainBitSession_handle();
      }
      return () => {
        clearTimeout();
      };
    }, 5 * 60 * 1000);

    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  }, []);

  const handleAppStateChange = nextAppState => {
    // console.log('App State: ' + nextAppState);
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // console.log('App State: ' + 'App has come to the foreground!');
        // alert(
        //   'App State: ' +
        //   'App has come to the foreground!'
        // );
      }
      setAppState(nextAppState);
    }
  };

  const getVersionApiHandle = async () => {
    try {
      const url = API.GET_VERSION;
      const result = await getApi(url);
      console.log({getVerisonHandle: result.data});
      const data = result.data;
      return data[0]?.CURRENT_VERSION;
    } catch (e) {
      console.log(e);
    }
  };

  const checkForUpdates = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      const latestVersion = await getVersionApiHandle();
      console.log({currentVersion, latestVersion});
      if (latestVersion && currentVersion < latestVersion) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.zm',
                );
              },
            },
            {
              text: 'Remind me later',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  const getFeeds = async () => {
    try {
      const reqData = {
        iToOffset: offset,
        iPageSize: pageSize,
      };
      const url = API.GETFEEDS;
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);

        // console.log({offset, pageSize});

        if (result.status == 200) {
          let newData = result.data.Response;
          // console.log({newData: newData[0]});
          if (newData?.length > 0) {
            setOffset(offset + 5);
            setPageSize(pageSize + 5);
            // After the response increasing the offset and pagesize
            setData([...data, ...newData]);
            setLoading(false);
            setRefreshing(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
            setRefreshing(false);
          }
        }
      } else {
        console.log({reqData, loading, isListEnd, url});
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
      setIsListEnd(true);
    }
  };

  const getNuggests = async () => {
    const url = API.GetInsightsData;
    const param = {
      iblankin: '',
    };
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({getNuggests: result.data});
      if (result.status == 200) {
        const data = result?.data;
        // console.log({newArray: data[0].stories});  InstaStoryNo

        if (data?.length > 0) {
          const key = 'InstaStoryNo';

          const tempdata = [...nuggets, ...data];

          const arrayUniqueByKey = [
            ...new Map(tempdata.map(item => [item[key], item])).values(),
          ];
          setNuggets(arrayUniqueByKey);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost_handle = async id => {
    const reqData = {
      ipostId: id,
    };
    const api = API.DeletePost;
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      // console.log({result});
      if (result.status == 200) {
        let newData = result.data;
        console.log({newData});
        Toast.show(newData?.message[1], Toast.LONG);
        setLoading(false);
        let deletedData = data.filter(function (a) {
          return a.PID != id;
        });
        setData(deletedData);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const hidePost_handle = async id => {
    const reqData = {
      ipostId: id,
    };

    setLoading(true);
    const api = API.HidePost;
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      console.log({result});
      if (result.status == 200) {
        let newData = result?.data;
        console.log({hidePost: newData});

        setLoading(false);
        Toast.show(newData?.message[1], Toast.LONG);
        let hidedataremoved = data.filter(function (a) {
          return a.PID != id;
        });
        setData(hidedataremoved);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const unSavedPost_handle = async id => {
    const reqData = {
      ipostId: id,
    };

    setLoading(true);
    const api = API.unSavedPostItem;
    try {
      const result = await postApi(api, reqData, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        let newData = result.data;
        Toast.show(newData?.message[1], Toast.LONG);
        // console.log({newData})
        const tempdata = [...data];
        let objIndex = tempdata.findIndex(obj => obj.PID == id);
        tempdata[objIndex].SAVE_ID = null;
        setData(tempdata);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  const quizVote_handle = async (id, vote, postId) => {
    const url = API.MakeQuizVote;
    const params = {
      iquizId: id,
      ivoteOpt: vote,
    };
    console.log({params});
    try {
      const result = await postApi(url, params, login_data.accessToken);
      console.log({quizVote_handle: result.data});
      if (result.status == 200) {
        let newData = result.data;
        Toast.show(newData?.message[1], Toast.LONG);
        const quiz_data = newData?.message[2];
        const tempdata = [...data];
        let objIndex = tempdata.findIndex(obj => obj.PID == postId);
        tempdata[objIndex].QUIZ_DATA = quiz_data;
        setData(tempdata);
        return quiz_data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const gotoCommnetScreen = postDetails => {
    navigation.navigate('Comment', {postDetails: postDetails});
  };

  const gotoProfileTab = fromWall => {
    console.log({fromWall});
    if (login_data?.response?.ZRTC == fromWall) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('ViewOtherProfile', {fromWall: fromWall});
    }
  };

  const gotoDetails = itemDetails => {
    navigation.navigate('Details', {itemDetails: itemDetails});
  };

  const gotoSavePost = PID => {
    navigation.navigate('SavePost', {postId: PID, saved: false});
  };
  const gotoReport = (postId, userId) => {
    navigation.navigate('Report', {postId: postId, userId: userId});
  };
  const gotoEditPost = PID => {
    navigation.navigate('EditPost', {postId: PID});
    setCreatePost(true);
  };

  const gotoSharePost = PID => {
    navigation.navigate('SharePost', {shareId: PID});
  };

  const gotoInterest = () => {
    navigation.navigate('Interest');
  };

  const gotoNotes = () => {
    navigation.navigate('Notes');
  };

  const gotoSavedPost = () => {
    navigation.navigate('SavePost', {saved: true});
  };

  useEffect(() => {
    console.log('createPost value', login_data);
    if (!createPost) {
      // console.log('inside if createPost value', createPost);
      const unsubscribe = navigation.addListener('focus', () => {
        setOffset(0);
        setPageSize(5);
        getFeeds();
        onRefresh();
      });

      return () => {
        unsubscribe;
      };
    }

    // const unsubscribeVersion = navigation.addListener('focus', () => {
    //   checkForUpdates();
    // });
    // return unsubscribeVersion;
  }, [navigation]);

  useEffect(() => {
    getNuggests();
    requestNotificationPermission();
    requestUserPermission();
    notificationListner();
    checkForUpdates();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setData([]);
    setOffset(0);
    setPageSize(5);
    getFeeds();
    setRefreshing(false);
    setIsListEnd(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Zeroos',
          'Are you sure you want to exit the application?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
        );
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const onlikePress = async (postId, like) => {
    const url = API.PostsLikerCall;
    const param = {
      iPostId: postId,
      iLikeAs: like == 'false' ? 'Liked' : 'Unliked',
    };
    console.log({param});
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({postLike: result.data});
      if (result.status == 200) {
        const postLike = result.data;
        const tempdata = [...data];

        let objIndex = tempdata.findIndex(obj => obj.PID == postId);
        // console.log('Before update: ', tempdata[objIndex]);
        if (like == 'true') {
          tempdata[objIndex].ULIKED = 'false';
          tempdata[objIndex].PLIKES = tempdata[objIndex].PLIKES - 1;
        } else {
          tempdata[objIndex].ULIKED = 'true';
          tempdata[objIndex].PLIKES = tempdata[objIndex].PLIKES + 1;
        }
        setData(tempdata);

        console.log('After update: ', tempdata[objIndex]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nuggetActivity_handle = async storyIds => {
    const url = API.nugget_activity;
    const param = {
      // _USER_ID: login_data.response.ZRTC,
      UserId: login_data?.response?.ZRID,
      NuggetId: storyIds, // [1,2,3]
    };
    console.log({param, url});
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({nuggetActivity_handle: result.data});
      if (result.status == 200) {
        //-----goto
      }
    } catch (e) {
      console.log(e);
    }
  };

  const brainBitSession_handle = async () => {
    const url = API.update_brainbitSession;
    const param = {
      _USER_ID: login_data.response.ZRID,
      // _USER_ID: 123456,
    };
    console.log({param});
    try {
      const result = await postApi(url, param, login_data.accessToken);
      console.log({brainBitSession_handle: result.data});
      if (result.status == 200) {
        //-----goto
      }
    } catch (e) {
      console.log(e);
    }
  };

  const ItemView_posts = ({item, index}) => {
    return (
      <PostItems
        item={item}
        index={index}
        darktheme={darktheme}
        onlikePress={() => onlikePress(item?.PID, item?.ULIKED)}
        fromWall={true}
        deletePost_handle={deletePost_handle}
        hidePost_handle={hidePost_handle}
        unSavedPost_handle={unSavedPost_handle}
        gotoCommnetScreen={gotoCommnetScreen}
        gotoProfileTab={gotoProfileTab}
        gotoDetails={gotoDetails}
        gotoSavePost={gotoSavePost}
        gotoEditPost={gotoEditPost}
        gotoReport={() => gotoReport(item?.PID, item.ZRUSERID)}
        gotoSharePost={() => gotoSharePost(item?.PID)}
        login_data={login_data}
        quizVote_handle={quizVote_handle}
        gotoInterest={gotoInterest}
      />
    );
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={st.emptyliststy}>
        {!loading && <Text style={st.tx14_s(darktheme)}>No Data Found</Text>}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={st.listfooter}>
        {loading ? (
          <ActivityIndicator
            color={icon_color(darktheme)}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };

  const handleSeenStories = async item => {
    console.log({onClose: item});
    const storyIds = [];
    seenStories.forEach(storyId => {
      if (storyId) storyIds.push(storyId);
    });
    console.log({storyIds});

    // if (storyIds.length > 0) {
    //   nuggetActivity_handle(storyIds)
    // }
  };

  const updateSeenStories = ({story: {story_id}}) => {
    console.log({seen: story_id});
    // setSeenStories(prevSet => {
    //   prevSet.add(story_id);
    //   return prevSet;
    // });
    nuggetActivity_handle(story_id);
  };

  const ListHeaderComponent = () => {
    return (
      <InstaStory
        data={nuggets}
        duration={10}
        onStart={(item, index) => {}}
        onStorySeen={updateSeenStories}
        onClose={handleSeenStories}
        // customSwipeUpComponent={<View></View>}
        style={{marginTop: 10}}
        // storyImageStyle={{flex: 1}}
      />
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <NavigationDrawerHeader
        navigationProps={navigation}
        darktheme={darktheme}
      />
      {/* <Text onPress={() => console.log({nuggets})}>seenNuggets</Text> */}
      <FlatList
        contentContainerStyle={[st.pd20, st.pdT0]}
        keyboardShouldPersistTaps={'handled'}
        data={data}
        renderItem={ItemView_posts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={getFeeds}
        onEndReachedThreshold={0.5}
      />

      <FloatingButton
        onPress={() => {
          navigation.navigate('Post');
          setCreatePost(true);
        }}
      />
    </View>
  );
}

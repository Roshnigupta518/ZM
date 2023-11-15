import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import Toast from 'react-native-simple-toast';
import {images} from '../../../global/theme/Theme';
import WithImageUpload from '../../../HOCs/imageUploader';
import {getPickerImageResp} from '../../../utils/helperfunctions';
import NavigationDrawerHeader from '../../../components/drawerheader';
import PostItems from '../../../components/component-parts/photo';
import {naugets_data} from '../../../utils/array';
import ProfileImg from '../../../components/profileImg';
import {API} from '../../../utils/endpoints';
import {postApi, uploadApi} from '../../../utils/apicalls';
import {icon_color} from '../../../utils/helperfunctions';
import {setUserMeta} from '../../../redux/reducers/UserMeta';
import Loader from '../../../components/Loader';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const ViewOtherProfile = ({navigation, route}) => {
  let listViewRef;
  const [attachment, setAttachment] = useState(null);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState(null);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const fromWall = route?.params?.fromWall?.replace(/@/g, '');

  const getFeed = async () => {
    const url = API.GetProfilePostsData;
    const reqData = {
      iPrometheus: fromWall,
      iToOffset: offset,
      iPageSize: pageSize,
    };
    console.log({reqData, token:login_data.accessToken})
    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);
        console.log({offset, pageSize});
        if (result.status == 200) {
          let newData = JSON.parse(result?.data?.Response);
        //   console.log({getFeednewData: newData[0]});
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
      }
    } catch (e) {
      console.log(e);
      setIsListEnd(true);
      setLoading(false);
    }
  };

  const getProfileMeta = async () => {
    const url = API.GetProfileInformeta;
    const param = {
      iPrometheus: fromWall,
    };
    // setIsLoading(true);
    try {
      const result = await postApi(url, param, login_data.accessToken);
      // console.log({getProfileMeta: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result?.data?.Response);
        let tempdata = null;
        for (let i = 0; data.length > i; i++) {
          tempdata = data[i];
        }
        setIsLoading(false);
        // console.log({tempdata});
        setMetaData(tempdata);
        dispatch(setUserMeta(tempdata));
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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

  const EmptyListMessage = ({item}) => {
    return (
      <View style={st.emptyliststy}>
        {!loading && <Text style={st.tx14_s(darktheme)}>No Data Found</Text>}
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <View style={st.pd20}>
          <AvatarImageWithPicker />
          <View>
            <View style={st.align_C}>
              <View style={st.mt_t15}>
                <Text
                  style={[st.tx18(darktheme), st.txAlignC]}
                  numberOfLines={1}>
                  {metaData?.FN} {metaData?.LN}
                </Text>
                <Text
                  style={[st.tx12(darktheme), st.txAlignC]}
                  numberOfLines={1}>
                  {metaData?.PM}
                </Text>
              </View>
             
            </View>
          </View>
          <View style={[st.row, st.mt_t10]}>
            <TouchableOpacity
              style={styles.statsbox}
              onPress={() => navigation.navigate('Followers', {mode: false,userID:fromWall})}>
              <Text style={st.tx30(darktheme)}>{metaData?.FLLWRS}</Text>
              <Text style={st.tx12(darktheme)}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statsbox}
              onPress={() => onFabPress()}>
              <Text style={st.tx30(darktheme)}>
                {data.length > 0 ? data[0]?.TOTAL : 0}
              </Text>
              <Text style={st.tx12(darktheme)}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statsbox}
              onPress={() => navigation.navigate('Followers', {mode: true,userID:fromWall})}>
              <Text style={st.tx30(darktheme)}>{metaData?.FLLWNG}</Text>
              <Text style={st.tx12(darktheme)}>Followings</Text>
            </TouchableOpacity>
          </View>
        </View>

        

        <View style={st.pd_H20}>
          <View style={[st.editboxsty(darktheme), st.mt_t10]}>
            <Text style={[st.tx16(darktheme), st.txAlignC]}>Posts</Text>
          </View>
        </View>
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

  useEffect(() => {
    getFeed();
    console.log({fromWall})
  }, []);

  useEffect(() => {
    getProfileMeta();
  }, [isFocused]);

  const uploadProfileToServer = async res => {
    const imageResp = getPickerImageResp(res);
    setAttachment(imageResp);
  };

  const AvatarImageWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <Pressable
        style={[st.align_C, st.mt_B]}
        // onPress={handleImageUpload}
        {...props}>
        <View>
          <View>
            {!attachment ? (
              <ProfileImg url={metaData?.UI} style={styles.profileImage} />
            ) : (
              <Image
                source={attachment ? {uri: attachment?.uri} : images?.user}
                style={styles.profileImage}
              />
            )}
            {/* <View style={styles.active} /> */}
          </View>
          {/* <Image style={styles.plusty} source={images.plus} /> */}
        </View>
      </Pressable>
    ),
    uploadProfileToServer,
    null,
  );

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
        } else {
          tempdata[objIndex].ULIKED = 'true';
        }
        setData(tempdata);
      }
    } catch (e) {
      console.log(e);
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

  const gotoCommnetScreen = postDetails => {
    navigation.navigate('Comment', {postDetails: postDetails});
  };
  const gotoProfileTab = fromWall => {
    navigation.navigate('ProfileTab', {fromWall: fromWall});
  };
  const gotoDetails = itemDetails => {
    navigation.navigate('Details', {itemDetails: itemDetails});
  };
  const gotoSavePost = PID => {
    navigation.navigate('SavePost', {postId: PID});
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

  const renderItem = ({item, index}) => {
    return (
      <PostItems
        item={item}
        index={index}
        darktheme={darktheme}
        mode={'ownPost'}
        onlikePress={() => onlikePress(item?.PID, item?.ULIKED)}
        fromWall={false}
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
      />
    );
  };

  const onFabPress = () => {
    listViewRef?.scrollToIndex({
      animated: true,
      index: 0,
    });
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <FlatList
        ref={ref => (listViewRef = ref)}
        contentContainerStyle={st.pd_H20}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={EmptyListMessage}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={renderFooter}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={getFeed}
        onEndReachedThreshold={0.5}
      />
      {isloading && <Loader />}
    </View>
  );
};

export default ViewOtherProfile;

const styles = StyleSheet.create({
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#efefef',
  },
  pillButton: {
    backgroundColor: 'white',
  },
  pillActive: {
    backgroundColor: 'yellow',
  },
  pillLabel: {
    color: 'gray',
  },
  activeLabel: {
    color: 'white',
  },
  plusty: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: -5,
    right: 15,
  },

  infoContainer: {
    alignSelf: 'center',
    alignItem: 'center',
  },
  imgsty: {
    width: 140,
    height: 140,
  },
  active: {
    backgroundColor: 'green',
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    top: 90,
    left: 10,
  },
  mediaImageContainer: {
    width: 150,
    height: 100,
    left: 10,
    overflow: 'hidden',
    margin: 16,
    top: 1,
    bottom: 40,
    border: '40%',
    alignItems: 'center',
    borderRadius: 20,
  },
  statsbox: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    left: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  itemsty: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
});

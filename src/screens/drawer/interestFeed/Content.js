import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import st from '../../../global/styles/styles';
  import {useDispatch, useSelector} from 'react-redux';
  import Icon from 'react-native-vector-icons/Ionicons';
  import {postApi} from '../../../utils/apicalls';
  import {API} from '../../../utils/endpoints';
  import Header from '../../../components/header/Header';
  import {icon_color} from '../../../utils/helperfunctions';
  import PostItems from '../../../components/component-parts/photo';
  import Toast from 'react-native-simple-toast';
  
  const Feeds = ({navigation, route, interestId}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [pageSize, setPageSize] = useState(5);
  
    const [isListEnd, setIsListEnd] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
    const [createPost, setCreatePost] = useState(false);
    const [type, setType] = useState('');
    // const interestId = route?.params?.interestId;
  
    const darktheme = useSelector(state => state.darktheme?.data);
    const login_data = useSelector(state => state.login?.data);
  
    const getInterestHandle = async (
      o = offset,
      p = pageSize,
      t = type,
      isListEnd,
    ) => {
      console.log('call again interest-----------------', data.length);
      try {
        const reqData = {
          iToOffset: o,
          iPageSize: p,
          interest: interestId,
          type: t,
        };
        console.log({reqData, loading, isListEnd});
        const url = API.GET_INTEREST;
        if (!loading && !isListEnd) {
          console.log('****************');
          setLoading(true);
          const result = await postApi(url, reqData, login_data.accessToken);
          console.log({reqData});
          console.log({result: result?.data});
          if (result?.status == 200) {
            let newData = result?.data?.Response?.result;
            console.log({newData: newData?.length});
  
            if (newData?.length > 0) {
              setOffset(o + 5);
              setPageSize(p + 5);
              // After the response increasing the offset and pagesize
              const tempdata = [...data, ...newData];
              const key = 'PID';
  
              const arrayUniqueByKey = [
                ...new Map(tempdata.map(item => [item[key], item])).values(),
              ];
              setData(arrayUniqueByKey);
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
        console.log('error', e);
        setLoading(false);
        setIsListEnd(false);
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
  
          console.log('After update: ', tempdata[objIndex]);
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
      console.log('myvlvk',fromWall)
      if (login_data?.user?.ZRTC == fromWall) {
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
      navigation.navigate('Interest')
    }
  
    useEffect(() => {
      getInterestHandle();
    }, []);
  
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
  
    const EmptyListMessage = ({item}) => {
      return (
        <View style={st.emptyliststy}>
          {!loading && <Text style={st.tx14_s(darktheme)}>No Data Found</Text>}
        </View>
      );
    };
  
    const onRefresh = () => {
      setData([]);
      setRefreshing(true);
      getInterestHandle(0, 5, type, false);
      setRefreshing(false);
    };
  
    return (
      <View style={st.flex}>
        {/* <Header
          title={''}
          onPress={() => navigation.goBack()}
          darktheme={darktheme}
          interestType={true}
          onPressInterestAll={() => {
            setData([]);
            setType('ALL');
            getInterestHandle(0, 5, 'ALL', false);
          }}
          onPressContent={() => {
            setData([]);
            setType('');
            getInterestHandle(0, 5, '', false);
          }}
        /> */}
  
        <FlatList
          contentContainerStyle={[st.pd20]}
          keyboardShouldPersistTaps={'handled'}
          data={data}
          renderItem={ItemView_posts}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderFooter}
          onEndReached={() => {
            getInterestHandle(offset, pageSize, type, isListEnd);
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  };
  
  export default Feeds;
  
  const styles = StyleSheet.create({});
  
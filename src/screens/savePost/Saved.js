import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import st from '../../global/styles/styles';
import {useSelector} from 'react-redux';
import {naugets_data} from '../../utils/array';
import PostItems from '../../components/component-parts/photo';
import {API} from '../../utils/endpoints';
import {postApi} from '../../utils/apicalls';
import {useEffect} from 'react';
import {icon_color} from '../../utils/helperfunctions';

const Saved = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const labelId = route?.params?.LABEL_ID;

  const getDataSaved = async () => {
    const params = {
      iLabelId: labelId,
      iToOffset: offset,
      iPageSize: pageSize,
    };
    console.log({getDataSaved: params});
    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const url = API.GET_SAVED;
        const result = await postApi(url, params, login_data.accessToken);
        if (result.status == 200) {
          console.log({getsavedList: result.data});
          let newData = result?.data?.Response;
          console.log({result: newData});
          console.log({offset, pageSize});
          if (newData?.length > 0) {
            setOffset(offset + 10);
            setPageSize(pageSize + 10);
            setData([...data, ...newData]);
            setLoading(false);
            setRefreshing(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
            setRefreshing(false);
          }
        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
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
        let newData = result.data.Response;
        // console.log({newData})
        setLoading(false);
        getFeeds();
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
        let newData = result.data.Response;
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
    navigation.navigate('SavePost', {postId: PID});
  };
  const gotoEditPost = PID => {
    navigation.navigate('EditPost', {postId: PID});
  };
  const gotoReport = (postId, userId) => {
    navigation.navigate('Report', {postId: postId, userId: userId});
  };
  const gotoSharePost = PID => {
    navigation.navigate('SharePost', {shareId: PID});
  };

  const gotoInterest = () => {
    navigation.navigate('Interest')
  }
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

  useEffect(() => {
    getDataSaved();
  }, []);

  const onlikePress = (like, index) => {
    const tempData = [...data];
    tempData[index].likeStatus = like;
    setData(tempData);
  };

  const ItemView_posts = ({item, index}) => {
    console.log({savedtagusr: item.TaggUser})
    return (
      <PostItems
        item={item}
        // navigation={navigation}
        darktheme={darktheme}
        mode={'ownPost'}
        onlikePress={() => onlikePress(!item.likeStatus, index)}
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
        <Text style={st.tx14_s(darktheme)}>No Data Found</Text>
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

  const onRefresh = () => {
    getDataSaved();
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Saved'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />

      <FlatList
        contentContainerStyle={st.pd20}
        data={data}
        renderItem={ItemView_posts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        onEndReached={getDataSaved}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});

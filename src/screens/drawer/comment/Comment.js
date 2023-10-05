import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../global/styles/styles';
import Header from '../../../components/header/Header';
import {useSelector} from 'react-redux';
import ProfileImg from '../../../components/profileImg';
import Input from '../../../components/input';
import {icon_color} from '../../../utils/helperfunctions';
import Icon from 'react-native-vector-icons/AntDesign';
import {environment} from '../../../utils/constant';
import {postApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';
import CommentMenu from './CommentMenu';
import {colors} from '../../../global/theme/Theme';
import Material from 'react-native-vector-icons/MaterialIcons';
import PopUpMessage from '../../../components/popup';
import Toast from 'react-native-simple-toast';

const regex = /(<([^>]+)>)/gi;

const Comment = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyloading, setReplyLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [rplyOnComment, setrplyOnComment] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isListEnd, setIsListEnd] = useState(false);
  const [isReplyListEnd, setIsReplyListEnd] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [replyCmnt, setReplyCmnt] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [replyData, setReplyData] = useState([]);
  const [replyId, setReplyId] = useState();
  const [replyOffest, setReplyOffset] = useState(0);
  const [replyPageSize, setReplyPageSize] = useState(5);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const UserMeta = useSelector(state => state.UserMeta?.data);
  const userdata = login_data;

  const postDetails = route?.params?.postDetails;

  const getDataComment = async () => {
    const params = {
      iPostId: postDetails.PID,
      iToOffset: offset,
      iPageSize: pageSize,
    };
    // console.log({offset, pageSize});
    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const url = API.GetComments;
        const result = await postApi(url, params, login_data.accessToken);
        // console.log({newDataForComment:result});
        if (result.status == 200) {
          let newData = JSON.parse(result?.data?.message);
          console.log({newData: newData});
          if (newData.length > 0) {
            setOffset(offset + 5);
            setPageSize(pageSize + 5);
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
          console.log('status commet get', result.status);
          setRefreshing(false);
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const postCommnet_handle = async () => {
    const param = {
      iPostId: postDetails.PID,
      iComment: comment,
    };

    try {
      const url = API.ON_COMMENT;
      const result = await postApi(url, param, login_data.accessToken);
      setLoading(true);
      if (result.status == 200) {
        console.log('post domment', result.data);
        let newData = JSON.parse(result?.data?.message);
        let newArr = newData.map(i => ({...i, ULIKED: 'false'}));
        // console.log({postCommnet: newData});
        setData([...data, ...newArr]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const commentReplyHandle = async () => {
    const param = {
      iPostId: postDetails.PID,
      iCmntId: commentId,
      iComment: comment,
    };
    try {
      const url = API.COMMENT_REPLY;
      console.log('calling handle reply', param);
      const result = await postApi(url, param, login_data.accessToken);
      setLoading(true);
      if (result.status == 200) {
        console.log({result: result.data});
        let newData = JSON.parse(result?.data?.message);
        const updatedCmtData = data?.map(x =>
          x.CID === commentId
            ? {...x, CRPLYS: parseInt(x.CRPLYS ? x.CRPLYS : 0 + 1)}
            : x,
        );

        const updatedRplyData = replyData?.map(x =>
          x.CID === commentId
            ? {...x, CRPLYS: parseInt(x.CRPLYS ? x.CRPLYS : 0 + 1)}
            : x,
        );

        setData(updatedCmtData);
        setReplyData(updatedRplyData);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const deleteComment_handle = async () => {
    const param = {
      ipostId: postDetails.PID,
      icmntId: commentId,
    };
    // console.log({param});

    try {
      const url = API.DeleteComment;
      const result = await postApi(url, param, login_data.accessToken);
      if (result.status == 200) {
        // console.log('delete domment', result.data);
        let newData = result?.data;
        // console.log({postCommnet: newData});
        let deletedData = data?.filter(function (a) {
          return a.CID != commentId;
        });

        let deletedReplyData = replyData?.filter(function (a) {
          return a.CID != commentId;
        });

        Toast.show(newData?.message[1], Toast.LONG);
        // console.log({deletedData});
        setData(deletedData);
        setReplyData(deletedReplyData);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const hideComment_handle = async commentId => {
    const param = {
      ipostId: postDetails.PID,
      icmntId: commentId,
    };
    console.log({param});

    try {
      const url = API.hideComment;
      const result = await postApi(url, param, login_data.accessToken);
      if (result.status == 200) {
        console.log('hide domment', result.data);
        let newData = result?.data;
        console.log({hideCommnet: newData});

        const updatedData = data.map(x =>
          x.CID === commentId ? {...x, UHIDED: 'true'} : x,
        );
        // console.log({updatedData});
        Toast.show(newData?.message[1], Toast.LONG);
        setData(updatedData);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const commentLiker_handle = async (commentId, like, replyCmtLke) => {
    const param = {
      iPostId: postDetails.PID,
      iCmntId: commentId,
      iLikeAs: like == 'false' ? 'Liked' : 'Unliked',
    };
    console.log({param});

    try {
      const url = API.CommentsLikerCall;
      const result = await postApi(url, param, login_data.accessToken);
      if (result.status == 200) {
        console.log('CommentsLikerCall', result.data);
        const commentLike = result.data;
        const tempdata = [...data];
        const tempReply = [...replyData];
        if (commentLike.ResponseId == 1) {
          if (replyCmtLke) {
            // console.log('********************reply', replyCmtLke);
            let objIndex = tempReply.findIndex(obj => obj.CID == commentId);
            console.log({objIndex});
            if (like == 'true') {
              tempReply[objIndex].ULIKED = 'false';
            } else {
              tempReply[objIndex].ULIKED = 'true';
            }
            setReplyData(tempReply);
          } else {
            let objIndex = tempdata.findIndex(obj => obj.CID == commentId);
            if (like == 'true') {
              tempdata[objIndex].ULIKED = 'false';
            } else {
              tempdata[objIndex].ULIKED = 'true';
            }
            setData(tempdata);
          }
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getReply_handle = async commentId => {
    console.log('*************callling reply');
    const param = {
      iPostId: postDetails.PID,
      iCmntId: commentId,
      // iToOffset: replyOffest,
      // iPageSize: replyPageSize,
    };

    console.log({param});

    try {
      const url = API.GetCommentRepliesData;
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result?.data?.message);
        console.log({getReply_handle: data});
        setReplyData(data);
      }
    } catch (e) {
      console.log(e);
    }

    // try {
    //   if (!replyloading && !isReplyListEnd) {
    //     setLoading(true);
    //     const url = API.GetCommentRepliesData;
    //     const result = await postApi(url, param, login_data.accessToken);
    //     // console.log({newDataForREply: result.data});
    //     if (result.status == 200) {
    //       let newData = JSON.parse(result?.data?.message);
    //       console.log({newData: newData});
    //       if (newData?.length > 0) {
    //         setReplyOffset(replyOffest + 5);
    //         setReplyPageSize(replyPageSize + 5);
    //         setReplyData([...replyData, ...newData]);
    //         setReplyLoading(false);
    //         setRefreshing(false);
    //       } else {
    //         setIsReplyListEnd(true);
    //         setReplyLoading(false);
    //         setRefreshing(false);
    //       }
    //     } else {
    //       setReplyLoading(false);
    //       setRefreshing(false);
    //       setIsReplyListEnd(true);
    //     }
    //   }
    // } catch (e) {
    //   setReplyLoading(true);
    //   setRefreshing(false);
    //   setIsReplyListEnd(false);
    //   console.log(e);
    // }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={'Delete Comment?'}
        subTitle={'Are you sure you want to delete the comment?'}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        darktheme={darktheme}
        onPress_api={deleteComment_handle}
        twoButton={true}
      />
    );
  };

  const getCommentId = commentId => {
    setCommentId(commentId);
  };

  const renderItem_Reply = ({item, index}) => {
    // console.log({reply: item});
    return (
      <View>
        <View style={[st.row, st.justify_C, st.mt_B]}>
          <View style={st.wdh20} />
          <View style={st.wdh15}>
            <ProfileImg url={item.DP_IMAGE} style={st.profileReplySty} />
          </View>
          <View style={st.wdh55}>
            <View>
              <Text style={st.tx12(darktheme)}>
                <Text style={st.tx14_s(darktheme)}>{item.COMNTD_BY + ' '}</Text>
                {item.UHIDED == 'true'
                  ? 'This comment has been hidded'
                  : item.C_CONTENT}
              </Text>
              <View style={[st.row, st.justify_A]}>
                <View style={st.row}>
                  <Material
                    name={
                      item?.ULIKED == 'false' ? 'favorite-outline' : 'favorite'
                    }
                    size={16}
                    color={
                      item?.ULIKED == 'false' ? icon_color(darktheme) : 'red'
                    }
                    onPress={() => {
                      const replyCmtLke = true;
                      commentLiker_handle(item?.CID, item?.ULIKED, replyCmtLke);
                    }}
                  />

                  <Text style={[st.tx12(darktheme), {marginLeft: 2}]}>
                    {item?.CLIKES && item.CLIKES}
                  </Text>
                </View>

                <Text
                  style={st.tx12(darktheme)}
                  onPress={() => {
                    // alert('Reply');
                    setrplyOnComment(true);
                    setReplyCmnt(item.C_CONTENT);
                    getCommentId(item.CID);
                  }}>
                  Reply {item.CRPLYS}
                </Text>

                <Text style={st.tx12(darktheme)}>{item.CMNTD_AGO}</Text>
              </View>
              {item?.CRPLYS >= 1 && (
                <Pressable
                  onPress={() => {
                    getReply_handle(item.CID);
                    setReplyId(item.CID);
                  }}>
                  <Text style={st.tx14(darktheme)}>View Reply</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={st.wdh10}>
            <CommentMenu
              darktheme={darktheme}
              item={item}
              getId={getCommentId}
              onPopupMessageModalClick={onPopupMessageModalClick}
              hideComment_handle={hideComment_handle}
              login_data={login_data}
            />
          </View>
        </View>
        {replyId == item.CID && (
          <FlatList
            data={replyData}
            keyExtractor={index => index.toString()}
            renderItem={renderItem_Reply}
            // ListFooterComponent={renderReplyFooter}
            // onEndReached={getReply_handle}
            // onEndReachedThreshold={0.5}
          />
        )}
      </View>
    );
  };

  const ItemView_comment = ({item, index}) => {
    return (
      <View>
        <View style={[st.row, st.mt_B, st.justify_C]}>
          <View style={st.wdh20}>
            <ProfileImg url={item.DP_IMAGE} style={st.profileImgSty} />
          </View>
          <View style={st.wdh70}>
            <View>
              <Text style={st.tx12(darktheme)}>
                <Text style={st.tx14_s(darktheme)}>{item.COMNTD_BY + ' '}</Text>
                {item.UHIDED == 'true'
                  ? 'This comment has been hidded'
                  : item.C_CONTENT}
              </Text>
              <View style={[st.row, st.justify_A]}>
                <View style={st.row}>
                  <Material
                    name={
                      item?.ULIKED == 'false' ? 'favorite-outline' : 'favorite'
                    }
                    size={16}
                    color={
                      item?.ULIKED == 'false' ? icon_color(darktheme) : 'red'
                    }
                    onPress={() => {
                      const replyCmtLke = false;
                      commentLiker_handle(item?.CID, item?.ULIKED, replyCmtLke);
                    }}
                  />

                  <Text style={[st.tx12(darktheme), {marginLeft: 2}]}>
                    {item?.CLIKES && item.CLIKES}
                  </Text>
                </View>

                <Text
                  style={st.tx12(darktheme)}
                  onPress={() => {
                    // alert('Reply');
                    setrplyOnComment(true);
                    setReplyCmnt(item.C_CONTENT);
                    getCommentId(item.CID);
                  }}>
                  Reply {item.CRPLYS}
                </Text>

                <Text style={st.tx12(darktheme)}>{item.CMNTD_AGO}</Text>
              </View>
              {item?.CRPLYS >= 1 && (
                <Pressable
                  onPress={() => {
                    getReply_handle(item.CID);
                    setReplyId(item.CID);
                  }}>
                  <Text style={st.tx14(darktheme)}>View Reply</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={st.wdh10}>
            <CommentMenu
              darktheme={darktheme}
              item={item}
              getId={getCommentId}
              onPopupMessageModalClick={onPopupMessageModalClick}
              hideComment_handle={hideComment_handle}
              login_data={login_data}
            />
          </View>
        </View>
        {replyId == item.CID && (
          <FlatList
            data={replyData}
            keyExtractor={index => index.toString()}
            renderItem={renderItem_Reply}
            // ListFooterComponent={renderReplyFooter}
            // onEndReached={getReply_handle}
            // onEndReachedThreshold={0.5}
          />
        )}
      </View>
    );
  };

  const renderItem_emoji = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setComment(comment.concat(item.name));
        }}>
        <Text style={{fontSize: 24}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={st.emptyliststy}>
        <Text style={st.tx14_s(darktheme)}>No comment's yet</Text>
        <Text style={st.tx12(darktheme)}>
          Please start the conversation here.
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            color={icon_color(darktheme)}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };

  const renderReplyFooter = () => {
    return (
      <View style={styles.footer}>
        {replyloading ? (
          <ActivityIndicator
            color={icon_color(darktheme)}
            style={{margin: 15}}
          />
        ) : null}
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={[st.row, st.mt_B]}>
        <View style={st.wdh20}>
          <ProfileImg style={st.profileImgSty} url={postDetails.DP_IMAGE} />
        </View>
        <View style={[st.wdh80, st.justify_C]}>
          <Text style={st.tx14_s(darktheme)}>
            {postDetails.POSTED_BY}
            <Text style={st.tx12(darktheme)}>
              {' ' + postDetails.POSTED_DATE}
            </Text>
          </Text>
          <Text style={st.tx14(darktheme)}>
            {postDetails.P_CONTENT.replace(regex, '')}
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    getDataComment();
  };

  useEffect(() => {
    getDataComment();
    // console.log({UserMeta})
  }, []);

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Comments'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={st.pd20}
        data={data}
        renderItem={ItemView_comment}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={renderFooter}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={getDataComment}
        onEndReachedThreshold={0.5}
      />

      <View style={st.bottomSty}>
        <View>
          {rplyOnComment && (
            <View style={[st.row]}>
              <View style={st.wdh10}>
                <Icon
                  name={'close'}
                  color={icon_color(darktheme)}
                  size={20}
                  onPress={() => setrplyOnComment(false)}
                />
              </View>
              <View>
                <Text style={st.tx12(darktheme)}>{replyCmnt}</Text>
              </View>
            </View>
          )}
          <FlatList
            keyboardShouldPersistTaps="handled"
            style={[st.pd_H20]}
            contentContainerStyle={[st.justify_S, st.flex, st.mt_B]}
            data={emoji}
            horizontal
            renderItem={renderItem_emoji}
          />
        </View>
        <View style={[st.row, st.justify_C]}>
          <View style={st.wdh20}>
            <ProfileImg style={st.profileImgSty} url={UserMeta?.UI} />
          </View>
          <View style={st.wdh70}>
            <Input
              placeholder={'Add a comment'}
              placeholderTextColor="#808080"
              darktheme={darktheme}
              inputsty={{borderWidth: 0}}
              value={comment}
              onChangeText={text => setComment(text)}
              multiline
            />
          </View>
          <View style={[st.wdh10, st.align_E, st.justify_C]}>
            <TouchableOpacity
              onPress={() => {
                if (rplyOnComment) {
                  commentReplyHandle();
                  setrplyOnComment(false);
                  setComment('');
                } else {
                  postCommnet_handle();
                  setComment('');
                }
              }}>
              <Text style={st.tx14_s(darktheme)}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {show_alert_msg()}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});

const emoji = [
  {name: '❤️'},
  {name: '🙌'},
  {name: '🔥'},
  {name: '👏'},
  {name: '😥'},
  {name: '😍'},
  {name: '😮'},
  {name: '😂'},
];
// moment.utc("2019-12-04 12:00:24").local().startOf('seconds').fromNow()

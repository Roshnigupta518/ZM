import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import st from '../../../global/styles/styles';
import ProfileImg from '../../../components/profileImg';
import {colors} from '../../../global/theme/Theme';
import {useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {icon_color} from '../../../utils/helperfunctions';
import PopUpMessage from '../../../components/popup';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';

const Followers = ({navigation, route}) => {
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState(
    'Their posts will no longer show up in your home feed. You can still view their profile, unless their posts are protected.',
  );
  const [id, setId] = useState('');

  const mode = route?.params?.mode;
  const userID = route?.params?.userID;
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const getfollowList = async () => {
    const url = API.FollowPeopleList;
    const param = {
      iPrometheus: userID,
      iFllwType: mode ? 'Following' : 'Followers',
      iToOffset: offset,
      iPageSize: pageSize,
    };
    console.log({param});

    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, param, login_data.accessToken);
        // console.log({result: result.data});
        if (result.status == 200) {
          let newData = result?.data?.Response;
          console.log({newData: newData});
          if (newData?.length > 0) {
            setOffset(offset + 10);
            setPageSize(pageSize + 10);

            setDataSource([...dataSource, ...newData]);
            setLoading(false);
            setRefreshing(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
            setRefreshing(false);
          }
        } else {
        }
      }
    } catch (e) {
      // console.log(e);
      setIsListEnd(true);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const unfollowUser_handle = async () => {
    const url = API.SetFollowUnfollow;
    const param = {
      iPrometheus: id,
      iFollowType: 'UNFOLLOW',
    };
    console.log({param});

    try {
      setIsLoading(true);
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        let newData = result?.data;
        console.log({newData: newData});
        let deletedData = dataSource.filter(function (a) {
          return a.PM != id;
        });
        Toast.show(newData?.message[1], Toast.LONG);
        setDataSource(deletedData);
        setIsLoading(false);
      } else {
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    getfollowList();
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

  const EmptyListMessage = () => {
    return (
      <View style={st.emptyliststy}>
        <Text style={st.tx14_s(darktheme)}>No Data Found</Text>
      </View>
    );
  };

  useEffect(() => {
    getfollowList();
    console.log({userID});
  }, []);

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        darktheme={darktheme}
        twoButton={true}
        onPress_api={unfollowUser_handle}
      />
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={[st.mt_t15]}>
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
            }
            style={st.wdh20}>
            <ProfileImg url={item?.UI} style={st.profileImgSty} />
          </TouchableOpacity>
          <TouchableOpacity
            style={st.wdh50}
            onPress={() =>
              navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
            }>
            <Text style={st.tx14_s(darktheme)}>{item.FN + ' ' + item.LN}</Text>
            <Text style={st.tx12(darktheme)}>{item.PM}</Text>
          </TouchableOpacity>

          {mode && (
            <View style={st.wdh30}>
              <TouchableOpacity
                onPress={() => {
                  onPopupMessageModalClick(true);
                  setId(item.PM);
                  setTitle(`Unfollow ${item.PM} ?`);
                }}
                style={styles.statusSty}>
                <Text
                  style={[st.tx14_s(darktheme), {color: colors.white}]}
                  adjustsFontSizeToFit>
                  {'Unfollow'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      {/* <NavigationDrawerHeader navigationProps={navigation} darktheme={darktheme} /> */}
      <Header
        title={!mode ? 'Followers' : 'Following'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <FlatList
        contentContainerStyle={st.pd20}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={EmptyListMessage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        onEndReached={getfollowList}
        onEndReachedThreshold={0.5}
      />
      {show_alert_msg()}
      {isloading && <Loader />}
    </View>
  );
};
export default Followers;

const styles = StyleSheet.create({
  crdsty: {
    padding: 15,
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 0.8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  postimg: {width: 30, height: 30},
  statusSty: {
    borderRadius: 5,
    backgroundColor: colors.skyblue,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import ScheduleItems from '../../../components/component-parts/scheduleItems';
import {icon_color} from '../../../utils/helperfunctions';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Toast from 'react-native-simple-toast';

const ScheduleList = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getFeeds = async () => {
    try {
      const reqData = {
        iToOffset: offset,
        iPageSize: pageSize,
      };
      const url = API.GetSchdPostsData;
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);

        console.log({offset, pageSize});

        if (result.status == 200) {
          let newData = JSON.parse(result.data.Response);
          console.log({GetSchdPostsData: newData[0]});
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
      console.log('error', e);
      setLoading(false);
      setIsListEnd(true);
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

  const gotoDetails = itemDetails => {
    navigation.navigate('Details', {itemDetails: itemDetails});
  };

  useEffect(() => {
    getFeeds();
  }, []);

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

  const ItemView_posts = ({item, index}) => {
    return (
      <ScheduleItems
        item={item}
        deletePost_handle={() => deletePost_handle(item?.PID)}
        darktheme={darktheme}
        gotoDetails={gotoDetails}
      />
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Schedule Posts'}
        darktheme={darktheme}
      />
      <FlatList contentContainerStyle={st.pd20}
        keyboardShouldPersistTaps={'handled'}
        data={data?.reverse()}
        renderItem={ItemView_posts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={renderFooter}
        onEndReached={getFeeds}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ScheduleList;

const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import st from '../../../global/styles/styles';
import {naugets_data} from '../../../utils/array';
import ProfileImg from '../../../components/profileImg';
import {colors} from '../../../global/theme/Theme';
import Authbtn from '../../../components/Authbtn';
import Header from '../../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {icon_color} from '../../../utils/helperfunctions';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';

const SuggestionScreen = ({navigation, route}) => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const fromWall = route?.params?.fromWall;

  const getSuggesionHandle = async () => {
    const url = API.GetSuggsted;
    const reqData = {
      iToOffset: offset,
      iPageSize: pageSize,
    };

    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);
        // console.log({result: result.data});
        if (result.status == 200) {
          let newData = JSON.parse(result?.data?.Response);
          // console.log({newData: newData[1]});
          if (newData?.length > 0) {
            setOffset(offset + 10);
            setPageSize(pageSize + 10);
            let newArr = newData.map(i => ({...i, follow: false}));
            // After the response increasing the offset and pagesize
            setDataSource([...dataSource, ...newArr]);
            setFilteredDataSource([...dataSource, ...newArr]);
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
      console.log(e);
      setIsListEnd(true);
      setLoading(false);
    }
  };

  const SetFollowUnfollow_handle = async (PM, FOLLOW) => {
    const url = API.SetFollowUnfollow;
    const reqData = {
      iPrometheus: PM,
      iFollowType: FOLLOW ? 'UNFOLLOW' : 'FOLLOW',
    };

    console.log({reqData});

    try {
      setIsLoading(true);
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        const tempdata = [...dataSource];

        let objIndex = tempdata.findIndex(obj => obj.PM == PM);
        if (FOLLOW) {
          tempdata[objIndex].follow = false;
        } else {
          tempdata[objIndex].follow = true;
        }
        setDataSource(tempdata);
        setFilteredDataSource(tempdata);
        setIsLoading(false);
        Toast.show(data?.message[1], Toast.LONG);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = dataSource.filter(function (item) {
        const itemData = item.DN ? item.DN.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(dataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    getSuggesionHandle();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={[st.mt_t15]}>
        <View style={[st.row, st.align_C]}>
          <TouchableOpacity
            style={st.wdh20}
            onPress={() =>
              navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
            }>
            <ProfileImg url={item.UI} style={styles.picsty} />
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={() =>
              navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
            }
          style={st.wdh50}>
            <Text style={st.tx14_s(darktheme)}>{item.DN}</Text>
            <Text style={st.tx12(darktheme)}>{item.PM}</Text>
          </TouchableOpacity>
          <View style={st.wdh30}>
            <TouchableOpacity
              onPress={() => SetFollowUnfollow_handle(item.PM, item?.follow)}
              style={styles.statusSty}>
              <Text
                style={[st.tx14_s, {color: colors.white}]}
                adjustsFontSizeToFit>
                {!item.follow ? 'Follow' : 'Unfollow'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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

  const ListHeaderComponent = () => {
    return (
      <View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => {
            setSearch(text);
            searchFilterFunction(text);
          }}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <View style={st.emptyliststy}>
       {!loading && <Text style={st.tx14_s(darktheme)}>No Data Found</Text>}
      </View>
    );
  };

  const onRefresh = () => {
    getSuggesionHandle();
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Suggestions'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      {ListHeaderComponent()}
      <FlatList
        contentContainerStyle={st.pd20}
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={EmptyListMessage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        onEndReached={getSuggesionHandle}
        onEndReachedThreshold={0.5}
      />
      {!fromWall && (
        <View style={st.pd20}>
          <Authbtn
            title={'NEXT'}
            onPress={() => navigation.navigate('InterestScreen')}
          />
        </View>
      )}
      {isloading && <Loader />}
    </View>
  );
};
export default SuggestionScreen;

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
  picsty: {width: 50, height: 50, borderRadius: 25},
  postimg: {width: 30, height: 30},
  statusSty: {
    borderRadius: 5,
    backgroundColor: colors.skyblue,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authbtn: {
    width: 10,
    height: 20,
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 20,
    borderColor: '#009688',
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    margin: 20,
  },
});

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import st from '../../../global/styles/styles';
import {naugets_data} from '../../../utils/array';
import ProfileImg from '../../../components/profileImg';
import {colors} from '../../../global/theme/Theme';
import {useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {icon_color} from '../../../utils/helperfunctions';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Entypo';

const Saved = ({navigation}) => {
  const [dataSource, setDataSource] = useState(naugets_data);
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getNotification = async () => {
    const url = API.GetUserNotification;
    const reqData = {
      iToOffset: offset,
      iPageSize: pageSize,
    };

    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);

        console.log({offset, pageSize});
        console.log({result: result.data});
        if (result.status == 200) {
          let newData = result.data.Response;
          console.log({newData: newData[0]});
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

  const notificationReadHandle = async () => {
    try {
      const url = API.NOTIF_READ;
      const params = {
        rutype: 1,
        noidfor: 0,
      };

      const result = await postApi(url, params, login_data.accessToken);
      if (result.status == 200) {
        const Notidata = result.data;
        Toast.show(Notidata?.MessageText, Toast.LONG);
        const arr = data.map(obj => {
          return {...obj, NR: 1};
        });
        setData(arr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
        }
        style={[st.mt_t15]}>
        <View style={[styles.crdsty, st.bgCardColor(darktheme)]}>
          <View style={[st.row, st.align_C]}>
            <View style={st.wdh20}>
              {item.NR == 0 && (
                <Icon
                  name="dot-single"
                  size={35}
                  color={colors.danger}
                  style={{position: 'absolute', top: -8, left: -3}}
                />
              )}
              <ProfileImg url={item.UI} />
            </View>
            <View style={st.wdh70}>
              <Text style={st.tx14(darktheme)}>
                <Text style={st.tx14_s(darktheme)}>
                  {item.FN + ' ' + item.LN + ' '}
                </Text>
                {item.NX}
              </Text>
              <Text style={st.tx14(darktheme)}>{item.ND}</Text>
            </View>
            <View style={[st.wdh10, st.align_E]}>
              <Image source={{uri: item.postImg}} style={styles.postimg} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Notifications'}
        darktheme={darktheme}
        notification={true}
        onPressNotif={() => notificationReadHandle()}
      />
      <FlatList
        contentContainerStyle={st.pd20}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListFooterComponent={renderFooter}
        onEndReached={getNotification}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={EmptyListMessage}
      />
    </View>
  );
};
export default Saved;

const styles = StyleSheet.create({
  crdsty: {
    padding: 15,
    borderRadius: 10,
    // borderColor: colors.grey,
    // borderWidth: 0.8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 1,
  },
  picsty: {width: 40, height: 40, borderRadius: 20},
  postimg: {width: 30, height: 30},
});

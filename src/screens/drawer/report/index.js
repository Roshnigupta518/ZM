import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {icon_color} from '../../../utils/helperfunctions';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Loader from '../../../components/Loader';

const Report = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const postId = route?.params?.postId;
  const userId = route?.params?.userId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReportData = async () => {
    const url = API.GetReportCatgData;
    const params = {TagValue: '%%'};
    try {
      const result = await postApi(url, params);
      console.log({result: result});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        console.log({mainCAte: data});
        setData(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[st.mt_B, st.row]}
        onPress={() =>
          navigation.navigate('ReportDetails', {
            options: item.id,
            postId: postId,
            userId:userId
          })
        }>
        <View style={st.wdh90}>
          <Text style={st.tx14(darktheme)}>{item.value}</Text>
        </View>
        <View style={[st.wdh10, st.align_E]}>
          <Icon name={'arrow-right'} size={25} color={icon_color(darktheme)} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = ({}) => {
    return (
      <View style={st.mt_B}>
        <Text style={st.tx16(darktheme)}>Why are you reporting this?</Text>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Report'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />

      <View>
        <FlatList
          contentContainerStyle={st.pd20}
          data={data}
          renderItem={renderItem}
          keyExtractor={index => index.toString()}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});

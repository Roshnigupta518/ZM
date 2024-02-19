import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header/Header';
import {useSelector} from 'react-redux';
import st from '../../global/styles/styles';
import ProfileImg from '../../components/profileImg';
import {colors} from '../../global/theme/Theme';
import {API} from '../../utils/endpoints';
import {getApi} from '../../utils/apicalls';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const timestamp = Date.now();

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  useEffect(() => {
    getSearchData_handle('z');
  }, []);

  const getSearchData_handle = async s => {
    const url = `${API.GetZerosTopSearch}?q=${s}&limit=10&timestamp=${timestamp}`;
    console.log({url});
    try {
      const result = await getApi(url, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        const data = result?.data?.Response;
        console.log({data});
        setFilteredDataSource(data);
        // setMasterDataSource(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const ItemView = ({item}) => {
    return (
      <View style={[st.mt_t15]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewOtherProfile', {fromWall: item.PM})
          }
          style={[st.row, st.align_C]}>
          <View style={st.wdh20}>
            <ProfileImg url={item.UserImage} style={st.profileImgSty} />
          </View>
          <View style={st.wdh80}>
            <Text style={st.tx14_s(darktheme)}>{item.UserName}</Text>
            <Text style={st.tx12(darktheme)}>{item.PM}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={st.emptyliststy}>
        <Text style={st.tx14_s(darktheme)}>No results found</Text>
      </View>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Search Users'}
        darktheme={darktheme}
      />

      <TextInput
        style={styles.textInputStyle(darktheme)}
        onChangeText={text => {
          getSearchData_handle(text);
          setSearch(text);
          // searchFilterFunction(text);
        }}
        value={search}
        underlineColorAndroid="transparent"
        placeholder={"Search Here"}
        placeholderTextColor="#808080"
      />

      <FlatList
        contentContainerStyle={[st.pd20]}
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListEmptyComponent={ListEmptyComponent}
        // ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: darktheme => ({
    height: 40,
    paddingLeft: 20,
    borderColor: '#009688',
    // backgroundColor: '#E8E8E8',
    backgroundColor: darktheme === 'dark' ? '#E8E8E8' : '#1a1a1a',
    borderRadius: 5,
    margin: 20,
    color: darktheme === 'dark' ? colors.black : colors.white,
  }),
  statusSty: {
    borderRadius: 5,
    backgroundColor: colors.skyblue,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;

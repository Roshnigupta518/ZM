import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import st from '../../../global/styles/styles';
import Authbtn from '../../../components/Authbtn';
import Header from '../../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import SelectMultiple from 'react-native-select-multiple';
import PopUpMessage from '../../../components/popup';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function InterestScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedIntId, setSelectedIntId] = useState();
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const getInterestHandle = async () => {
    const reqData = {
      iSearch: '',
    };
    const url = API.GetInterest;
    try {
      setLoading(true);
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({getInterestHandle: result.data.Response});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data.Response;
        const tempdata = [];
        for (let i = 0; data.length > i; i++) {
          let obj = {
            label: data[i].INTEREST,
            value: data[i].INT_ID,
            title: data[i].CATG_TITLE,
          };
          tempdata.push(obj);
        }
        const newArr1 = tempdata.map(v => ({...v, check: false}));
        setData(newArr1);
        setFilteredDataSource(tempdata);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const saveInterestHandle = async () => {
    const reqData = {
      iIntrsts: selectedIntId,
    };
    const url = API.SaveInterest;
    try {
      setLoading(true);
      console.log({url, reqData, accessToken: login_data.accessToken});
      const result = await postApi(url, reqData, login_data.accessToken);
      console.log({saveInterestHandle: result.data});
      if (result.status == 200) {
        setLoading(false);
        navigation.navigate('DrawerNavigationRoutes');
        const data = result.data;
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterestHandle();
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.label
          ? item.label.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

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
        twoButton={false}
      />
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={st.pd20}>
        <Text style={st.tx16(darktheme)}>What are you interested in?</Text>
        <Text style={st.tx14(darktheme)}>
          Select some topics you're interested in, to help personalize your
          zeros experience. Starting with finding people to follow
        </Text>
        <Searchbar
          style={[styles.searchbar, st.mt_t10]}
          placeholder="Search Interest"
          placeholderTextColor={'#808080'}
          // onChangeText={onChangeSearch}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
        />
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <View style={st.emptyliststy}>
        <Text style={st.tx14_s(darktheme)}>Data not found</Text>
      </View>
    );
  };

  const renderLabel = (label, style) => {
    return (
      <View style={[st.row, st.align_C]}>
        <View style={st.ml_15}>
          <Text style={st.tx14(darktheme)}>{label}</Text>
        </View>
      </View>
    );
  };

  const onSelectionsChange = selectedFruits => {
    console.log({selectedFruits});
    setSelectedFruits(selectedFruits);
    const data = selectedFruits;
    const selectedIds = [];
    for (let i = 0; data.length > i; i++) {
      let id = data[i].value;
      selectedIds.push(id);
    }
    console.log({selectedIds: selectedIds?.toString()});
    setSelectedIntId(selectedIds?.toString());
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Interest'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      {ListHeaderComponent()}

      <FlatList
        data={filteredDataSource}
        contentContainerStyle={st.pd_H20}
        renderItem={({item, index}) => {
          // console.log({item});
          return (
            <View>
              <View style={st.mt_B}>
                <Text style={[st.tx16(darktheme), st.txCap, st.mt_t10]}>
                  {item.title}
                </Text>
                <View style={[st.row, st.pd_H20]}>
                  <TouchableOpacity
                    onPress={() => {
                      const mydata = [...filteredDataSource];
                      mydata[index].check = !item.check;
                      setData(mydata);

                      const dataFilter = mydata.filter(i => i.check == true);
                      console.log({dataFilter});

                      const selectedIds = [];
                      for (let i = 0; dataFilter.length > i; i++) {
                        let id = dataFilter[i].value;
                        selectedIds.push(id);
                      }
                      console.log({selectedIds: selectedIds?.toString()});
                      setSelectedIntId(selectedIds?.toString());
                    }}>
                    {/* <Text>{item.check ? 'checked' : 'unchecked'}</Text> */}
                    {item.check ? (
                      <Icon name={'check-box'} size={25} />
                    ) : (
                      <Icon name={'check-box-outline-blank'} size={25} />
                    )}
                  </TouchableOpacity>
                  <Text style={[st.tx14(darktheme), st.txCap, st.ml_15]}>
                    {item.label}
                  </Text>
                </View>
              </View>
              <View style={{borderWidth: 0.7, borderColor: '#ccc'}} />
            </View>
          );
        }}
        // ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={EmptyListMessage}
      />

      <View style={st.pd20}>
        <Authbtn
          title={'Done'}
          onPress={() => {
            if (selectedIntId) {
              saveInterestHandle();
            } else {
              setPopupMessageVisibility(true);
              setTitle('OOPS');
              setSubtitle('Please select atleast one interest');
            }
          }}
        />
      </View>
      {show_alert_msg()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#307ecc',
  },
  chip: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  mainHeading: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  searchbar: {
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  secondHeading: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 10,
  },
});



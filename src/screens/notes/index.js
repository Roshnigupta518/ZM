import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../global/styles/styles';
import Header from '../../components/header/Header';
import {useSelector, useDispatch} from 'react-redux';
import FloatingButton from '../../components/floatingbtn';
import NoteMenu from './NoteMenu';
import {getbgColor} from '../../utils/helperfunctions';
import {API} from '../../utils/endpoints';
import {postApi} from '../../utils/apicalls';
import {icon_color} from '../../utils/helperfunctions';
import {useIsFocused} from '@react-navigation/native';
import PopUpMessage from '../../components/popup';
import Loader from '../../components/Loader';

const Notes = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const IsFocused = useIsFocused();

  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noteId, setNoteId] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);

  const getNotes = async () => {
    const url = API.GetUserNoteDataV;
    const reqData = {
      iToOffset: offset,
      iPageSize: pageSize,
    };

    try {
      if (!loading && !isListEnd) {
        setLoading(true);
        const result = await postApi(url, reqData, login_data.accessToken);
        // console.log({getNotes: result.data});
        if (result.status == 200) {
          let newData = result?.data?.Response;
          // console.log({newData: newData[0]});
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
      console.log(e);
      setLoading(false);
      setIsListEnd(true);
    }
  };

  const deleteNote_handle = async () => {
    const url = API.DeleteUserNote;
    const param = {
      iNoteId: noteId,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url, param, login_data.accessToken);
      // console.log({result: result.data});
      if ((result.status = 200)) {
        let newData = result.data;
        console.log({newData});
        setIsLoading(false);
        let deletedData = dataSource.filter(function (a) {
          return a.ID != noteId;
        });
        setDataSource(deletedData);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOffset(0);
      setPageSize(10);
      getNotes();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={[st.row, st.mt_B, st.noteBox(darktheme), st.bgCardColor(darktheme)]}>
          <View style={st.wdh80}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NoteDetails', {details: item})
              }>
              <View style={[st.row, st.wdh80]}>
                <Text style={st.tx16(darktheme)} numberOfLines={1}>
                  {item.TITLE}
                </Text>
                <View
                  style={[
                    st.statusBoxSty,
                    {backgroundColor: getbgColor(item.TYPE)},
                  ]}>
                  <Text style={[st.tx14_menu, {color: '#fff'}]}>
                    {item.TYPE}
                  </Text>
                </View>
              </View>

              <Text style={st.tx14(darktheme)} numberOfLines={1}>
                {item.NOTE}
              </Text>
              <Text style={[st.tx12(darktheme), st.mt_t10]}>{item.NDATE}</Text>
            </TouchableOpacity>
          </View>
          <View style={[st.wdh20, st.align_E]}>
            <NoteMenu
              darktheme={darktheme}
              navigation={navigation}
              onPopupMessageModalClick={onPopupMessageModalClick}
              getId={() => getNoteId(item.ID)}
            />
          </View>
        </View>
      </View>
    );
  };

  const getNoteId = id => {
    setNoteId(id);
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={'Delete Note?'}
        subTitle={'Are you sure you want to delete?'}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        darktheme={darktheme}
        twoButton={true}
        onPress_api={deleteNote_handle}
      />
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

  const EmptyListMessage = () => {
    return (
      <View style={st.emptyliststy}>
        <Text style={st.tx14_s(darktheme)}>No Data Found</Text>
      </View>
    );
  };

  const onRefresh = () => {
    getNotes();
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Notes'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={st.pd20}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={renderFooter}
        onEndReached={getNotes}
        onEndReachedThreshold={0.5}
      />
      <FloatingButton onPress={() => navigation.navigate('CreateNote')} />
      {show_alert_msg()}
      {isloading && <Loader />}
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({});

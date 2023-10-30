import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../components/header/Header';
import st from '../../global/styles/styles';
import SavedPostItem from '../../components/component-parts/savePostItem';
import FloatingButton from '../../components/floatingbtn';
import Alert from '../../components/alert';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../global/theme/Theme';
import Authbtn from '../../components/Authbtn';
import {API} from '../../utils/endpoints';
import {getApi, postApi} from '../../utils/apicalls';
import Loader from '../../components/Loader';
import {getLabelColor} from '../../utils/helperfunctions';
import PopUpMessage from '../../components/popup';
import {useIsFocused} from '@react-navigation/native';

const Saved = ({navigation, route}) => {
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const darktheme = useSelector(state => state.darktheme?.data);
  const [visible, setVisible] = useState(false);
  const [selectedbg, setSelectedbg] = useState('success');
  const [loading, setLoading] = useState(true);
  const [labelName, setLabelName] = useState('');
  const [labelId, setLabelId] = useState(null);

  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const login_data = useSelector(state => state.login?.data);
  const postId = route?.params?.postId;
  const saved = route?.params?.saved;

  const isFocused = useIsFocused();

  const getData = async () => {
    const param = {
      iblankin: '',
    };
    try {
      const url = API.GetSaveLabel;
      const result = await postApi(url, param, login_data.accessToken);
      setLoading(true);
      if (result.status == 200) {
        // console.log({result: result.data});
        const newData = JSON.parse(result.data.message);
        console.log({newData: newData});
        setDataSource(newData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const savePostHandle = async lblID => {
    const param = {
      ipostId: postId,
      ilabelId: lblID,
      ilabelName: labelName
        ? labelName
        : dataSource?.length > 0 && dataSource[0].LABEL_NAME,
      ilabelColor: selectedbg,
    };
    console.log({param, lblID});
    try {
      setLoading(true);
      const url = API.SavePostItem;
      const result = await postApi(url, param, login_data.accessToken);
      if (result.status == 200) {
        console.log({result: result.data});
        const newData = result.data.message;
        setLabelName('');
        getData();
        setLoading(false);
        setPopupMessageVisibility(true);
        setTitle('Success');
        setSubtitle(newData[1]);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    console.log({saved});
  }, [isFocused]);

  onRadioPress = (index, id, name) => {
    console.log({index, id, name});
    setSelectedIndex(index);
    setLabelId(id);
    setLabelName(name);
    setSelectedbg('');
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    // navigation.goBack();
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
        // onPress_api={deleteComment_handle}
      />
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <SavedPostItem
        item={item}
        darktheme={darktheme}
        index={index}
        saved={saved}
        selectedIndex={selectedIndex}
        onRadioPress={() =>
          onRadioPress(index, item?.LABEL_ID, item?.LABEL_NAME)
        }
        onPress={() => navigation.navigate('Saved', {LABEL_ID: item.LABEL_ID})}
      />
    );
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={st.emptyliststy}>
        {!loading && <Text style={st.tx14_s(darktheme)}>No Data Found</Text>}
      </View>
    );
  };

  const renderItem_color = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
          setSelectedbg(item.bgcolor);
        }}
        style={{
          height: 40,
          backgroundColor: getLabelColor(item.bgcolor),
          width: 150,
        }}></TouchableOpacity>
    );
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={!saved ? 'Save Post To' : 'Save Post'}
        darktheme={darktheme}
        edit={!saved ? true : false}
        onEditHandle={() => {
          if (dataSource?.length > 0) {
            const id = dataSource[0]?.LABEL_ID;
            savePostHandle(id);
          } else {
            setPopupMessageVisibility(true);
            setTitle('Oops!');
            setSubtitle('Create a label');
          }
        }}
      />

      <FlatList
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={[st.pd20]}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        extraData={data}
        ListEmptyComponent={EmptyListMessage}
      />

      {!saved && <FloatingButton onPress={() => setShowModal(!showModal)} />}

      <Alert showModal={showModal} setShowModal={setShowModal}>
        <View style={st.pd20}>
          <Input
            label={'New Label Name'}
            onChangeText={text => setLabelName(text)}
            // onFocus={() => handleError(null, 'userPassword')}
            placeholder="Enter here"
            placeholderTextColor="#808080"
            blurOnSubmit={false}
            darktheme={darktheme}
            value={labelName}
          />
          <View style={st.align_C}>
            <TouchableOpacity
              style={[
                styles.statusCon,
                {backgroundColor: getLabelColor(selectedbg)},
              ]}
              onPress={() => setVisible(!visible)}>
              <Text style={{color: colors.white}}>Select Color</Text>
              <Icon
                name={'chevron-down'}
                size={20}
                style={st.pd_H20}
                color={colors.white}
              />
            </TouchableOpacity>
            {visible && (
              <FlatList
                data={savedData}
                renderItem={renderItem_color}
                keyExtractor={(item, index) => index}
                extraData={data}
              />
            )}

            <Authbtn
              title={'Save'}
              onPress={() => {
                setShowModal(!showModal);
                setLabelId(0);
                savePostHandle(0);
              }}
            />
          </View>
        </View>
      </Alert>

      {show_alert_msg()}
      {loading && <Loader />}
    </View>
  );
};
export default Saved;

const styles = StyleSheet.create({
  statusCon: {
    backgroundColor: 'blue',
    width: 150,
    padding: 15,
    ...st.row,
  },
});

const savedData = [
  {name: 'test1', status: true, bgcolor: 'danger', key: 0},
  {name: 'Utest2', status: false, bgcolor: 'warning', key: 1},
  {name: 'Rtest3', status: false, bgcolor: 'info', key: 2},
  {name: 'Stest4', status: false, bgcolor: 'success', key: 3},
  {name: 'Rtest3', status: false, bgcolor: 'primary', key: 4},
  {name: 'Stest4', status: false, bgcolor: 'default', key: 5},
];

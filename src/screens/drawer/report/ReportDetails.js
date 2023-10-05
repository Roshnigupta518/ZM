import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {icon_color} from '../../../utils/helperfunctions';
import RadioButton from './RadioButton';
import Authbtn from '../../../components/Authbtn';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import Loader from '../../../components/Loader';
import PopUpMessage from '../../../components/popup';

const ReportDetails = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = route.params.options;
  const postId = route?.params?.postId;
  const userId = route?.params?.userId;
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const getReportData = async () => {
    const url = API.GetReportSubCatgData;
    const params = {ctgid: id};
    console.log({subcatePAram: params});
    try {
      const result = await postApi(url, params);
      // console.log({result: result});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        console.log({subcatelist: data});
        setOptions(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportData();
    console.log({login_data: login_data.response});
  }, []);

  const onSelect = item => {
    if (selectedOption && selectedOption.id === item.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  const onSubmitHandle = async () => {
    const url = API.SubmitReport;
    const params = {
      catgId: id,
      catgSubId: selectedOption.id,
      postId: postId,
      reporterId: userId,
      // reporterId: '1047456',
    };
    console.log({reportsubmitPara: params});
    try {
      const result = await postApi(url, params, login_data.accessToken);
      console.log({reportsubmitresult: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        if (data?.ResponseId == 1) {
          setPopupMessageVisibility(true);
          setTitle(data.MessageStatus);
          setSubtitle(data.MessageText);
        } else {
          alert('Already submitted');
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    navigation.navigate('DrawerNavigationRoutes');
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

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Report'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      {loading ? (
        <Loader />
      ) : (
        <View style={st.pd20}>
          <RadioButton
            selectedOption={selectedOption}
            onSelect={onSelect}
            options={options}
          />

          <View style={st.align_C}>
            <Authbtn
              title={'Submit'}
              onPress={() => {
                if (selectedOption) {
                  onSubmitHandle();
                } else {
                  alert('Please select option');
                }
              }}
            />
          </View>
        </View>
      )}

      {show_alert_msg()}
    </View>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({});

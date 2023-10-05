import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import videosData from '../../../components/component-parts/videoPlayer/videosData';
import VideoPlayer from '../../../components/component-parts/videoPlayer';
import {WINDOW_HEIGHT} from '../../../components/component-parts/videoPlayer/utils';
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {postApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';

const InstaFeed = ({navigation, route}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [data, setData] = useState(videosData);
  const interestId = route?.params?.interestId

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const bottomTabHeight = useBottomTabBarHeight();

  const getInterestHandle = async () => {
    const url = API.GET_INTEREST;
    const params = {
      iToOffset: 0,
      iPageSize: 10,
      interest: interestId,
    };
    console.log({params});
    try {
      const result = await postApi(url, params, login_data.accessToken);
      console.log({interest: result.data});
      if (result.status == 200) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInterestHandle();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <VideoPlayer
        data={item}
        isActive={activeVideoIndex === index}
        onMuteHandle={() => onMuteHandle(!item.mute, index)}
        darktheme={darktheme}
        navigation={navigation}
      />
    );
  };

  const onMuteHandle = (mute, index) => {
    const tempdata = [...data];
    tempdata[index].mute = mute;
    setData(tempdata);
  };

  return (
    <View style={st.container(darktheme)}>
      {/* <Header
        title={''}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      /> */}

      <TouchableOpacity
        style={styles.buttonsty}
        activeOpacity={0.5}
        onPress={() => alert('refresh data feed')}>
        <Icon name="refresh" size={25} />
      </TouchableOpacity>

      <FlatList
        data={data}
        pagingEnabled
        renderItem={renderItem}
        onScroll={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / WINDOW_HEIGHT,
          );
          // console.log({index});
          setActiveVideoIndex(index);
        }}
      />
    </View>
  );
};

export default InstaFeed;

const styles = StyleSheet.create({
  buttonsty: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fefefe',
    position: 'absolute',
    top: 20,
    right: 20,
    ...st.shadowsty,
    ...st.justify_C,
    ...st.align_C,
    overflow: 'visible',
    zIndex: 999,
  },
});

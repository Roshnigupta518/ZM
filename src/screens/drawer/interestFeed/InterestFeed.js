import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {images, colors} from '../../../global/theme/Theme';
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer,
} from '@n1ru4l/react-in-center-of-screen';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import st from '../../../global/styles/styles';
import ProfileImg from '../../../components/profileImg';
const {height: windowHeight} = Dimensions.get('window');

const boxHeight = windowHeight / 3;

const VideoActions = () => {
  return (
    <View style={styles.vdoActSty}>
      <View style={{padding: 15}}>
        <View>
          <Material
            name={'favorite-outline'}
            size={25}
            color={'#fff'}
            onPress={() => alert('for like')}
          />
          <Text style={[st.tx14_menu, st.txAlignC, {color: colors.white}]}>
            3
          </Text>
        </View>
        <View>
          <SimpleLineIcon
            name="eye"
            size={25}
            color={'#fff'}
            style={st.mt_t10}
            onPress={() => alert('for view')}
          />
          <Text style={[st.tx14_menu, st.txAlignC, {color: colors.white}]}>
            3
          </Text>
        </View>
        <View>
          <IconIon
            name="navigate-outline"
            size={25}
            color={'#fff'}
            style={st.mt_t10}
            onPress={() => alert('for share')}
          />
        </View>
      </View>
    </View>
  );
};

const UserInfo = val => {
  return (
    <View style={styles.userinfosty}>
      <View style={[st.row, st.align_C]}>
        <View style={st.wdh20}>
          <ProfileImg
            style={st.profileImgSty}
            url={
              'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
            }
          />
        </View>
        <View style={st.wdh60}>
          <Text
            style={[st.vdotitle, {color: val ? colors.black : colors.white}]}>
            User name
          </Text>
          <Text
            style={[
              st.vdosubtitle,
              {color: val ? colors.black : colors.white},
            ]}>
            User title
          </Text>
        </View>
      </View>
    </View>
  );
};

const renderItem = ({item, index}) => {
  return (
    <View>
      <IndexProvider index={index}>
        {() => (
          <View style={{height: boxHeight}}>
            {item.type == 'image' ? (
              <View>
                <Image source={{uri: item.poster}} style={styles.playVdo} />
                {VideoActions()}
                {UserInfo(false)}
              </View>
            ) : (
              <InCenterConsumer>
                {({isInCenter}) =>
                  isInCenter ? (
                    <View>
                      <Video
                        paused={false}
                        source={{uri: item.url}}
                        style={styles.playVdo}
                        resizeMode={'cover'}
                      />
                      {VideoActions()}
                      {UserInfo(true)}
                    </View>
                  ) : (
                    <View style={styles.pausedVdoCon}>
                      <Icon name={'play-circle'} size={50} color={'#fff'} />

                      <Video
                        paused={true}
                        source={{uri: item.url}}
                        style={styles.pausedVdo}
                        resizeMode={'cover'}
                      />
                      {VideoActions()}
                      {UserInfo(false)}
                    </View>
                  )
                }
              </InCenterConsumer>
            )}
          </View>
        )}
      </IndexProvider>
    </View>
  );
};

const InterestFeed = () => {
  return (
    <OffsetYProvider
      columnsPerRow={1}
      listItemHeight={boxHeight}
      centerYStart={(windowHeight * 1) / 3}
      centerYEnd={(windowHeight * 2) / 3}>
      {({setOffsetY}) => (
        <FlatList
          data={data}
          onScroll={ev => {
            setOffsetY(ev.nativeEvent.contentOffset.y);
          }}
          keyExtractor={({item, index}) => index}
          renderItem={renderItem}
        />
      )}
    </OffsetYProvider>
  );
};

export default InterestFeed;

const styles = StyleSheet.create({
  pausedVdo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  userinfosty: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    paddingHorizontal: 20,
  },
  vdoActSty: {
    position: 'absolute',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 20,
    bottom: 20,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  pausedVdoCon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  playVdo: {width: '100%', height: '100%'},
});

const data = [
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    type: 'image',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    type: 'video',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    type: 'image',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    type: 'video',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    type: 'image',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    type: 'video',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    type: 'image',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    type: 'video',
  },
];

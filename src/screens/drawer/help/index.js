import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';
import {images} from '../../../global/theme/Theme';
import Icon from 'react-native-vector-icons/Feather';
import {icon_color} from '../../../utils/helperfunctions';

const Help = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const [data, setData] = useState(helpImages);

  const Item = ({image, title, index, video}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('helpDetails', {image: image, video: video})
      }
      key={index}
      style={[
        st.mt_B,
        st.pd10,
        st.row,
        st.justify_S,
        st.bgCardColor(darktheme),
        {
          borderRadius: 10,
          elevation: 1,
        },
      ]}>
      <Text style={st.tx14(darktheme)}>{title}</Text>
      <Icon name={'chevron-right'} size={20} color={icon_color(darktheme)} />
    </Pressable>
  );

  const renderItem = ({item, index}) => (
    <Item
      image={item.imgurl}
      title={item.title}
      index={index}
      video={item.video}
    />
  );

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Help'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />

      <FlatList
        data={question}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={st.pd20}
      />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    // height: 750, // Adjust as needed
    // marginBottom: 8,
    borderWidth: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const helpImages = [
  {imgurl: images.image1},
  {imgurl: images.image2},
  {imgurl: images.image3},
  {imgurl: images.image4},
  {imgurl: images.image6},
  {imgurl: images.image5},

  {imgurl: images.image7},
  {imgurl: images.image8},
  {imgurl: images.image9},
  {imgurl: images.image10},
];

const question = [
  {id: 1, title: 'What is Zeros?', video: images.zeros},
  {id: 2, title: 'How to create post on Zeros?', imgurl: [images.image1]},
  {id: 3, title: 'How to save post?', imgurl: [images.image2]},
  {id: 4, title: 'Why save post feature?', imgurl: [images.image3]},
  {id: 5, title: 'How to create Poll/ Quiz?', imgurl: [images.image4]},
  {
    id: 6,
    title: 'How Notes Feature is useful?',
    imgurl: [images.image6, images.image5],
    // imgurl_2: images.image5,
  },
  {
    id: 7,
    title: 'How reporting of Post done?',
    imgurl: [images.image7, images.image8],
    // imgurl_2: images.image8,
  },
  {id: 8, title: 'What is BrainBits by Zeros?', imgurl: [images.image9]},
  {id: 10, title: 'Why Bank details asked?', imgurl: [images.image10]},
];

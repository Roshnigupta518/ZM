import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';
import {images} from '../../../global/theme/Theme';

const Help = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const [data, setData] = useState(helpImages);

  const Item = ({image}) => (
    <View style={styles.item}>
      <ImageBackground
        source={image}
        style={styles.backgroundImage}></ImageBackground>
    </View>
  );

  const renderItem = ({item}) => <Item image={item.imgurl} />;

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Help'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 750, // Adjust as needed
    marginBottom: 8,
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

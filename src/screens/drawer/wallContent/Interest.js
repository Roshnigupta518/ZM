import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';
import NavigationDrawerHeader from '../../../components/drawerheader';
import ProfileImg from '../../../components/profileImg';
import {useSelector} from 'react-redux';
import {postApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';

const numColumns = 3;

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 30) / numColumns;

export default function Creator({navigation}) {
  const [list, setList] = useState(data);
  const [dataSource, setDataSource] = useState([]);

  const login_data = useSelector(state => state.login?.data);

  const darktheme = useSelector(state => state.darktheme?.data);

  const getHashTagHandle = async () => {
    const url = API.GET_HASHTAG;
    const params = {
      hagTagValue: '%%',
    };
    try {
      const result = await postApi(url, params);
      if (result.status == 200) {
        const data = result.data;
        console.log('tagsdata', data);
        setDataSource(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHashTagHandle();
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginTop: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InstaFeed')}
          style={[styles.crdsty, {backgroundColor: item.backgroundColor}]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemByInterest = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Feeds',{interestId:item.id})}
        style={[styles.itemcon, {backgroundColor: generateColor()}]}>
        <View style={[st.row, st.align_C, st.mt_B, {marginTop: 5}]}>
          {/* <Image source={{uri: item.src}} style={styles.profileImg} /> */}
          {/* <Text numberOfLines={1} style={[st.tx12(darktheme)]}>
            {index + 1} {'. '}
          </Text> */}
          <View>
            <Text
              numberOfLines={1}
              style={[st.tx14_s(darktheme), st.txCap, {color: colors.white,}]}>
              {item.value}
            </Text>
          </View>
        </View>
        {/* <Image style={styles.imageThumbnail} source={{uri: item.src}} /> */}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={st.container(darktheme)}
      // source={require('../../../assets/images/drawericons/bgimage.png')}
    >
      <NavigationDrawerHeader
        navigationProps={navigation}
        darktheme={darktheme}
      />
      <ScrollView style={{flex: 1}}>
        <FlatList
          contentContainerStyle={st.pd20}
          data={formatData(dataSource, numColumns)}
          renderItem={renderItemByInterest}
          numColumns={numColumns}
          keyExtractor={(item, index) => index}
          columnWrapperStyle={[st.justify_S]}
        />
      </ScrollView>

      {/* <View style={styles.bottomContainer}>
        <Text style={[st.tx14, {color: colors.white, marginLeft: 20}]}>
          Explore by interest
        </Text>

        <FlatList
          data={list}
          horizontal
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  crdsty: {
    paddingHorizontal: 15,
    borderRadius: 5,
    height: 60,
    marginRight: 5,
    ...st.justify_C,
    ...st.align_C,
  },
  contentContainerStyle: {
    paddingStart: 20,
    paddingEnd: 20,
  },
  bottomContainer: {
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: colors.black,
    paddingBottom: 20,
  },
  imageThumbnail: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#fff',
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: itemWidth - 10,
    marginVertical: 10,
  },
  itemcon: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: itemWidth - 10,
    marginVertical: 10,
    height: itemWidth - 10,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

const data = [
  {name: 'Followers', id: 1, backgroundColor: 'red'},
  {name: 'Entertainment', id: 2, backgroundColor: 'darkorange'},
  {name: 'Self development', id: 3, backgroundColor: 'green'},
  {name: 'Arts and collection', id: 4, backgroundColor: 'blue'},
];

import {StyleSheet, Text, View, FlatList, ImageBackground} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';

const PeopleKnow = ({data, darktheme}) => {
  const renderItem = ({item, index}) => {
    return (
      <View>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.imgcon}
          imageStyle={{borderRadius: 10}}>
          <View style={styles.nameCon}>
            <Text style={{color: '#fff'}}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={st.flex}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PeopleKnow;

const styles = StyleSheet.create({
  nameCon: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
  },
  imgcon:{
    width: 120,
    height: 150,
    marginRight: 10,
    marginBottom: 20,
    marginTop: 5,
  }
});

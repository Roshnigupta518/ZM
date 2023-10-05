import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';

const Naugets = ({naugetData}) => {
  //   console.log({naugetData});
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}>
        {naugetData?.map((stories, index) => {
          return (
            <TouchableNativeFeedback key={index} onPress={() => alert('hi')}>
              <View style={styles.scrollContent}>
                <View style={styles.scrollImageView}>
                  <ImageBackground
                    imageStyle={{borderRadius: 10}}
                    source={{uri: stories.image}}
                    style={[st.flex]}
                  />
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Naugets;

const styles = StyleSheet.create({
  storiesContainer: {paddingEnd: 7, paddingStart: 7, alignItems: 'center'},
  scrollContent: {
    justifyContent: 'space-evenly',
    width: 140,
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollImageView: {
    marginHorizontal: 5,
    marginTop: 20,
    width: 120,
    height: 150,
  },
  scrollTextView: {fontSize: 10},
});

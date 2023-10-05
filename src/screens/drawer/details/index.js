import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import {useSelector} from 'react-redux';
import st from '../../../global/styles/styles';
import {environment} from '../../../utils/constant';
import Pinchable from 'react-native-pinchable';
import ProfileImg from '../../../components/profileImg';
const dimensions = Dimensions.get('window');

const Details = ({navigation, route}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const [itemDetails, setItemDetails] = useState([route?.params?.itemDetails]);

  console.log({itemDetails: itemDetails});

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={''}
        darktheme={darktheme}
      />
      {/* <ScrollView> */}
      {itemDetails.map(i => {
        return (
          <View style={st.flex}>
            <View style={st.pd20}>
              <View style={[st.row, st.align_C]}>
                <View style={st.wdh20}>
                  <ProfileImg url={i.DP_IMAGE} />
                </View>
                <View style={st.wdh80}>
                  <Text style={st.tx14_s(darktheme)}>{i.POSTED_BY}</Text>
                  <Text style={st.tx12(darktheme)}>{i.POSTED_DATE}</Text>
                </View>
              </View>
            </View>
            {i.POST_TYPE == '2' && (
              <Pinchable>
                <Image
                  source={{uri: environment.postImgPath + i.POST_PICS}}
                  style={{
                    // width: dimensions.width,
                    // height: dimensions.height,
                    resizeMode: 'contain',
                    width:dimensions.width,
                    height:250
                  }}
                />
              </Pinchable>
            )}
          </View>
        );
      })}
      {/* </ScrollView> */}
      {/* {itemDetails.map((i, n) => {
        return (
          <Footer
            onlikePress={() => onlikePress(!i.likeStatus, n)}
            item={i}
            darktheme={darktheme}
            navigation={navigation}
            footerSty={[st.footerbgColor(darktheme)]}
          />
        );
      })} */}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});

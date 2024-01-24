import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import st from '../../../global/styles/styles';
import Authbtn from '../../../components/Authbtn';
import Header from '../../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../../../utils/endpoints';
import {getPickerImageResp} from '../../../utils/helperfunctions';
import {uploadApi} from '../../../utils/apicalls';
import Loader from '../../../components/Loader';

export default function ProfilePictureScreen({navigation}) {
  const [state, setState] = React.useState({open: false});
  const [loading, setLoading] = React.useState(false);

  const onStateChange = ({open}) => setState({open});

  const [response, setResponse] = React.useState(null);

  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const {open} = state;

  const uploadProfile = async () => {
    const imageResp = getPickerImageResp(response);

    const url = API.UserProfileUploader;
    const formdata = new FormData();
    formdata.append('', imageResp);
    console.log({imageResp});

    console.log('----------------form data------------', formdata);
    setLoading(true);
    try {
      const result = await uploadApi(url, formdata, login_data.accessToken);
      setLoading(false);
      // console.log({uploadApi: result.data});
      if (result.status == 200) {
        const data = JSON.parse(result.data);
        console.log('mediapost=>', data);
        navigation.navigate('BioScreen');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Pick a Profile Photo'}
        onPress={() => navigation.navigate('DrawerNavigationRoutes')}
        darktheme={darktheme}
      />
      
      {response?.assets &&
        response?.assets.map(({uri}) => (
          <View key={uri} style={styles.image}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{width: 200, height: 200}}
              source={{uri: uri}}
            />

            <Authbtn
              title={'SAVE & NEXT'}
              onPress={() => {
                uploadProfile();
              }}
            />
          </View>
        ))}

      <FAB.Group
        fabStyle={styles.fab}
        open={open}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'camera',
            small: false,
            onPress: () => {
              launchCamera(
                {
                  saveToPhotos: true,
                  mediaType: 'photo',
                  includeBase64: false,
                },
                setResponse,
              );
            },
          },
          {
            icon: 'image-area',
            small: false,
            onPress: () => {
              launchImageLibrary(
                {
                  selectionLimit: 0,
                  mediaType: 'photo',
                  includeBase64: false,
                },
                setResponse,
              );
            },
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#EA5B70',
    margin: 16,
    bottom: 0,
    right: 0,
  },

  containerStyle: {},
  image: {
    marginVertical: 24,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  buttonStyle: {
    backgroundColor: '#87CEEB',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    alignItems: 'center',
  },

  nextbuttonStyle: {
    backgroundColor: '#87CEEB',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    margin: 4,
  },
  floatingbtn: {
    position: 'absolute',
    bottom: 0,
  },
});

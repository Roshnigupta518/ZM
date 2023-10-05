import {StyleSheet, Text, View, ScrollView, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../global/styles/styles';
import Header from '../../components/header/Header';
import {useSelector, useDispatch} from 'react-redux';
import Input from '../../components/input';
import DropDownPicker from 'react-native-dropdown-picker';
import {API} from '../../utils/endpoints';
import {postApi} from '../../utils/apicalls';
import {ValueEmpty} from '../../utils/helperfunctions/validations';
import {colors} from '../../global/theme/Theme';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';
const INITIALINPUT = {
  Note_title: '',
  Note_desc: '',
};

const Create = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [valueErr, setValueErr] = useState();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const [items, setItems] = useState([
    {label: 'New', value: 'New'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Done', value: 'Done'},
    {label: 'Critical', value: 'Critical'},
  ]);

  const onEditHandle = () => {
    validate();
  };

  const createNotes_handle = async () => {
    const url = API.UserNoteSave;
    const param = {
      title: inputs.Note_title,
      type: value,
      note: inputs.Note_desc,
    };
    console.log({param});

    try {
      setLoading(true);
      const result = await postApi(url, param, login_data.accessToken);
      console.log({result: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data;
        Toast.show(data?.MessageText, Toast.LONG);
        setInputs(INITIALINPUT);
        setValue('');
        navigation.goBack();
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const validate = async () => {
    Keyboard.dismiss();
    const title = ValueEmpty(inputs?.Note_title);
    const description = ValueEmpty(inputs?.Note_desc);
    const type = ValueEmpty(value);

    let isValid = true;
    if (title) {
      handleError('*Required', 'Note_title');
      isValid = false;
    } else {
      handleError('', 'Note_title');
    }

    if (type) {
      setValueErr('*Required');
      isValid = false;
    } else {
      setValueErr('');
    }

    if (description) {
      handleError('*Required', 'Note_desc');
      isValid = false;
    } else {
      handleError('', 'Note_desc');
    }

    if (isValid) {
      createNotes_handle();
    } else {
      console.log('error');
    }
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={''}
        darktheme={darktheme}
        edit={true}
        onEditHandle={onEditHandle}
      />
      <View style={[st.pd_H20, st.mt_t10]}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select type"
          style={{borderWidth: 0, backgroundColor: '#f3f6f9'}}
          onChangeValue={val => setValueErr('')}
        />
        {valueErr && (
          <Text style={[{color: colors.danger, fontSize: 12}]}>{valueErr}</Text>
        )}
      </View>
      <ScrollView style={st.flex}>
        <View style={st.pd20}>
          <View>
            <Input
              inputsty={{borderWidth: 0}}
              placeholder="Enter Title"
              placeholderTextColor="#808080"
              darktheme={darktheme}
              onChangeText={text => handleOnchange(text, 'Note_title')}
              onFocus={() => handleError(null, 'Note_title')}
              error={errors?.Note_title}
            />
          </View>

          <View style={st.mt_t10}>
            <Input
              inputsty={{borderWidth: 0}}
              placeholder="Start typing"
              placeholderTextColor="#808080"
              darktheme={darktheme}
              multiline
              autoFocus={true}
              onChangeText={text => handleOnchange(text, 'Note_desc')}
              onFocus={() => handleError(null, 'Note_desc')}
              error={errors?.Note_desc}
            />
          </View>
        </View>
      </ScrollView>

      {loading && <Loader />}
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({});

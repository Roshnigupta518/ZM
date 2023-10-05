import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import st from '../../../global/styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {useState} from 'react';
import {colors} from '../../../global/theme/Theme';
import { setTheme } from '../../../redux/reducers/Darktheme';
import { icon_color } from '../../../utils/helperfunctions';

var radio_props = [
  {label: 'Light', value: 0},
  {label: 'Dark', value: 1},
];

const Theme = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [value3Index, setValue3Index] = useState(darktheme === 'dark' ? 0 : 1);

  const handleApp_theme = theme => {
    const data = theme == 0? 'dark' : 'light';
    dispatch(setTheme(data));
  };

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Theme'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <View style={st.pd20}>
        
        <RadioForm formHorizontal={false} animation={true}>
          {radio_props.map((obj, i) => {
            var onPress = (value, index) => {
              setValue(value);
              setValue3Index(index);
              handleApp_theme(value)
            console.log({value, index})
            };
            return (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={value3Index === i}
                // isSelected={darktheme === 'dark' ? false : true}
                  onPress={onPress}
                  buttonInnerColor={colors.skyblue}
                  buttonOuterColor={value3Index === i ? '#2196f3' : icon_color(darktheme)}
                  buttonSize={15}
                  buttonStyle={{}}
                  buttonWrapStyle={st.mt_B}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={onPress}
                  labelStyle={st.tx14_s(darktheme)}
                  labelWrapStyle={[st.mt_B,{marginLeft: 15}]}
                />
              </RadioButton>
            );
          })}
        </RadioForm>
      </View>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({});

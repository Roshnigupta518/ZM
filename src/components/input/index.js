import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../global/theme/Theme';
import st from '../../global/styles/styles';
import { icon_color } from '../../utils/helperfunctions';
const Input = ({
  darktheme,
  label,
  iconName,
  error,
  inputsty,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={st.mt_B}>
      {label && <Text style={[st.tx16(darktheme)]}>{label}</Text>}
      <View style={[style.inputContainer, inputsty]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={[st.tx14(darktheme), st.flex]}
          {...props}
        />

        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ fontSize: 22}}
            color={icon_color(darktheme)}
          />
        )}
      </View>
      {error && (
        <Text style={[{color: colors.danger, fontSize: 12}]}>{error}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.grey,
  },

  inputContainer: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    fontSize: 12,
    alignItems: 'center',
    height:50
  },
});

export default Input;

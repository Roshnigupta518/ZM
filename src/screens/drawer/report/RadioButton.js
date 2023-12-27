import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../../global/theme/Theme';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';

export default function RadioButtons({options, selectedOption, onSelect}) {
  const darktheme = useSelector(state => state.darktheme?.data);
  return (
    <View>
      {options?.map(item => {
        return (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
            key={item.id}
            style={styles.buttonContainer}>
            <View style={[styles.circle]}>
              {selectedOption && selectedOption.id === item.id && (
                <View style={styles.checkedCircle} />
              )}
            </View>

            <View style={st.wdh90}>
              {item?.value && (
                <Text style={st.tx14(darktheme)}>{item.value}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skyblue,
  },
});

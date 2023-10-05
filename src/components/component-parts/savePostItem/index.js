import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles/styles';
import RadioButton from 'react-native-radio-button';
import {colors} from '../../../global/theme/Theme';
import {icon_color} from '../../../utils/helperfunctions';
import {getLabelColor} from '../../../utils/helperfunctions';

const SavedPostItem = ({
  item,
  darktheme,
  index,
  onRadioPress,
  selectedIndex,
  onPress,
  saved,
}) => {
  return (
    <View style={[st.mt_B]}>
      <View
        style={[
          st.row,
          st.align_C,
          st.bgCardColor(darktheme),
          {borderRadius: 10, elevation:1},
        ]}>
        <View style={st.wdh20}>
          <View
            style={[
              styles.boxSty,
              {backgroundColor: getLabelColor(item.LABEL_COLOR)},
            ]}>
            <Text style={styles.boxtxt}> {item?.LABEL_NAME?.slice(0, 1)} </Text>
          </View>
        </View>

        <TouchableOpacity style={st.wdh60} onPress={onPress}>
          <Text style={st.tx14_s(darktheme)}>{item?.LABEL_NAME}</Text>
        </TouchableOpacity>

        <View style={st.wdh20}>
          {saved ? (
            <View style={[st.align_E,{}]}>
              <Text
                adjustsFontSizeToFit
                style={[
                  st.tx14_s(darktheme),
                  st.txAlignC,
                  {
                    color: colors.white,
                    minHeight: 20,
                    paddingHorizontal: 5,
                    minWidth: 25,
                    borderRadius: 45,
                    marginRight:10,
                    backgroundColor: getLabelColor(item.LABEL_COLOR),
                  },
                ]}>
                {item?.SAVE_COUNT}
              </Text>
            </View>
          ) : (
            <RadioButton
              isSelected={selectedIndex == index}
              onPress={onRadioPress}
              animation={'bounceIn'}
              innerColor={icon_color(darktheme)}
              outerColor={icon_color(darktheme)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default SavedPostItem;

const styles = StyleSheet.create({
  boxSty: {
    width: 60,
    height: 60,
    borderRadius: 10,
    ...st.justify_C,
    ...st.align_C,
  },
  boxtxt: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'capitalize',
  },
});

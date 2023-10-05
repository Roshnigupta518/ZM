import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles/styles';
import {colors} from '../../global/theme/Theme';

const onModalClick = (value, props) => {
  props.onModalClick(value);
};

const PopUpMessage = props => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.display}>
        <TouchableOpacity activeOpacity={1} style={st.center}>
          <View style={styles.modalView(props.darktheme)}>
            <View
              style={[
                st.align_C,
                st.justify_C,
                {
                  backgroundColor: colors.blue,
                  height: 60,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}>
              <Text
                style={[
                  st.tx18(props.darktheme),
                  st.txAlignC,
                  {color: colors.white},
                ]}>
                {props.titleMsg}
              </Text>
            </View>
            <View style={st.pd20}>
              <View style={st.mt_t10}>
                <Text style={[st.tx14(props.darktheme), st.txAlignC]}>
                  {props.subTitle}
                </Text>
              </View>

              <View style={[st.row, st.justify_A]}>
                {props.twoButton == true && (
                  <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => {
                      onModalClick(false, props);
                    }}>
                    <Text style={st.tx14_menu}>{'No'}</Text>
                  </TouchableOpacity>
                )}
                {props.twoButton == true && (
                  <TouchableOpacity
                    style={[styles.buttonView, {backgroundColor: colors.blue}]}
                    onPress={() => {
                      if (props?.onPress_api) {
                        onModalClick(false, props);
                        props?.onPress_api();
                      } else {
                        onModalClick(false, props);
                      }
                    }}>
                    <Text style={[st.tx14_menu, {color: colors.white}]}>
                      {'Yes'}
                    </Text>
                  </TouchableOpacity>
                )}

                {props.twoButton == false && (
                  <TouchableOpacity
                    style={[styles.buttonView, {backgroundColor: colors.blue}]}
                    onPress={() => {
                      onModalClick(false, props);
                    }}>
                    <Text style={[st.tx18(props.darktheme), {color: colors.white}]}>
                      {'Okay'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PopUpMessage;

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal:20,
    // width: '45%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  modalView: darktheme => ({
    backgroundColor: darktheme === 'dark' ? colors.white : '#404040',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
  }),
});

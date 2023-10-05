import React, {useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';

function ModalTester({gotoNotes, gotoSavedPost}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.flexView}>
      <View style={{marginTop: '70%'}}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={toggleModal}></TouchableOpacity>
      </View>

      <Modal
        statusBarTranslucent
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="Right"
        onSwipeComplete={toggleModal}
        animationIn="bounceInRight"
        animationOut="bounceOutRight"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View>
              {/* <TouchableOpacity onPress={() => alert('hi')}>
                <Text style={[styles.text, st.tx14, {color: '#fff'}]}>
                  Analytics
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('hi')}>
                <Text style={[styles.text, st.tx14, {color: '#fff'}]}>
                  Creative zone
                </Text>
              </TouchableOpacity>
              */}
              <TouchableOpacity onPress={() => alert('Calender')}>
                <Text style={[styles.text, st.tx14, {color: '#fff'}]}>
                  Calender
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => gotoNotes()}>
                <Text style={[styles.text, st.tx14, {color: '#fff'}]}>
                  Notes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => gotoSavedPost()}>
                <Text style={[styles.text, st.tx14, {color: '#fff'}]}>
                  Saved
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    marginLeft: '80%',
    marginRight: 0,
    marginTop: 0,
    marginBottom: 3,
  },
  modalContent: {
    backgroundColor: 'black',
    opacity: 0.7,
    height: '81.5%',
    paddingTop: '19%',
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginTop: '200%',
    transform: [{rotate: '90deg'}],
    textAlign: 'center',
    paddingBottom: 12,
    verticalAlign: 'center',
    marginRight: 5,
  },

  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 20,
    right: 0,
    top: 0,
    bottom: 0,

    zIndex: 2,
    position: 'absolute',
    backgroundColor: colors.skyblue,
  },
});

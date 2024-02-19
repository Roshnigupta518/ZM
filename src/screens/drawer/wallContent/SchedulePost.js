import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles/styles';
import {colors} from '../../../global/theme/Theme';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Authbtn from '../../../components/Authbtn';
import Header from '../../../components/header/Header';
import {useSelector, useDispatch} from 'react-redux';
import {setSchedulePost} from '../../../redux/reducers/SchedulePost';
import Icon from 'react-native-vector-icons/Entypo';

const SchedulePost = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);

  const dispatch = useDispatch();
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [opentime, setOpenTime] = useState(false);

  return (
    <View style={st.container(darktheme)}>
      <Header
        onPress={() => navigation.goBack()}
        title={'Schedule'}
        darktheme={darktheme}
      />
      <View style={st.pd20}>
        <View>
          <Text style={st.tx12(darktheme)}>
            Note: Select a date and time in the future when you want to publish
            the post.
          </Text>
        </View>
        <View style={[st.row, st.mt_v, st.justify_S]}>
          <View>
            <Text style={st.tx14_s(darktheme)}>Select Date</Text>
          </View>
          <TouchableOpacity
            style={styles.dateSty}
            onPress={() => setOpen(true)}>
            {scheduleDate && (
              <Text style={st.tx14(darktheme)}>
                {moment(scheduleDate).format('YYYY/DD/MM')}
              </Text>
            )}
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            mode={'date'}
            textColor={darktheme === 'dark' ? colors.black : colors.white}
            date={date}
            onConfirm={dateResp => {
              setOpen(false);
              setDate(dateResp);
              setScheduleDate(dateResp);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            minimumDate={moment()}
          />
        </View>

        <View style={[st.row, st.mt_v, st.justify_S]}>
          <View>
            <Text style={st.tx14_s(darktheme)}>Select Time</Text>
          </View>
          <TouchableOpacity
            style={styles.dateSty}
            onPress={() => setOpenTime(true)}>
            {scheduleTime && (
              <Text style={st.tx14(darktheme)}>
                {moment(scheduleTime).format('hh:mm')}
              </Text>
            )}
          </TouchableOpacity>

          <DatePicker
            modal
            open={opentime}
            mode={'time'}
            textColor={darktheme === 'dark' ? colors.black : colors.white}
            date={time}
            onConfirm={dateResp => {
              setOpenTime(false);
              setTime(dateResp);
              setScheduleTime(dateResp);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
            minimumDate={moment()}
          />
        </View>

        <View style={st.wdh50}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ScheduleList')}
            style={st.editboxsty(darktheme)}>
            <Text style={st.tx14(darktheme)}>
              <Icon name={'calendar'} size={20} /> Scheduled Posts
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Authbtn
          title={'Confirm'}
          onPress={() => {
            const data = {
              // date: moment(scheduleDate).format('MMM Do YYYY'),
              date: scheduleDate,
              time: moment(scheduleTime).format('LT'),
            };
            console.log({data});
            dispatch(setSchedulePost(data));
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default SchedulePost;

const styles = StyleSheet.create({
  dateSty: {
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: 150,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    left: '40%',
  },
});

import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const WithDatePicker = (WrappedComponent, onDateSelect) => {
  return props => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const formatDate = date => {
      const dd = moment(date).format("YYYY-MM-DD")
      // const d = new Date(date);
      // return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
      return dd
    };

    return (
      <View>
        <WrappedComponent {...props} openPicker={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={dateResp => {
            // setOpen(false);
            setDate(dateResp);

            const date = formatDate(dateResp);

            onDateSelect(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };
};

export default WithDatePicker;

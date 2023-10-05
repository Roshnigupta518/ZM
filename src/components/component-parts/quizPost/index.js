import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles/styles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {colors} from '../../../global/theme/Theme';
import Autolink from 'react-native-autolink';
import {calculatedPoll} from '../../../utils/helperfunctions';
import {useEffect} from 'react';
import PercentageBar from '../../PercentageBar';
import YoutubePlayer from 'react-native-youtube-iframe';

const regex = /(<([^>]+)>)/gi;

const QuixPost = ({
  item,
  darktheme,
  QuizSty,
  quizVote_handle,
  index,
  gotoInterest,
  gotoProfileTab,
}) => {
  const [checked, setChecked] = useState(-1);
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [pollData, setPollData] = useState();
  const [pollDisable, setPollDisable] = useState(false);

  // const [tempdata, setTempdata] = useState([]);

  const data = item?.QUIZ_DATA;

  // console.log('quiz data real=>', data);
  const quiz = data?.split('|');
  const quizAns = quiz && quiz[4];
  const quizData = quiz?.slice(5);
  const pollAnsData = quiz && quiz[2];
  // console.log({quizDataSlice: quizAns});
  // useEffect(() => {
  const tempdata = [];
  for (let i = 0; quizData?.length > i; i++) {
    if (quizData[i]) {
      let obj = {
        label: quizData[i],
        value: i,
      };
      tempdata.push(obj);
    }
  }

  // setTempdata(data);
  // console.log({Tempdata: tempdata});
  // }, []);

  const onPollHandle = pollAnsData => {
    setChecked(pollAnsData - 1);
    setCheckedIndex(pollAnsData - 1);
    // console.log('set the poll value', pollAnsData - 1);
    const result = calculatedPoll(item?.QUIZ_DATA);
    // console.log({result});
    setPollData(result);
    setPollDisable(true);
  };

  useEffect(() => {
    if (pollAnsData) {
      // console.log('call_________________________');
      onPollHandle(pollAnsData);
    } else {
      console.log('checkedIndex***************', pollAnsData);
      setChecked(-1);
      setCheckedIndex(-1);
    }
  }, []);

  // console.log({tempdata: tempdata});

  return (
    <View style={[QuizSty, st.pd10, st.pdT0]} key={index}>
      <View>
        <Autolink
          text={item?.P_CONTENT?.replace(regex, '')}
          email
          hashtag="instagram"
          mention="twitter"
          phone="sms"
          url
          onPress={(url, match) => {
            switch (match.getType()) {
              case 'mention':
                console.log('Mention pressed!', item?.TaggUser);
                gotoProfileTab(item?.TaggUser);
                break;
              case 'hashtag':
                console.log('hashtag pressed!');
                gotoInterest();
                break;
              default:
                console.log('Link pressed!');
              // gotoInterest();
            }
          }}
        />

        {item?.YouTubeId && (
          <View style={st.mt_t15}>
            <YoutubePlayer
              height={200}
              play={false}
              videoId={item?.YouTubeId}
            />
          </View>
        )}

        <View style={[st.row]}>
          <View style={st.wdh90}>
            <RadioForm formHorizontal={false} animation={true}>
              {tempdata?.map((obj, i) => {
                var onPress = async (value, index) => {
                  const pollAnsData = quiz && quiz[2];

                  setChecked(value);
                  setCheckedIndex(index);
                  const quizId = quiz && quiz[0];
                  const quizAnsData = quiz && quiz[4];
                  let correctAns = '';
                  if (quizAnsData) {
                    correctAns = value + 1;
                  }
                  if (pollAnsData) {
                    correctAns = value + 1;
                  }
                  const myquis = await quizVote_handle(quizId, i + 1, item.PID);
                  const result = calculatedPoll(myquis);
                  setPollData(result);
                  setPollDisable(true);
                };
                return (
                  <View>
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={checkedIndex === i}
                        onPress={onPress}
                        buttonInnerColor={
                          !quizAns
                            ? 'green'
                            : quizAns == checked + 1
                            ? 'green'
                            : 'red'
                        }
                        buttonOuterColor={
                          checkedIndex === i
                            ? !quizAns
                              ? 'green'
                              : quizAns == checked + 1
                              ? 'green'
                              : 'red'
                            : '#ccc'
                        }
                        buttonSize={10}
                        buttonOuterSize={25}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginRight: 10}}
                        disabled={pollDisable}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        onPress={onPress}
                        labelStyle={[
                          st.tx14(darktheme),
                          {
                            color:
                              checkedIndex === i
                                ? !quizAns
                                  ? 'green'
                                  : quizAns == checked + 1
                                  ? 'green'
                                  : 'red'
                                : '#777',
                          },
                        ]}
                        labelWrapStyle={{}}
                        disabled={pollDisable}
                      />
                    </RadioButton>
                  </View>
                );
              })}
            </RadioForm>
          </View>

          {!quizAns && (
            <View style={st.wdh10}>
              {tempdata?.map((i, k) => {
                return (
                  <View style={st.mt_B}>
                    <Text style={[st.tx14(darktheme)]}>
                      {pollData?.votePerArr[k]}
                      {pollData?.votePerArr?.length > 0 && '%'}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {pollData?.totvote ? (
          !quizAns ? (
            <Text style={st.tx14(darktheme)}>
              {pollData?.totvote ? pollData?.totvote + ' votes' : null}
            </Text>
          ) : (
            <Text style={st.tx14(darktheme)}>
              {pollData?.totvote ? pollData?.totvote + ' answers' : null}
            </Text>
          )
        ) : null}
      </View>
    </View>
  );
};

export default QuixPost;

const styles = StyleSheet.create({});

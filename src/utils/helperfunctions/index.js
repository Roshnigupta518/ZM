import {colors} from '../../global/theme/Theme';

export const getPickerImageResp = res => {
  const respArr = res.assets;
  const imgResp = Array.isArray(respArr) && respArr.length ? respArr[0] : null;

  if (imgResp) {
    return {
      uri: imgResp?.uri,
      name: imgResp?.fileName,
      type: imgResp?.type,
    };
  }

  return false;
};

export const icon_color = theme => {
  const color = theme === 'dark' ? colors.black : colors.white;
  return color;
};

export const getbgColor = status => {
  if (status == 'Pending') {
    return 'orange';
  }
  if (status == 'New') {
    return 'blue';
  }
  if (status == 'Done') {
    return 'green';
  }
  if (status == 'Critical') {
    return 'red';
  }
};

export const getLabelColor = status => {
  if (status == 'danger') {
    return '#d9534f';
  }
  if (status == 'warning') {
    return '#f0ad4e';
  }
  if (status == 'info') {
    return '#5bc0de';
  }
  if (status == 'success') {
    return '#5cb85c';
  }
  if (status == 'primary') {
    return '#337ab7';
  }
  if (status == 'default') {
    return '#777';
  }
};

export const calculatedPoll = pquz => {
  // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm', pquz);

  let text = pquz;
  var zrQuiz = '';
  var Quiz = text.split('|');
  // console.log('222222222222222222', Quiz);
  if (Quiz != '') {
    var quizId,
      validUpto = '',
      choosedOpt = 0,
      disabled = '',
      votedClass = '',
      rightAns = 0,
      rightClass = '',
      totvote = 0,
      mostVoteOpt = 0,
      mostVoteClass = '',
      votePerArr = [0, 0, 0, 0],
      opt1tot = 0,
      opt2tot = 0,
      opt3tot = 0,
      opt4tot = 0,
      voteOrAns = 'votes';
    // zrQuiz = '<div class="zr-quiz-post zr-quiz-id zr-not-voted px-6">';
    for (var i in Quiz) {
      if (i == 0 && Quiz[i] != '') {
        quizId = Quiz[i];
      }
      if (i == 1 && Quiz[i] != '') {
        //options counts
        var votes = Quiz[i].split(',');
        for (var x in votes) {
          if (votes[x].split('-')[1] == 1) opt1tot = votes[x].split('-')[0];
          if (votes[x].split('-')[1] == 2) opt2tot = votes[x].split('-')[0];
          if (votes[x].split('-')[1] == 3) opt3tot = votes[x].split('-')[0];
          if (votes[x].split('-')[1] == 4) opt4tot = votes[x].split('-')[0];
        }
        totvote =
          parseInt(opt1tot) +
          parseInt(opt2tot) +
          parseInt(opt3tot) +
          parseInt(opt4tot);

        // console.log({totvote});

        var voteArr = [
          parseInt(opt1tot),
          parseInt(opt2tot),
          parseInt(opt3tot),
          parseInt(opt4tot),
        ];
        votePerArr = [
          Math.round((parseInt(opt1tot) * 100) / totvote),
          Math.round((parseInt(opt2tot) * 100) / totvote),
          Math.round((parseInt(opt3tot) * 100) / totvote),
          Math.round((parseInt(opt4tot) * 100) / totvote),
        ];
        // console.log({votePerArr});
        var maxVotes = Math.max.apply(Math, voteArr);
        // console.log({maxVotes});
        mostVoteOpt = voteArr.indexOf(maxVotes) + 1;
        // console.log({mostVoteOpt});
      }
      if (i == 2 && Quiz[i] != '') {
        //user voted option
        choosedOpt = Quiz[i];
        disabled = 'disabled';
        votedClass = 'zr-is-voted';
      }
      if (i == 3 && Quiz[i] != '') {
        //to check validity with current datetime
        validUpto = Quiz[i];
        zrQuiz += Quiz[i];
      }
      if (i == 4 && Quiz[i] != '') {
        //right answere
        rightAns = Quiz[i];
        zrQuiz += Quiz[i];
        voteOrAns = 'answers';
      }

    }

    const data = {votePerArr, mostVoteOpt, totvote, maxVotes, mostVoteOpt}
    return data
  } else {
    console.log('dfvdfv');
  }
};
// {"maxVotes": 1, "mostVoteOpt": 1, "totvote": 1, "votePerArr": [100, 0, 0, 0]}

import {StyleSheet, Platform, Dimensions} from 'react-native';
import {size, family} from '../fonts/Fonts';
import {colors} from '../theme/Theme';

export default StyleSheet.create({
  container: darktheme => ({
    flex: 1,
    backgroundColor: darktheme !== 'dark' ? colors.black : '#f5f6fa',
  }),
  flex: {
    flex: 1,
  },
  emptyliststy: {
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listfooter: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  row: {flexDirection: 'row'},
  pd20: {padding: 20},
  pd10: {padding: 10},
  pdT0: {paddingTop: 0},
  pd_H20: {paddingHorizontal: 15},
  mt_v: {marginVertical: 10},
  mt_B: {marginBottom: 15},
  ml_15: {marginLeft: 15},
  mt_t10: {
    marginTop: 10,
  },
  mt_t15: {marginBottom: 15},

  wdh60: {width: '60%'},
  wdh40: {width: '40%'},
  wdh20: {width: '20%'},
  wdh30: {width: '30%'},
  wdh10: {width: '10%'},
  wdh15: {width: '15%'},
  wdh25: {width: '25%'},
  wdh75: {width: '75%'},
  wdh55: {width: '55%'},
  wdh70: {width: '70%'},
  wdh50: {width: '50%'},
  wdh48: {width: '48%'},
  wdh80: {width: '80%'},
  wdh90: {width: '90%'},

  center: {justifyContent: 'center', alignItems: 'center', flex: 1},
  align_C: {alignItems: 'center'},
  align_E: {alignItems: 'flex-end'},
  align_S: {alignItems: 'flex-start'},
  justify_C: {justifyContent: 'center'},
  justify: {justifyContent: 'flex-end'},
  justify_S: {justifyContent: 'space-between'},
  justify_A: {justifyContent: 'space-around'},

  txAlignC: {textAlign: 'center'},
  txAlignJ: {textAlign: 'justify'},
  txAlignR: {textAlign: 'right'},
  txAlignL: {textAlign: 'left'},

  txCap: {textTransform: 'capitalize'},

  txDecor: {textDecorationLine: 'underline'},

  txbold: {fontFamily: family.semibold},

  tx10: darktheme => ({
    fontSize: size.subtitle,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.regular,
    textAlign: 'center',
  }),
  error:{
    fontSize: size.label,
    color: colors.danger,
    fontFamily: family.light,
  },
  tx12: darktheme => ({
    fontSize: size.label,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.light,
  }),
  tx13: darktheme => ({
    fontSize: size.subtitle,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.regular,
  }),
  tx14: darktheme => ({
    fontSize: size.subtitle,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.regular,
  }),
  tx14_menu: {
    fontSize: size.subtitle,
    color: colors.black,
    fontFamily: family.regular,
  },
  vdotitle: {
    fontSize: size.subtitle,
    color: colors.white,
    fontFamily: family.medium,
    lineHeight: 15,
  },
  vdosubtitle: {
    fontSize: 10,
    color: colors.white,
    fontFamily: family.regular,
    lineHeight: 15,
  },
  tx14_s: darktheme => ({
    fontSize: size.subtitle,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.semibold,
  }),
  tx16: darktheme => ({
    fontSize: size.title,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.medium,
  }),
  tx18: darktheme => ({
    fontSize: size.subheading,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.semibold,
  }),
  tx20: darktheme => ({
    fontSize: size.heading,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: family.bold,
  }),
  tx30: darktheme => ({
    fontSize: 36,
    color: darktheme === 'dark' ? colors.black : colors.white,
    fontFamily: 'regular',
  }),
  editboxsty: darktheme => ({
    backgroundColor: darktheme === 'dark' ? '#d9d9d9' : '#404040',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }),

  noteBox: darktheme => ({
    // backgroundColor: darktheme === 'dark' ? '#f3f6f9' : '#404040',
    borderRadius: 5,
    padding: 15,
    elevation: 1,
  }),
  statusBoxSty: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginLeft: 20,
    borderRadius: 45,
    height: 23,
  },
  bgColor: darktheme => ({
    backgroundColor: darktheme === 'dark' ? colors.white : colors.black,
  }),
  bgCardColor: darktheme => ({
    backgroundColor: darktheme === 'dark' ? colors.white : '#1a1a1a',
  }),
  radius:{
    borderRadius:10
  },
  footerbgColor: darktheme => ({
    backgroundColor: darktheme === 'dark' ? '#fff' : '#404040',
    marginHorizontal: 10,
    borderWidth: darktheme === 'dark' ? 0.6 : 0,
  }),
  bigtxt: {
    fontSize: 28,
    color: colors.white,
    fontFamily: family.bold,
  },
  footer: {
    borderColor: '#ccc',
    borderTopWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowOpacity: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    // elevation:1,
    backgroundColor: 'transparent',
    // marginTop: 10,
    // marginBottom: 20,
  },
  inputs: {
    paddingHorizontal: 15,
    fontSize: size.subtitle,
    color: colors.black,
    fontFamily: family.regular,
    borderWidth: 0.8,
    borderColor: colors.grey,
    maxHeight: 120,
    marginTop: 20,
  },
  icnsty: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  shadowsty: {
    borderColor: '#ccc',
    borderWidth: 0.8,
    shadowColor: '#000',
    shadowOffset: 1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 25,
  },
  profileImgSty: {
    backgroundColor: '#efefef',
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  bottomSty: {
    paddingHorizontal: 20,
  },
  profileReplySty: {
    backgroundColor: '#efefef',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  bankBtn :{
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:10,
    backgroundColor:colors.green,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:15
  }
});

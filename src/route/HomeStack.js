import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Auth/splash';
import DrawerNavigatorRoutes from './DrawerNavigationRoutes';
import Search from '../screens/search';
import Notification from '../screens/drawer/wallContent/Notification';
import SavePost from '../screens/savePost';
import Details from '../screens/drawer/details';
import Post from '../screens/drawer/wallContent/Post';
import SchedulePost from '../screens/drawer/wallContent/SchedulePost';
import {useSelector} from 'react-redux';
import {icon_color} from '../utils/helperfunctions';
import Init from '../screens/Auth/init';
import Followers from '../screens/drawer/wallContent/Followers';
import Saved from '../screens/savePost/Saved';
import AccountInformation from '../screens/drawer/profile/edit/AccountInformation';
import PersonalInformation from '../screens/drawer/profile/edit/PersonalInformation';
import Comment from '../screens/drawer/comment/Comment';
import EditPost from '../screens/drawer/wallContent/EditPost';
import Notes from '../screens/notes';
import CreateNote from '../screens/notes/CreateNote';
import About from '../screens/drawer/aboutus';
import Theme from '../screens/drawer/theme';
import Otp from '../screens/Auth/otp';
import ProfilePicture from '../screens/Auth/profile';
import Bio from '../screens/Auth/bio';
import Suggestion from '../screens/Auth/suggestion';
import Interest from '../screens/Auth/interest';
import NoteDetails from '../screens/notes/NoteDetails';
import SharePost from '../screens/drawer/wallContent/SharePost';
import Report from '../screens/drawer/report';
import ReportDetails from '../screens/drawer/report/ReportDetails';
import ScheduleList from '../screens/drawer/scheduleList';
import ViewOtherProfile from '../screens/drawer/wallContent/ViewOtherProfile';
import Terms from '../screens/drawer/terms';
import PrivacyPolicy from '../screens/drawer/privacy';

const Stack = createNativeStackNavigator();

const HomeStack = ({InitialRoute}) => {
  console.log({InitialRoute});
  return (
    <Stack.Navigator
      initialRouteName={
        InitialRoute == false ? 'OtpScreen' : 'DrawerNavigationRoutes'
      }>
      <Stack.Screen
        name="OtpScreen"
        component={Otp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilePictureScreen"
        component={ProfilePicture}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BioScreen"
        component={Bio}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SuggestionScreen"
        component={Suggestion}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="InterestScreen"
        component={Interest}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DrawerNavigationRoutes"
        component={DrawerNavigatorRoutes}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavePost"
        component={SavePost}
        options={{headerShown: false}}
        initialParams={{saved: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{headerShown: false}}
      />
      {/*  */}
      <Stack.Screen
        name="SchedulePost"
        component={SchedulePost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={AccountInformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Personal"
        component={PersonalInformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="NoteDetails"
        component={NoteDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Theme"
        component={Theme}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SharePost"
        component={SharePost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportDetails"
        component={ReportDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScheduleList"
        component={ScheduleList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewOtherProfile"
        component={ViewOtherProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      {/*  */}
    </Stack.Navigator>
  );
};

export default HomeStack;

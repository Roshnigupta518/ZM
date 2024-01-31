import {environment} from '../constant';

class Endpoints {
  baseUrl = environment.baseUrl;
  LOGIN = this.baseUrl + 'Signner/SigninV2';
  SIGNUP = this.baseUrl + 'Signner/Signupv2';
  OTP_SEND = this.baseUrl + 'Signner/SendMobileOtpV2';
  OtpVarify = this.baseUrl + 'Signner/PhoneActconfirmV2';
  PhoneActVarifi = this.baseUrl + 'Signner/PhoneActConfirmationV2'
  OTPActResend = this.baseUrl + 'Signner/PhoneActResendV2';
  NEWPOST = this.baseUrl + 'Posting/PostingNewPostV2';
  NEWMEDIAPOST = this.baseUrl + 'Posting/UserMediaPostingV2';
  GETFEEDS = this.baseUrl + 'Posting/GetFeedPostsDataV2';
  GET_SAVED = this.baseUrl + 'posting/GetSavedPostsDataV2';
  GetSaveLabel = this.baseUrl + 'posting/GetSaveLabelListV2';
  GetComments = this.baseUrl + 'posting/GetPostCommentsDataV2';
  DeletePost = this.baseUrl + 'posting/DeletePostItemV2';
  HidePost = this.baseUrl + 'posting/hidePostItemV2';
  ON_COMMENT = this.baseUrl + 'posting/WritePostCommentCallV2';
  COMMENT_REPLY = this.baseUrl + 'posting/WriteCommentReplyCallV2';
  SavePostItem = this.baseUrl + 'posting/SavePostItemV2';
  unSavedPostItem = this.baseUrl + 'posting/UnSavePostItemV2';
  GetLinkMeta = this.baseUrl + 'posting/GetLinkMetaDataV2';
  EditPostData = this.baseUrl + 'posting/EditPostDataItemV2';
  PostMenuData = this.baseUrl + 'posting/PostMenuDataV2';
  DeleteComment = this.baseUrl + 'posting/DeleteCommentItemV2';
  hideComment = this.baseUrl + 'posting/hideCommentItemV2';
  GetSuggsted = this.baseUrl + 'Profiles/GetSuggstedPeopleListV2';
  UserBio = this.baseUrl + 'Surge/UserBioSaverV2';
  GetInterest = this.baseUrl + 'Surge/GetSignupInterestsV2';
  SaveInterest = this.baseUrl + 'Surge/UserIntrstSaverV2';
  Forgot = this.baseUrl + 'Signner/ForgotV2';
  Logout = this.baseUrl + 'Signner/LogoutV2';
  ResetConfirm = this.baseUrl + 'Signner/ResetConfirmV2';
  PasswordConfirm = this.baseUrl + 'Signner/PasswordConfirmV2';
  SetFollowUnfollow = this.baseUrl + 'Profiles/SetFollowUnfollowV2';
  CreateQuiz = this.baseUrl + 'posting/CreateNewQuizV2';
  PostsLikerCall = this.baseUrl + 'RealTime/PostsLikerCallV2';
  FollowPeopleList = this.baseUrl + 'Profiles/GetFollowPeopleListV2';
  CommentsLikerCall = this.baseUrl + 'RealTime/CommentsLikerCallV2';
  GetUserNoteDataV = this.baseUrl + 'Account/GetUserNoteDataV2';
  UserNoteSave = this.baseUrl + 'Account/UserNoteSaveV2';
  DeleteUserNote = this.baseUrl + 'Account/DeleteUserNoteV2';
  Postingeditpost = this.baseUrl + 'posting/Postingeditpostv2';
  GetSharedPostData = this.baseUrl + 'Posting/GetSharedPostDataV2';
  GetProfilePostsData = this.baseUrl + 'Profiles/GetProfilePostsDataV2';
  UserProfileSave = this.baseUrl + 'Account/UserProfileSaveV2';
  GetInsightsData = this.baseUrl + 'Insights/GetInsightsDataV2';
  GetZerosTopSearch = this.baseUrl + 'Header/GetZerosTopSearchV2';
  UserProfileUploader = this.baseUrl + 'Account/UserProfileUploaderV2';
  GetUserProfileData = this.baseUrl + 'Account/GetUserProfileDataV2';
  GetCommentRepliesData = this.baseUrl + 'Posting/GetCommentRepliesDataV2';
  GetProfileInformeta = this.baseUrl + 'Profiles/GetProfileInformetaV2';
  GetSchdPostsData = this.baseUrl + 'Posting/GetSchdPostsDataV2';
  GetReportCatgData = this.baseUrl + 'Posting/GetReportCatgData';
  GetReportSubCatgData = this.baseUrl + 'Posting/GetReportSubCatgData';

  GetUserNotification = this.baseUrl + 'Header/GetUserNotificationV2';
  MakeQuizVote = this.baseUrl + 'Posting/MakeQuizVoteV2';
  ModifyQuizPost = this.baseUrl + 'Posting/ModifyQuizPostV2';
  Phoneupdate = this.baseUrl + 'Signner/PhoneUpdateNewV2';
  SubmitReport = this.baseUrl + 'Posting/InsertReportData';
  GET_INTEREST = this.baseUrl + 'Posting/GetFeedInterestDataV2';

  GET_Tag = this.baseUrl + 'Posting/GetTaggMetaData';
  GET_HASHTAG = this.baseUrl + 'Posting/GetHagTagMetaData';
  GET_NOTIF_COUNT = this.baseUrl + 'Header/GetUserNotifCountV2';
  NOTIF_READ = this.baseUrl + 'Header/SetNotifReadUnreadV2';
  nugget_activity =
    this.baseUrl + 'BrainBit/UpdateBrainBitNuggetDailyActivityV2';
  update_brainbitSession =
    this.baseUrl + 'BrainBit/UpdateBrainBitSessionActivityV2';
  UPI_PAY = this.baseUrl + 'BrainBit/AddUserBankPaymentAndBrainBitDetailsV2';
  SOCIAL_POINT =
    this.baseUrl + 'BrainBit/GetBrainBitSocialActivityPointsV2?userId=';
  PROMOTIONAL_POINT =
    this.baseUrl + 'BrainBit/GetBrainBitSignUpReedemPointsV2?userId=';
  GET_BACKACC =
    this.baseUrl + 'BrainBit/GetBrainBitUserPaymentDetailsV2?userId=';
  UPDATE_EMAIL = this.baseUrl + 'Signner/EmailUpdateNew';
  ADD_PROMOTIONAL = this.baseUrl + 'BrainBit/AddPromotionalPaymentDetailsV2';
  ADD_SOCIAL = this.baseUrl + 'BrainBit/AddSocialPaymentDetailsV2';
  SOCIAL_STATUS = this.baseUrl + 'BrainBit/GetSocialPaymentStatusV2?userId=';
  PROMOTIONAL_STATUS = this.baseUrl + 'BrainBit/GetPromotionalPaymentStatusV2?userId=';
  ACTIVITY_STATUS = this.baseUrl + 'BrainBit/GetBrainBitSocialActivityStatusV2?userid='
  GET_BIO = this.baseUrl +'Surge/GetUserBio?userid='
}

export const API = new Endpoints();

// 'https://zeros.co.in/apicore/BrainBit/AddPromotionalPaymentDetailsV2
//-------------------------------Brain Bit -------------------------
// https://zeros.co.in/apicore/BrainBit/UpdateBrainBitSessionActivityV2
// UpdateBrainBitNuggetActivityV2
// UpdateBrainBitSessionActivityV2
// GetBrainBitSocialActivityPointsV2

//-----------------------------------
//delete functionality - need to check - pankaj

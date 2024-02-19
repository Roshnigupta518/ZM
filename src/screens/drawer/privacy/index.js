import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const PrivacyPolicy = ({navigation}) => {
  const darktheme = useSelector(state => state.darktheme?.data);
  const login_data = useSelector(state => state.login?.data);
  const dispatch = useDispatch();

  return (
    <View style={st.container(darktheme)}>
      <Header
        title={'Privacy Policy'}
        onPress={() => navigation.goBack()}
        darktheme={darktheme}
      />
      <ScrollView>
        <View style={st.pd20}>
          <Text style={[st.tx14(darktheme), st.txAlignJ,{letterSpacing:0.7, lineHeight:25}]}>
            {
              'Privacy Policy, \nBy Zeros Technologies pvt ltd April 24, 2023. \n\nIndia \nThis Privacy Policy was last updated on April 24, 2023. Zeros Technologies Pvt Ltd. (Company, we, our, us) takes your privacy very seriously. This Privacy Policy (Privacy Policy) describes the usage of information provided or disclosed to the Company, which may be inclusive of your personal information, and also brings to your notice the rights which are afforded to you as per the terms of this Privacy Policy. This Privacy Policy must be read in conjunction with the Terms of Service and the Community Guidelines.'
            }

            {
              '\n\nOur Privacy Policy is in accordance with the applicable laws in the jurisdictions we offer our Services. All capitalized terms that have not been specifically defined herein shall have the same meaning as provided under the Terms of Service.'
            }

            {
              '\n\nBy accessing, downloading, or using the website or the allied mobile application, Zeros App (Application) you agree to be governed by this Privacy Policy.'
            }

            {
              '\n\n1. Scope \n\nThis Privacy Policy applies to the Services, Application, or any online application or service that refers to or links to this Privacy Policy. This Privacy Policy applies regardless of whether you have downloaded or accessed or used the Application from your mobile telephone or handheld device or any other computer resource to access our Services. Zeros is a public, microblogging platform. The users acknowledge and understand that any content (including their user handle, profile picture and published posts/ Zeros) created by the users, is publicly available and searchable by anyone around the world. It is advised that Users do not post any personal (or sensitive) information on  the Application. You should be careful of what you are posting on the Application, as the updates will reflect in your feed and will be visible to other Users of the Application, or anyone else who accesses our Services, depending upon the privacy setting specifically chosen by you for your account. You acknowledge and agree that by providing public Content on Zeros, you are authorizing and advising us to disclose that information on the Application and allow for wide circulation. When you are using hashtags, our APIs, and that of other third-party service providers will also have access to such information. We do not govern the operations of these entities, and you may be required to adhere to their policies, hence, we urge you to refer to their policies and familiarize yourself with the same, prior to engaging with such third-party platforms.'
            }

            {
              '\n\n2. Information We Collect \n\nAt the time of registration: When you choose to register on the Application, we will seek certain identifiers which qualify as personal data (as defined at law), and some of these identifiers will have to be mandatorily collected, and some will have to be collected only upon your discretion, and consent. The information which you provide to us, mandatorily are: Mobile number and/or E-mail address: For creation of a unique profile, identification, authentication via OTP and any communications from us or on our behalf or by any third parties engaged by us to provide the Service. Username or e-mail address or profile photo: If you sign up/sign in to your Zeros account using a One-Tap/Single Sign On (SSO) from any supported third party service which allows authentication of your identity and allows you to share personal information with us (such as your name or email or profile photo) to pre-populate signup/sign into the Zeros platform. '
            }

            {
              '\n\n3. The information which you may choose to additionally provide, are: Name: for purposes of displaying on your profile; User handle preference: for the purposes of identification on the Application; Date of Birth: for the purposes of identification and/or displaying on your profile; Gender: for the purposes of displaying on your profile; Profile Picture: for the purposes of displaying on your profile; Location: for the purposes of customising your experience on the Application; The language that you wish to communicate in: for the purposes of posting content on Zeros; Language preference: for the purposes of customisation of the Content, and other services offered to you; Professional details: for the purposes of displaying on your profile and for customisation of the Content, and other services offered to you; Description of Self: for the purposes of displaying on your profile; Relationship Status: for the purposes of displaying on your profile; Access to information on your device to optimize your use and access of the Services. You can restrict the access granted to the Application, from the device settings. No device permission will be taken from you without your explicit consent; Banking information: for the purposes of redeeming any rewards or conducting any transactions on the Zeros platform, as may be allowed under relevant laws.'
            }

            {
              '\n\n4. At the time of profile verification – In order to verify your profile, we may collect the following information from you:\nMobile number;\nEmail ID;\n\nGovernment-issued identification document(s). We will ask you for this information only when you seek to become an authenticated profile on the Application, while using our Services, and such information is not disclosed to the public. In you log into to your Zeros account using a One-Tap/Single Sign On (SSO) from any supported third party service which allows authentication of your identity and allows you to share personal information, then we collect your name or email or profile photo as approved by you to pre-populate signup/sign into the Zeros platform.'
            }

            {
              '\n\n5. Information to Third Party Service – In addition, if you authorise us to do so, we may grant/link third party services with Zeros (eg. Facebook, Twitter, Instagram, UPI, Google, Gpay etc)  etc.). On your authorization, we may grant such third parties access to some or all (depending on the permission you give) of your information through our own API for use in connection with their services. You have the ability to control what information you share with these third parties through our API, but please note that any information you share with third parties will be governed by their privacy policies and we do not assume any responsibility for such third party’s use of your information.  '
            }

            {
              '\n\n6. Information from your use of our Services – When you use our Services, we may collect the following information automatically: Content of the Zeros (text, images, graphics, audio, visuals, etc.);\n Users you follow on the Application;\n Users who follow you on Application;\n People who have visited your profile and vice versa; Information on your browser’s user agent string and server logs, including your IP address, information in the cookies and activity on the Application ;\nURL information, time stamp, visit information, your browsing history on the Application;\n\nDevice information, such as make, model and operating system of the device  used for browsing the Application; Date of download and/or reinstall of the App; Events related to your actions (follows, reactions to Zeros, time spent, how often and when you visit the Application, etc);Users who send you chat requests and have chatted with you; The Unique Device Identifier on the Application; and Language.\nLocational information as permitted by you in your mobile device settings.We do not collect any further information which is not specifically communicated to you as per this Privacy Policy. You have the ability and choice of restricting certain kinds of information from being collected by adjusting your phone and device settings. Please refer to your phone and device user manuals for more information. '
            }

            {
              '\n\n7. Surveys – We may collect additional information at other times, including but not limited to, when you provide feedback(s), modify your content or email preferences, respond to surveys, provide comments, or communicate with us. This information may include your name, e-mail id, mobile number, location, etc. and only such information that you may choose to specifically provide to us.'
            }

            {
              '\n\n8. Cookies – We use cookies and similar technologies which are necessary to its functioning. Some of these cookies are essential for us to provide you with the Services on the App. We, or our third-party service providers, may use cookies, mobile app analytics and similar technologies to track visitor activity and collect data on the App. We may combine this data with other personal data we have collected from users.'
            }

            {
              '\n\n3. Why We Collect This Information\nWe collect information to provide the Services and for the purposes as outlined below:\n\nTo help us identify you when you log onto the Application and when you register an account with us, and, to validate, authorize and map a specific profile with an authorized user;\n\nTo enhance the quality of the Services that we provide and improve your experience during browsing;\n\nFor providing location-based services, as and where requested by you;\n\nFor the performance of legal obligations;\n\nTo communicate with you;\n\nTo provide you with news, special offers, general information about other products and services along with marketing information and surveys, as agreed to by you;\n\nTo provide and process service requests initiated by you.'
            }

            {
              '\n\n4. When We Share Your Information\n\nWe may share any information with our trusted partners or third parties who provide us with infrastructure support services, for meeting the obligations agreed to between you and us. We may also share aggregated, non-personally identifiable information publicly and with our partners, like publishers, advertisers or connected sites to show trends about the general use of our Services. We will seek your consent prior to using or sharing your personal information for any other purpose, if so, identified at a later stage.\n\nWe may also use your information to perform analytics and conduct customer research, to determine your interest, for identifying content that generates sales and to analyse traffic patterns.\n\nWe also use your information to market to you as per the laws of your country, and to the extent permissible.\n\nYou have the ability to allow us to share your information to third parties so that you can avail their services. You may disable or limit such sharing at any time.'
            }

            {
              '\n\n5. Disclosure Of Information\n\nWe may also disclose your Personal Information only:\n\nAs required by law, such as to comply with a judicial order, executive orders, requirement by a law enforcement authority, or by other legal processes.\n\nWhen your desired products and services can only be provided if your personal information is disclosed.\n\nWhen we believe, in good faith, that disclosure is necessary to protect our rights, protect your safety or the safety of others, or, investigate fraud or crime;\n\nIf we (or our affiliates) are involved in a merger, acquisition, or sale of all or substantially all of its assets or equity. Such information shall be disaggregated to the extent possible and shall be subject to execution of appropriate non disclosure agreements and binding privacy undertakings.\n\n2. We will never rent or sell your personally identifiable information to others.'
            }

            {
              '\n\n6. User Rights On Zeros\n\nWe want to ensure that you are fully empowered on the Zeros platform and are completely aware of the rights that you are entitled to in the course of using our platform. You have a number of rights in relation to the information we hold about you.'
            }

            {
              '\n\nAccess – The right to access the information we hold about you, and to obtain details of the processing. You also have the right to access a list of all the third parties that have your Personal Information through us.\n\nRectification – The right to seek, correct, update and modify the information available with us, to ensure accuracy.\n\nCancellation – The right to seek to cancel or erase, free of charge, your personal data when it is inadequate, excessive, or unnecessary. This shall be subject to lawful processing measures and any legal prescriptions.\n\nObjection – The right to withdraw your consent to our continued processing of the information, at any point of time, subject only to any legitimate reason for continued processing in certain circumstances.\n\nPortability – The right to seek from us your personal data to be provided to another service provider, in a machine-readable format that we use at the time the request was made.\n\nYou may exercise any of these rights by filling out the request form at our Reporting and Redressal page.This shall be subject to the legal requirements, and our internal procedure.'
            }

            {
              '\n\n7. How Long Will Your Personal Information Be Stored With Us?\n\nIn relation to other Personal Information, we store them for certain predetermined periods on the basis of\n\nstatutory and legal requirements;\n\nindustry guidelines,\n\nde-identified or pseudonymised data sets to be used in an aggregated format for scientific, statistical or historical purposes.\n\nWe retain the information which we have collected for a period no longer than is necessary, and as may be required in law. If we need to retain your Personal Information for a longer period, we will inform you prior to the extension of the storage period and seek your explicit consent to extend the retention period. We will delete your information whenever you request us to do so. However, we may archive and/or retain some information for legal purposes. Any other information which is processed by us for analytical purposes, will only be processed in an aggregated or non-identifiable basis.'
            }

            {
              '\n\n8. Opting Out\n\nYou can always opt out of our Services or choose not to disclose information to us at any time. However, keep in mind that some information may be needed to register with us or to take advantage of some of our special features. By providing limited information, or by availing the opt-out provision, you may not be able to access full functionalities of our Services and Application, and some features may be disabled for your access.\n\nWe reserve the right to continue to keep a copy of any of your Personal Information if required by law. We may use any aggregated/anonymised data derived from your account, in a matter which shall not infringe upon your privacy.'
            }

            {
              '\n\n9. The Security Of Your Information\n\nYour personal data is maintained by us in electronic form. We shall take all necessary precautions to protect your personal data and implement reasonable security practices and measures including certain managerial, technical, operational and physical security control measures that are commensurate with respect to the information being collected and the nature of our business. Specifically, we will ensure that the security infrastructure put in place by us to safeguard your Personal Information against loss, unauthorised access, destruction, use, processing, storage, modification or de-anonymisation, will at all times be adherent to the best industry standards.\n\nWe restrict access to personal information to Company employees, contractors, and agents who need that information in order to process it. Anyone with this access is subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations.'
            }

            {
              '\n\n10. GDPR Compliance\n\nThe Application may be accessed and used by residents of the European Economic Area (EEA), who would be regulated by the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation) (GDPR). EU citizens may reach out to us at: redressal@kooapp.com with a subject line “GDPR compliance”. We respond to all requests we receive from individuals wishing to exercise their data protection rights in accordance with applicable data protection laws. Any transfer of data generated from EU citizens shall be subject to the data transfer compliances outlined in GDPR.'
            }

            {
              '\n\n11. Overseas Transfer\n\nYour information may be transferred to and stored in locations outside laws of the territory in which the Company is registered and where the Application is registered on the app stores. We will do this only when the destination jurisdiction has an adequate and appropriate level of protection and where the transfer is lawful, and only when the same is required for us to meet our contractual and statutory obligations, and only where the laws of your country allow us to do so. For completeness, the information which may be transferred outside is such information which may be sent to foreign jurisdictions as per the applicable laws.\n\nWhen we transfer your personal data from your Home Country (country, state and city in which you are present) to the Alternate Country (another country, state and city), we will comply with our legal and regulatory obligations in relation to your personal data, including having a lawful basis for transferring personal data and putting appropriate safeguards in place to ensure an adequate level of protection for the personal data. We will also ensure that the recipient in Alternate Country is obliged to protect your personal data at a standard of protection comparable to the protection under applicable laws.\n\nOur lawful basis for such transfer will be either on the basis of content or one of the safeguards permissible by laws.\n\nFor transfer of data outside the EEA, we will follow adequate safeguards mandated under the GDPR. We ensure an adequate level of protection for the rights of data subjects based on the adequacy of the receiving country’s data protection laws, contractual obligations placed on the recipient of the data (model contractual clauses).'
            }

            {
              '\n\n12. Children\n\nYou must have attained the age of majority to be able to use and access our Services. If you are a minor in your jurisdiction, your registration and use of our Services must be with the supervision of an adult.\n\nAs a parent or legal guardian, please do not allow your minors under your care to submit Personal Information to us. In the event that such personal data of a minor is disclosed to us, you hereby consent to the processing of the minor’s personal data and accept and agree to be bound by this Privacy Policy and take responsibility for his or her actions.'
            }

            {
              '\n\n13. Personal Data Of Others\n\nIn some situations, you may provide personal data of other individuals (family, friends, likewise) to us. If you provide us with such personal data, you represent and warrant that you have obtained their consent for their Personal Information to be collected, used and disclosed as set out in this Privacy Policy.'
            }

            {
              '\n\n14. Changes to this Privacy Policy\n\nWe make periodical changes to the Privacy Policy. Any significant changes we may make to our Privacy Policy in the future will be promptly notified to Users by posting the relevant terms in a prominent position on the webpage. The new terms may be displayed on the webpage, and you will be required to read and accept them to continue your use of the Services.'
            }

            {
              '\n\n15. Grievance Redressal Mechanism\n\nAny discrepancies or grievances with regard to content and or comment or breach of this Agreement shall be taken up with the designated Grievance Officer as mentioned below.\n\nMrs. Savita Chandekar, Grievance Officer\n\nReach out to us on admin@zeros.co.in, info@zeros.co.in or whatsup on 8904703490 in case of any queries. \n\nFor queries regarding processing of personal data, users can write to us at info@zeros.co.in or raise a request using this form. '
            }
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../global/styles/styles';
import {useSelector} from 'react-redux';

const Guideline = () => {
  const darktheme = useSelector(state => state.darktheme?.data);
  return (
    <View style={st.container(darktheme)}>
      <View style={st.pd20}>
        <Text
          style={[
            st.tx16(darktheme),
            st.txAlignC,
            {letterSpacing: 0.7, lineHeight: 25},
          ]}>
          User guide lines for using{'\n'}Zeros Social Media Portal by{'\n'}
          Zeros technologies private limited.{'\n'}
        </Text>

        <Text
          style={[st.tx14_s(darktheme), {letterSpacing: 0.7, lineHeight: 25}]}>
          It contain following topics{'\n'}
        </Text>
        <Text
          style={[st.tx14(darktheme), {letterSpacing: 0.7, lineHeight: 25}]}>
          A) Code of Conduct{'\n'}
          B) Content Policy{'\n'}
          C) Guidleline for reporting Content{'\n'}
          D) Legal Obligations{'\n'}
          E) Guidleline to Earn Reward Point( Brain Bit){'\n'}
        </Text>

        <View style={st.mt_t10}>
          <Text
            style={[st.tx14(darktheme), {letterSpacing: 0.7, lineHeight: 25}]}>
            <Text style={st.txbold}>
              {' '}
              A) Code of conduct include the following guidelines: {'\n'}
              {'\n'}
            </Text>
            <Text style={st.txbold}>1. Respect: </Text> Treat others with
            kindness, empathy, and respect, regardless of their race, ethnicity,
            gender, sexual orientation, religion, or beliefs.{'\n'}
            {'\n'}
            <Text style={st.txbold}>2. Harassment: </Text> Do not engage in
            harassment, bullying, or intimidation of any kind. This includes
            threats, stalking, or unwanted advances.{'\n'}
            {'\n'}
            <Text style={st.txbold}>3. Hate Speech: </Text> Refrain from posting
            or sharing content that promotes discrimination, bigotry, or hate
            speech against individuals or groups.{'\n'}
            {'\n'}
            <Text style={st.txbold}>4. Safety: </Text> Do not endanger yourself
            or others. Avoid sharing personal information that could compromise
            your safety or the safety of others.{'\n'}
            {'\n'}
            <Text style={st.txbold}>5. Privacy: </Text> Respect the privacy of
            others and do not share sensitive or confidential information
            without permission.{'\n'}
            {'\n'}
            <Text style={st.txbold}>6. Intellectual Property: </Text> Respect
            copyright and intellectual property rights. Do not post or share
            content that you do not have the right to distribute.{'\n'}
            {'\n'}
            <Text style={st.txbold}>7. Authenticity: </Text> Be truthful and
            authentic in your interactions. Do not impersonate others or engage
            in deceptive practices.{'\n'}
            {'\n'}
            <Text style={st.txbold}>8. Community Standards: </Text> Follow the
            platfor s guidelines and rules regarding content, conduct, and
            usage. Report violations and help maintain a positive community
            environment.{'\n'}
            {'\n'}
            <Text style={st.txbold}>9. Responsibility: </Text> Take
            responsibility for your actions and their consequences. Think before
            you post or comment, and consider the impact your words may have on
            others.{'\n'}
            {'\n'}
            <Text style={st.txbold}>10. Compliance: </Text> Adhere to all
            applicable laws, regulations, and policies when using the platform.
            Do not engage in illegal activities or encourage others to do so.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>11. Consequences: </Text> Violations of the
            code of conduct may result in disciplinary action, including account
            suspension or termination. Repeat offenders may be permanently
            banned from the platform.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>12. Reporting: </Text> If you encounter
            behavior that violates the code of conduct, report it to the
            platform administrators or moderators immediately. Do not engage
            with or escalate the situation yourself.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              B) Content Policy:{'\n'}
              {'\n'}
            </Text>
            <Text style={st.txbold}>1. Respectful Behavior: </Text> Users must
            engage in respectful and civil behavior at all times. Avoid personal
            attacks, harassment, hate speech, or discrimination against
            individuals or groups based on race, ethnicity, gender, sexual
            orientation, religion, or beliefs.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>2. No Illegal Activities: </Text> Users must
            not engage in or promote illegal activities, including but not
            limited to drug trafficking, fraud, piracy, or violence.
            {'\n'}
            {'\n'} 
            <Text style={st.txbold}>3. Authenticity: </Text> Users must be
            truthful and authentic in their interactions. Do not impersonate
            others or misrepresent yourself or your affiliations.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>4. Intellectual Property: </Text> Respect
            copyright and intellectual property rights. Do not post or share
            content that you do not have the right to distribute, including
            copyrighted material, trademarks, or confidential information.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>5. No Harmful Content: </Text> Users must not
            post or share content that is harmful, offensive, or inappropriate,
            including but not limited to nudity, violence, graphic imagery, or
            explicit language.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>6. Privacy: </Text> Respect the privacy of
            others. Do not share personal or sensitive information without
            permission, and be mindful of privacy settings when posting or
            sharing content.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>7. No Spam or Misinformation: </Text> Users
            must not engage in spamming, phishing, or the dissemination of false
            or misleading information. Do not flood the platform with repetitive
            or irrelevant content.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              8. Compliance with Community Guidelines:
            </Text>
            Users must adhere to the platfor s community guidelines and rules
            regarding content, conduct, and usage. Report violations and help
            maintain a positive community environment.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>9. Safety and Well-being: </Text>
            Users must not endanger themselves or others. Do not promote
            self-harm, suicide, or dangerous activities, and report any
            concerning behavior to platform moderators or authorities.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>10. Age Restrictions: </Text>
            Users must comply with the platfor s age restrictions and refrain
            from sharing inappropriate content with minors.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>11. Consequences for Violations: </Text>
            Violations of the content policy may result in disciplinary action,
            including account suspension or termination.
            {'\n'}
            Repeat offenders may be permanently banned from the platform.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>12. Reporting Violations: </Text>
            If you encounter content or behavior that violates the content
            policy, report it to platform administrators or moderators
            immediately. Do not engage with or escalate the situation yourself.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              C) Guideline for reporting content on Zeros: {'\n'}
              {'\n'}
            </Text>
            On Zeros, users can report various types of content that violate the
            platfor s community standards or terms of service. Some common types
            of content that users might report include:
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>1. Inappropriate or Offensive Posts: </Text>
            Content containing hate speech, harassment, bullying, or
            discriminatory language
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>2. Spam or Scams: </Text>
            Content that is spammy, deceptive, or fraudulent in nature, such as
            fake job postings or misleading advertisements
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              3. Copyright or Intellectual Property Violations:
            </Text>{" "}
            Posts or profiles that infringe on the intellectual property rights
            of others, including copyright infringement, trademark violations,
            or unauthorized use of images or logos.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>4. Impersonation: </Text>
            Profiles or accounts impersonating individuals, businesses, or
            organizations in a deceptive manner.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>5. Misinformation or False Claims: </Text>
            Content that spreads false or misleading information, including
            misinformation about COVID-19, fake news, or conspiracy theories.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              6. Inappropriate or Explicit Contents:
            </Text>{" "}
            Posts, comments, or images containing nudity, sexual content, or
            graphic violence.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>7. Violations of Linkedlns Policies: </Text>
            Content that violates Linkedlns terms of service, including
            violations of their professional community guidelines, user
            agreement, or advertising policies.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              8. Suspicious Activity or Security Concerns:
            </Text>
            Content or profiles engaging in suspicious or malicious activity,
            such as phishing attempts, malware distribution, or hacking
            attempts.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>9. Bullying or Harassment: </Text>
            Posts, comments, or messages that target individuals with
            harassment, threats, or abusive language.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              10. Sensitive or Confidential Information:
            </Text>
            Posts or messages containing sensitive or confidential information,
            such as personal identification numbers, financial information, or
            proprietary business data.
            {'\n'}
            Users can report such content through Zeros reporting feature, as
            described above.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>D) Legal: </Text> Legal basis for processing
            user data on a social media portal typically includes one or more of
            the following:{'\n'}
            {'\n'}
            <Text style={st.txbold}>1. Consent: </Text>
            If User is using Zeros portal than users have provided explicit
            consent for the processing of their personal data for specific
            purposes, such as creating an account, sharing content, or receiving
            personalized advertisements. If your consent is misuse ,you shall
            immediately connect to grivance officer and it will be reslove
            within stitulated time lines.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>2. Contractual Necessity: </Text>
            Processing user data may be necessary for the performance of the
            platform and help user to access platfor s services and Zeros teams
            will manage user accounts, or facilitating communication between
            users.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>3. Legitimate Interests: </Text>
            The platform may have legitimate interests in processing user data
            for purposes such as improving services, preventing fraud or abuse,
            conducting analytics, or protecting the security and integrity of
            the platform. However, these interests must be balanced against the
            rights and freedoms of users.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>4. Compliance with Legal Obligations: </Text>
            The platform may be legally required to process user data to comply
            with applicable laws, regulations, or legal obligations, such as tax
            requirements, law enforcement requests, or court orders. Its
            essential for the social media portal to clearly communicate the
            legal basis for processing user data in its Privacy Policy and to
            ensure that processing activities are conducted to Goverment of
            India Guidleline.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              E) Guidelines for users to earn reward points on a Zeros: {'\n'}
              {'\n'}
            </Text>
            <Text style={st.txbold}>1. Engagement Points: </Text>
            Earn points for engaging with content on the platform, such as
            liking posts, commenting, sharing, or reacting to content from other
            users.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>2. Content Creation: </Text>
            Receive points for creating and sharing original, high-quality
            content, such as posts, articles, photos, videos, or polls that
            generate engagement and interest from other users.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>3. Promotional Rewards: </Text>
            Users join the platform and earn points for each successful signs up
            and becomes an active user.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>4. Completing Profile: </Text>
            Earn points for completing your user profile with accurate and
            up-to-date information, including profile picture, bio, work
            experience, education, skills, and interests.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>
              5. Participating in Challenges or Contests or Qiuz:
            </Text>
            {" "}Participate in platform-sponsored challenges, contests, campaigns or
            Quiza and earn points for meeting specific criteria or achieving
            certain milestones.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>6. Providing Valuable Feedback: </Text>
            Provide valuable feedback, suggestions, or bug reports to the
            platfor s administrators or developers and earn points for
            contributing to the improvement of the platform.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>7. Providing Valuable Feedback: </Text>
            Promote positive community interaction, collaboration, and support
            among users by helping others, sharing valuable resources, or
            offering encouragement, and earn points for fostering a positive
            community environment.
            {'\n'}
            {'\n'}
            <Text style={st.txbold}>8. Achieving Milestones: </Text>
            Reach certain milestones or achievements on the platform, such as
            reaching a certain number of followers, receiving a certain number
            of likes or shares on your content, or earning badges or recognition
            from the pIatform,compIeting daily activites sue as daily login for
            more than 5 mins , watching Nuggets etc and earn points as a reward
            for your accomplishments.
            {'\n'}*Above reward are only to motivate user to use portal Zeros is
            not bind to provide Rewards points to user.
            {'\n'}**Zeros preserve all rights to reward against any activity on
            Zeros portal and have all rights to add or drop any activity to earn
            Reward Point.
            {'\n'}*** Zeros reward point is call Brain Bit.
            {'\n'}
            {'\n'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Guideline;

const styles = StyleSheet.create({});

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomStatusLayout from "../components/CustomStatusLayout";

const TermsCondition = () => {
  return (
    <CustomStatusLayout>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-around",
        }}
        style={{
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            flex: 1,
            gap: 30,
            padding: 12,
          }}
        >
          <Text style={styles.heading}>{"\n"}Terms & Conditions</Text>

          <View>
            <Text style={styles.normalHeading}>1. Acceptance of Terms</Text>
            <Text style={styles.normalText}>
              By accessing or using the ParkingMate App, you acknowledge that
              you have read, understood, and agree to be bound by these Terms,
              including our Privacy Policy. If you do not agree to these Terms,
              do not use the ParkingMate App.
            </Text>
          </View>
          <View>
            <Text style={styles.normalHeading}>2. Description of Services</Text>
            <Text style={styles.normalText}>
              The ParkingMate App provides a platform that connects drivers
              seeking parking spaces (“Drivers”) with individuals or entities
              offering parking spaces (“Driveway Hosts”). The ParkingMate App
              facilitates this connection but is not a party to any agreements
              between Drivers and Driveway Hosts. The ParkingMate App does not
              own, operate, or control the parking spaces offered by Driveway
              Hosts.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>3. Eligibility</Text>
            <Text style={styles.normalText}>
              You must be at least 18 years old to use the ParkingMate App. By
              using theParkingMate App, you represent and warrant that you are
              at least 18 years old and have the legal capacity to enter into
              binding agreements.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>4. User Accounts</Text>
            <Text style={styles.normalText}>
              To use certain features of the ParkingMate App, you may be
              required to create a user account. You are responsible for
              maintaining the security and confidentiality of your account
              credentials. You agree to notify the Company immediately of any
              unauthorized access to or use of your account. Drivers acknowledge
              that you hold a valid drivers license and is authorized to operate
              the vehicle you will be parking. Driveway Hosts, acknowledge that
              they own or have full authorization to provide the space they are
              advertising.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>5. Use of the App</Text>
            <Text style={styles.normalText}>
              a. You agree to use the ParkingMate App in compliance with all
              applicable laws and regulations.{"\n"}
              {"\n"} b. You agree not to use the ParkingMate App for any
              unlawful or fraudulent purposes.{"\n"}
              {"\n"} c. You agree not to interfere with the proper functioning
              of the ParkingMate App or attempt to access the ParkingMate App's
              data or systems without authorization.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>6. Parking Agreements</Text>
            <Text style={styles.normalText}>
              a. Drivers and Driveway Hosts are solely responsible for agreeing
              upon the terms and conditions of parking arrangements, including
              but not limited to duration, fees, and any additional terms.{" "}
              {"\n"}
              {"\n"}
              b. ParkingMate is not responsible for the accuracy or completeness
              of any information provided by Drivers or Driveway Hosts,
              including the availability, location, and condition of parking
              spaces.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>7. Payment</Text>
            <Text style={styles.normalText}>
              a. Drivers agree to pay the fees specified by Driveway Hosts for
              using their parking spaces, as agreed upon between the parties.{" "}
              {"\n"}
              {"\n"}b. ParkingMate may facilitate payments on behalf of Drivers
              & Driveway Hosts through third-party payment processors. By using
              the ParkingMate App, you agree to the terms and conditions of
              these third-party payment processors.{"\n"}
              {"\n"} c. Payout to Driveway Hosts will be paid 3-5 business days
              by use of the 'Cashout' function. Payments will be made by our
              payment gateway provider, Stripe
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>8. Privacy</Text>
            <Text style={styles.normalText}>
              Your use of the ParkingMate App is also governed by our Privacy
              Policy, which is incorporated by reference into these Terms.
            </Text>
          </View>

          <View>
            <Text style={styles.normalHeading}>9. Disclaimers</Text>
            <Text style={styles.normalText}>
              a. The Parking Mate does not endorse or guarantee the
              availability, safety, legality, quality, or accuracy of parking
              spaces offered by Driveway Hosts.{"\n"}
              {"\n"} b. You use the ParkingMate App at your own risk, and
              ParkingMate is not responsible for any disputes or incidents that
              may arise between Drivers and Driveway Hosts.
            </Text>
          </View>
          <View>
            <Text style={styles.normalHeading}>10. Termination</Text>
            <Text style={styles.normalText}>
              The ParkingMate App reserves the right to suspend or terminate
              your access to the ParkingMate App at its sole discretion, with or
              without cause, and without notice.
            </Text>
          </View>
          <View>
            <Text style={styles.normalHeading}>11. Changes to Terms</Text>
            <Text style={styles.normalText}>
              The ParkingMate App may update these Terms from time to time. Your
              continued use of the ParkingMate App after any changes to these
              Terms constitutes your acceptance of the updated Terms.
            </Text>
          </View>
          <View>
            <Text style={styles.normalHeading}>12. Contact Information</Text>
            <Text style={styles.normalText}>
              If you have any questions or concerns about these Terms or the
              ParkingMate App's services, please contact us at
              support@parkingmate.us{"\n"}
              These Terms constitute the entire agreement between you and
              ParkingMate App regarding the use of the ParkingMate App and its
              services and supersede all prior agreements and understandings.
            </Text>
          </View>

          {/* Repeat the above structure for each section of the Terms & Conditions */}
          {/* Remember to adjust the content and styles accordingly */}
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: 1,
            gap: 30,
            padding: 12,
          }}
        >
          <Text>
            <Text style={styles.myHeading}>
              PARKING MATE LLC Privacy Policy{"\n"}
            </Text>
            Parking Mate LLC . The new rules relating to how we collect and
            process Personal Data – The US General Data Protection Regulation
            (GDPR) {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>What is GDPR? </Text> {"\n"}
            The GDPR is the US’s new framework for data protection laws. It
            replaces the previous data protection directive, which current US
            law is based upon.{"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Single Sign-On</Text> {"\n"}
            You can log in to our App using sign-in services. These services
            will authenticate your identity and provide you the option to share
            certain personal information with us such as your name, email
            address and phone number to pre-populate our sign up form.{"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Choice/Opt-Out</Text> {"\n"}
            We generally retain your ID only for so long as is necessary for the
            purpose for which it is used, or required by law. As a Parking Mate
            LLC member, you may use the following options for removing your
            information from our database or if you wish to opt out of receiving
            future communications.{"\n"}Go to our website parkingmate.us and
            complete the Contact form at the bottom portion of the page. Or send
            an email to our support team: support@parkingmate.us
            {"\n"} {"\n"}
            <Text style={styles.myHeading}>Access to Information</Text> {"\n"}
            The Act gives you the right to access information held about you.
            Your right of access can be exercised in accordance with the Act.
            Any access request may be subject to a small administration charge
            to meet our costs in providing you with the details of the
            information we hold about you. We will respond to all access
            requests within 30 days.{"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              Correct/Update/Delete personal Information
            </Text>
            {"\n"}
            Parking Mate LLC provides members with the opportunity to correct,
            update, or delete personal information that has been provided to us
            by using the methods below.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Contacting the Website</Text>
            {"\n"}
            If you have any questions about this privacy statement, the
            practices of this site, you can contact: Site Administrator
            support@parkingmate.us
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              Acceptance of Privacy Statement
            </Text>
            {"\n"}
            Your use of our website, including any dispute concerning privacy,
            is subject to this privacy statement and the applicable Terms and
            Conditions of Service.{"\n"}
            Any changes we may make to our privacy policy in the future will be
            posted on this page and, where appropriate, notified to you by
            e-mail or other suitable means. Your continued use of any section of
            our website following posting and/or notification of the updated
            privacy policy will constitute your acceptance of the privacy policy
            as amended.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              Parking Mate LLC Privacy Policy
            </Text>{" "}
            {"\n"}
            This privacy policy (this “Policy”) describes the practices of
            Parking Mate LLC, and any affiliates, (collectively “we”, “us”,
            “our”) with respect to our collection, use, storage and disclosure
            of personal information provided to us from users of our Website.
            This Policy forms an integral part of Terms of Use Agreement, which
            is incorporated by reference. Any capitalized term used but not
            defined in this Policy will have the meaning defined in the Terms of
            Use Agreement.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>INTRODUCTION</Text> {"\n"}
            {"\n"}
            We respect and uphold individual rights to privacy and the
            protection of personal information. We know how important it is to
            protect your personal information and want to make every customer
            experience safe and secure. In keeping with that goal, we have
            developed this Policy to explain our practices for the collection,
            use, and disclosure of your personal information.
            {"\n"}
            For the purposes of this Policy, “personal information” means
            information about an identifiable individual, including, for
            example, name, home address, telephone number. We will only collect,
            use or disclose personal information in accordance with this Policy,
            or in accordance with laws applicable to the collection, use and
            disclosure of your personal information by us (“Applicable Privacy
            Laws”).
            {"\n"}
            We have appointed a Privacy Officer who is responsible for our
            compliance with this Policy. Information on how to contact the
            Privacy Officer can be found below.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              COLLECTION AND USE OF PERSONAL INFORMATION
            </Text>
            {"\n"}
            {"\n"}
            We collect two types of information through our App: personal
            information and non-personal information. The types of information
            we collect depend on the nature of your interaction with us. {"\n"}
            {"\n"}Personal information{"\n"}
            {"\n"}We may collect personal information such as:{"\n"}
            {"\n"}Your contact information – for example, Your name,email
            address and phone number for the purposes of becoming a ‘Driveway
            Host’ or a Driver searching for parking.
            {"\n"}
            {"\n"}Your profile information – for example, a profile picture for
            your profile or Driveway photographs you upload, and other
            information you provide in your personal profile.
            {"\n"}
            {"\n"}Non-personal information{"\n"}
            {"\n"}Non-personal information does not identify You as an
            individual. For example:{"\n"}
            {"\n"}We may collect certain non-personal data when You visit our
            Website, (parkingmate.us) such as the type of browser you are using
            or the referring URL; or {"\n"}
            {"\n"}We may collect and summarize customer information in a
            non-personal, aggregate format for statistical and research
            purposes. We may, for example, summarize our data to determine that
            a certain percentage of users rent their Driveways in the New York
            region.
            {"\n"}
            {"\n"}You may choose not to provide us with your personal
            information. However, if you make this choice we may not be able to
            provide you with the service, or information that you requested. For
            example, we require your email address and phone number in order to
            verify your account, which is necessary so that notifications may be
            sent to you electronically. Should you no longer wish to receive
            notifications from Parking Mate LLC when you receive a message from
            another Parking Mate LLC user. Parking Mate LLC will not send you
            notifications after your account is deleted.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>USE OF PERSONAL INFORMATION</Text>
            {"\n"}
            {"\n"}
            We may use your personal information for a number of different
            business purposes, for example to:{"\n"}
            Provide customer support to assist you with your questions or
            complaints;{"\n"}
            Conduct surveys in order to improve our services;{"\n"}
            Notify you of changes to our services, or new services that we may
            implement from time to time;{"\n"}
            Measure and improve the effectiveness of our Website or our
            marketing endeavors;{"\n"}
            Detect and protect against fraud and error;{"\n"}
            Track and analyze your preferences to better understand your service
            needs and eligibility; and for other purposes as described in this
            Policy.{"\n"}
            We limit the personal information we collect and use to that which
            is necessary to fulfill our business purposes. We will not collect,
            sell, distribute or use personal information for any other purposes.
            Except to the extent as required by law or as authorized by
            Applicable Privacy Laws.{"\n"}
            {"\n"}
            <Text style={styles.myHeading}>YOUR CONSENT</Text> {"\n"}
            {"\n"}
            When you choose to provide us with your personal information You
            consent to the use of your personal information as identified in
            this Policy and as may be further identified at the time of
            collection.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Express Consent:</Text>
            {"\n"}
            {"\n"}
            Sometimes you will be asked to give your express consent to our
            collection, use or disclosure of personal information – for example,
            by being asked to check a box to indicate your consent to receive
            marketing communications.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Implied Consent:</Text> {"\n"}
            {"\n"}
            Other times, you may provide your implied consent to our collection,
            use or disclosure of personal information when we can reasonably
            conclude that you have given consent by some action you have taken
            or an action you have decided not to take. Generally, this occurs
            where the purpose for the use of your personal information would be
            reasonably apparent to you – for example, when you provide us with
            personal information through forms to populate your Driveway Host
            profile, You provide us with implied consent to publish that
            information for other users of the App to view.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Withdrawing Your Consent:</Text>{" "}
            {"\n"}
            {"\n"}You may notify us at any time that you wish to withdraw or
            change your consent to our use and disclosure of your information.
            We will accommodate your request subject to legal and contractual
            restrictions.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              INFORMATION WE MAY COLLECT DIRECTLY FROM YOU
            </Text>
            {"\n"}
            {"\n"}
            Listed here are some further examples of the ways that we collect
            personal information directly from you and how we use it.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Follow-Up and Surveys:</Text>
            {"\n"}
            {"\n"}From time to time, we may send you a follow-up email to thank
            you for your use of the Parking Mate App, or we may contact you to
            ensure that you are completely satisfied. {"\n"}We may use contact
            information collected online to conduct occasional surveys and other
            customer research. These surveys are entirely voluntary and you may
            easily decline to participate.{"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Our App</Text>
            {"\n"}
            {"\n"}Our App can be browsed anonymously. However, to engage in
            certain special features or functions of our App, You may be asked
            to provide certain personal information, such as your email address
            and phone number. We use this information to create your account,
            contact and correspond with you about your account, respond to your
            inquiries, and monitor functions of our App that you choose to use.
            {"\n"}     {"\n"}
            <Text style={styles.myHeading}>Our Mobile Applications</Text>
            {"\n"}
            {"\n"}When you use any mobile device to access our App and download
            any of our applications, we may collect device information (such as
            your mobile device ID, model and manufacturer), operating system and
            version information.
            {"\n"}We collect your geo-locational information only upon your
            consent. By sharing your geo-locational information with us, you
            agree to be bound by Google’s Terms of Use
            (http://www.google.com/intl/en_ALL/help/terms_maps.html). We are
            using the Maps API(s) in our mobile application, and incorporated by
            reference to this Policy is the Google privacy policy (currently
            http://www.google.com/privacy.html), as amended by Google from time
            to time{"\n"}If you use the Parking Mate LLC Android application,
            (The Android version will be released in November 2024) You are
            asked to allow for the Device & App permission to obtain information
            regarding which applications are stored on your device, their
            activity on your device, and which apps are running, in order to
            learn more about you and your preferences, as part of Parking Mate
            LLC algorithm for finding parking and Driveway Hosts and providing
            you more relevant advertisements. By accepting the requested
            permissions before installation, You acknowledge and understand that
            the program performs these functions and agree to this, and you
            understand that you can withdraw your consent at any time by
            uninstalling the PParking Mate LLC Android application.
            {"\n"}   {"\n"}
            <Text style={styles.myHeading}>
              DISCLOSURE AND SHARING OF YOUR INFORMATION
            </Text>
            {"\n"}
            {"\n"}We do not sell or license your personal information to any
            other party.
            {"\n"}  {"\n"}
            <Text style={styles.myHeading}>Service Providers</Text> {"\n"}
            {"\n"}We may use third party service providers (for example, web
            hosting providers, data management providers and/or payment
            processors) to manage one of more aspects of our business
            operations, including the processing or handing of personal
            information. When we do use an outside company, we use contractual
            or other appropriate means to ensure that your personal information
            is used in a manner that is consistent with this Policy.
            {"\n"}Your credit/debit card details used on the Parking Mate App is
            handled by our Payment gateway partners ‘Stripe’ We never see
            personal banking information. This is handled securely by ‘Stripe’
            Please see their terms of service www.stripe.com  {"\n"} To provide
            increased availability of the Website/App, some of these operations
            may result in personal information collected by Parking Mate LLC
            being stored outside the United States and, as a result, such
            personal information stored outside the United States may be
            accessible to law enforcement and regulatory authorities in
            accordance with applicable laws of countries outside the United
            States.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>Legal Disclosure</Text>
            {"\n"}
            {"\n"}We may disclose your information as permitted or required by
            law. For example, we may be compelled to release information by a
            court of law or other person or entity with jurisdiction to compel
            production of such information. If we have reasonable grounds to
            believe information could be useful in the investigation of improper
            or unlawful activity, we may disclose information to law enforcement
            agencies or other appropriate investigative bodies.
            {"\n"}   {"\n"}
            <Text style={styles.myHeading}>
              SECURITY OF PERSONAL INFORMATION:
            </Text>
            {"\n"}
            {"\n"}
            The security of your personal information is a high priority for us.
            We maintain appropriate safeguards and current security standards to
            protect your personal information, whether recorded on paper or
            captured electronically, against unauthorized access, disclosure, or
            misuse. For example, electronic records are stored in secure,
            limited-access servers; we employ technological tools like firewalls
            and passwords; and we ensure our employees are trained on the
            importance of maintaining the security and confidentiality of
            personal information. Reasonably secure methods are used whenever we
            destroy personal information. For example, we currently use SSL
            encryption with a 2048 bit RSA key digital certificate. However, no
            system can be completely secure. While Parking Mate LLC takes steps
            to secure your information, we do not promise, and you should not
            expect, that your personal information will always remain secure.
            {"\n"}
            {"\n"}
            <Text style={styles.myHeading}>
              REQUESTS FOR ACCESS TO AND CORRECTION OF PERSONAL INFORMATION:
            </Text>
            {"\n"}
            {"\n"}Applicable Privacy Laws allows any individual the right to
            access and/or request the correction of errors or omissions in his
            or her personal information that is in our custody or under our
            control. Our Privacy Officer will assist the individual with the
            access request. This includes:{"\n"}
            Identification of personal information under our custody or control;
            and information about how personal information under our control may
            be or has been used by us.{"\n"}
            We will respond to requests within the time allowed by Applicable
            Privacy Laws and will make every effort to respond as accurately and
            completely as possible. Any corrections made to personal information
            will be promptly sent to any organization it was disclosed to.{"\n"}
            In certain exceptional circumstances, we may not be able to provide
            access to certain personal information it holds about an individual.
            For security purposes, not all personal information is accessible
            and amendable by the Privacy Officer. If access or corrections
            cannot be provided, we will notify the individual making the request
            within 30 days, in writing, of the reasons for the refusal.{"\n"}
            {"\n"}   {"\n"}
            <Text style={styles.myHeading}>REMOVAL OF YOUR INFORMATION</Text>
            {"\n"}
            {"\n"}We keep your information only as long as we need it for
            legitimate business purposes and to meet any legal requirements.
            Personal information used to make a decision that directly affects
            an individual will be kept for at least one year after such a
            decision. We have retention standards that meet these parameters.
            {"\n"}   {"\n"}
            <Text style={styles.myHeading}>
              Digital Millennium Copyright Act Notice
            </Text>
            {"\n"}
            {"\n"}
            If you believe that your copyrighted work has been copied in a way
            that constitutes copyright infringement and is accessible on this
            Site, please notify Parking Mate LLC privacy officer, as set forth
            in the Digital Millennium Copyright Act of 1998 (DMCA). For your
            complaint to be valid under the DMCA, You must provide the following
            information in writing:{"\n"}• An electronic or physical signature
            of a person authorized to act on behalf of the copyright owner;
            {"\n"}• Identification of the copyrighted work that you claim is
            being infringed;{"\n"}• Identification of the material that is
            claimed to be infringing and where it is located on the App{"\n"}•
            Information reasonably sufficient to permit Parking Mate LLC to
            contact you, such as your address, telephone number, and e-mail
            address;{"\n"}• A statement that you have a good faith belief that
            use of the material in the manner complained of is not authorized by
            the copyright owner, its agent, or law; and{"\n"}• A statement, made
            under penalty of perjury, that the above information is accurate,
            and that you are the copyright owner or are authorized to act on
            behalf of the owner.{"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "500", fontSize: 15, textAlign: "center" }}
            >
              Copyright 2024 PARKING MATE
            </Text>
            {"\n"}
            {"\n"}
          </Text>
        </View>
      </ScrollView>
    </CustomStatusLayout>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  myHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  normalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  normalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "left",
  },

  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  listItem: {
    marginBottom: 12,
  },
});

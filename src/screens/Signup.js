import React, { useEffect, useRef, useState } from "react";
// import Toast from "react-native-toast-message";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";
// import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authActions";
import { updateSignupStatus } from "../features/auth/authSlice";
import Toast from "../components/Toast";
import { BASE_URL } from "@env";
import Colors from "../constants/Colors";
import { analyticsEvent } from "../utils/analytics";

const UnderlinedText = ({ children, active, handleEveryStep, myVal }) => (
  <View>
    <Text
      style={{ color: Colors.primaryColor, fontWeight: "500" }}
      onPress={() => handleEveryStep(myVal)}
    >
      {children}
    </Text>
    {active ? (
      <View style={styles.activeUnderline} />
    ) : (
      <View style={styles.underline} />
    )}
  </View>
);

const Signup = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [showYoga, setShowYoga] = useState(false);
  const [showZumba, setShowZumba] = useState(false);
  const [showPilates, setShowPilates] = useState(false);
  const [isEmailValid, setEmailIsInValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isStudent, setIsStudent] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const [studentData, setStudentData] = useState({
    AccountStatus: "pending",
    FirstName: "",
    LastName: "",
    Gender: "",
    Email: "",
    Password: "",
    Role: "student",
    PhoneNumber: "",
    DateOfBirth: "",
    Address: "",
    ZipCode: "",
    City: "",
    Country: "",
    AboutUs: "",
    EnvironmentTakeYourClass: "",
    SkillLevel: "",
  });
  const [instructorData, setInstructorData] = useState({
    AccountStatus: "pending",
    FirstName: "",
    LastName: "",
    Gender: "",
    Email: "",
    Password: "",
    Role: "instructor",
    PhoneNumber: "",
    DateOfBirth: "",
    Address: "",
    ZipCode: "",
    City: "",
    Country: "",
    PrimaryFitnessSpecialization: "",
    // PrimarySubFitnessSpecialization: "",
    FitnessAchievementsAwards: "",
    EnvironmentHoldYourClass: "",
    YearsOfExperience: "",
    ISkillLevel: "",
  });

  // showToast();

  console.log(instructorData);

  const dispatch = useDispatch();
  const { otpCode, signupStatus, user, isLoading, error } = useSelector(
    (state) => state.user
  );

  console.log({ otpCode, signupStatus, user, isLoading, error });

  useEffect(() => {
    console.log("yess useffect");

    if (error) {
      errorToast();
      return;
    }

    if (signupStatus === "success") {
      if (isStudent) {
        analyticsEvent("Student_Signup", { email: studentData.Email });
        showToast();
        setTimeout(() => {
          dispatch(updateSignupStatus());
          navigation.navigate("Otp", { email: studentData.Email });
        }, 2000);
        return;
      } else {
        analyticsEvent("Instructor_Signup", { email: instructorData.Email });
        showToast();
        setTimeout(() => {
          dispatch(updateSignupStatus());
          navigation.navigate("Otp", { email: instructorData.Email });
        }, 2000);
        return;
      }
    }

    console.log("yeee");

    if (instructorData.Email.length > 0) {
      const validateMyMail = setTimeout(() => {
        // alert("deboucne");
        validateEmail(instructorData.Email);
      }, 2000);

      return () => clearTimeout(validateMyMail);
    } else if (studentData.Email.length > 0) {
      const validateMyMail = setTimeout(() => {
        // alert("deboucne");
        validateEmail(studentData.Email);
      }, 2000);

      return () => clearTimeout(validateMyMail);
    } else if (
      instructorData.Email.length === 0 ||
      studentData.Email.length === 0
    ) {
      setEmailIsInValid(false);
    }
  }, [instructorData.Email, studentData.Email, signupStatus, error]);

  const handleStudentAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setStudentData((prevData) => ({
      ...prevData,
      Address: address,
      City: city,
      Country: country,
    }));
  };
  const handleInstructorAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setInstructorData((prevData) => ({
      ...prevData,
      Address: address,
      City: city,
      Country: country,
    }));
  };

  console.log("STUDENT DATA: ", studentData);

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast();
    }
  };

  // Error toast
  const ErrorToastRef = useRef(null);
  const errorToast = () => {
    console.log("ERRORTOAST: ", ErrorToastRef);
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast();
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // handle Every step
  const handleEveryStep = (stepNum) => {
    setStep(stepNum);
  };

  const handleIsStudent = () => {
    setIsStudent(true);
    setIsInstructor(false);
    setStep(1);
  };

  const handleIsInstructor = () => {
    setIsInstructor(true);
    setIsStudent(false);
    setStep(1);
  };

  const pickerItems = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
  ];
  const pickerPrimarySpecializationItems = [
    { label: "Yoga", value: "Yoga" },
    { label: "Zumba", value: "Zumba" },
    { label: "Pilates", value: "Pilates" },
    { label: "Aerobic Gymnastics", value: "Aerobic Gymnastics" },
    { label: "Badminton", value: "Badminton" },
    { label: "Baseball", value: "Baseball" },
    { label: "Basketball", value: "Basketball" },
    { label: "Bowling", value: "Bowling" },
    { label: "Boxing", value: "Boxing" },
    { label: "Cricket", value: "Cricket" },
    { label: "Dance Fitness", value: "Dance Fitness" },
    { label: "Fencing", value: "Fencing" },
    { label: "Figure Skating", value: "Figure Skating" },
    { label: "Football (U.K)", value: "Football (U.K)" },
    { label: "Soccer (U.S)", value: "Soccer (U.S)" },
    { label: "Golf", value: "Golf" },
    { label: "Handball", value: "Handball" },
    { label: "Hockey", value: "Hockey" },
    { label: "Ice Hockey", value: "Ice Hockey" },
    { label: "Ice Skating", value: "Ice Skating" },
    { label: "Judo", value: "Judo" },
    { label: "Karate", value: "Karate" },
    { label: "Kendo", value: "Kendo" },
    { label: "Kick Boxing", value: "Kick Boxing" },
    { label: "Mixed Martial Arts", value: "Mixed Martial Arts" },
    { label: "Rugby", value: "Rugby" },
    { label: "Sailing", value: "Sailing" },
    { label: "Squash", value: "Squash" },
    { label: "Table Tennis", value: "Table Tennis" },
    { label: "Taekwondo", value: "Taekwondo" },
    { label: "Tennis", value: "Tennis" },
    { label: "Track and Field", value: "Track and Field" },
    { label: "Trampolining", value: "Trampolining" },
    { label: "Volleyball", value: "Volleyball" },
    { label: "Weightlifting", value: "Weightlifting" },
    { label: "Wrestling", value: "Wrestling" },
  ];

  const pickerPrimaryYogaItems = [
    { label: "Vinyasa yoga", value: "Vinyasa yoga" },
    { label: "Hatha yoga", value: "Hatha yoga" },
    { label: "Iyengar yoga", value: "Iyengar yoga" },
    { label: "Kundalini yoga", value: "Kundalini yoga" },
    { label: "Ashtanga yoga", value: "Ashtanga yoga" },
    { label: "Bikram yoga", value: "Bikram yoga" },
    { label: "Yin yoga", value: "Yin yoga" },
    { label: "Restorative yoga", value: "Restorative yoga" },
    { label: "Prenatal yoga", value: "Prenatal yoga" },
    { label: "Anusara yoga", value: "Anusara yoga" },
    { label: "Jivamukti yoga", value: "Jivamukti yoga" },
  ];

  const pickerPrimaryZumbaItems = [
    { label: "Zumba Gold", value: "Zumba Gold" },
    { label: "Zumba Dance", value: "Zumba Dance" },
    { label: "Zumba Classic", value: "Zumba Classic" },
    { label: "Aqua Zumba", value: "Aqua Zumba" },
    { label: "Zumba Kids", value: "Zumba Kids" },
    { label: "Zumba Gold-Toning", value: "Zumba Gold-Toning" },
    { label: "Zumba Strong", value: "Zumba Strong" },
  ];

  const pickerPrimaryPilatesItems = [
    { label: "Everyday Pilates", value: "Everyday Pilates" },
    { label: "Polestar Pilates", value: "Polestar Pilates" },
    {
      label: "Classical Pilates (Smart Body)",
      value: "Classical Pilates (Smart Body)",
    },
    { label: "Stott Pilates", value: "Stott Pilates" },
  ];

  const pickerEnvironmentClass = [
    {
      label: "In Person Class",
      value: "In Person Class",
    },
    { label: "In Person 1:1", value: "In Person 1:1" },
    { label: "Virtual", value: "Virtual" },
  ];
  const pickerYearsOfExperience = [
    {
      label: "6 month",
      value: "6 month",
    },
    { label: "1 year", value: "1 year" },
    { label: "2 year", value: "2 year" },
    { label: "3 year", value: "3 year" },
    { label: "4 year", value: "4 year" },
    { label: "5 year", value: "5 year" },
    { label: "10 year", value: "10 year" },
    { label: "10+ year", value: "10+ year" },
  ];
  const pickerGender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleAgreementToggle = () => {
    setIsAgreed(!isAgreed);
  };

  // handling date change
  const handleDateChange = (event, selectedDate) => {
    if (isStudent) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setStudentData({
        ...studentData,
        DateOfBirth: currentDate.toLocaleDateString(),
      });
    } else {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setInstructorData({
        ...instructorData,
        DateOfBirth: currentDate.toLocaleDateString(),
      });
    }
  };

  // Validate Emails
  const validateEmail = (emailToTest) => {
    // console.log("Valid Email:", emailToTest);
    // Email regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(emailToTest)) {
      // alert("Invalid Email", "Please enter a valid email address.");
      setEmailIsInValid(true);
      return;
    } else {
      console.log("Valid Email:", emailToTest);
      setEmailIsInValid(false);
      return;
    }

    // Email is valid, do something
    // ...
  };

  // handle Instructor signup
  const handleInstructorSignup = () => {
    console.log(instructorData);
    const isNotEmpty = Object.values(instructorData).every(
      (value) => value.trim() !== ""
    );
    // If all instructor signup fields are not empty then we can only signup
    if (isNotEmpty) {
      console.log("isNotEmpty: ", isNotEmpty);
      if (isAgreed) {
        dispatch(signup(instructorData));
      } else {
        Alert.alert("Please agree to the terms and conditions");
      }
    } else {
      Alert.alert("Fill all fields to signup");
    }
  };

  // handle Student signup
  const handleStudentSignup = () => {
    console.log("BASE URL: ", BASE_URL);
    const isNotEmpty = Object.values(studentData).every(
      (value) => value.trim() !== ""
    );
    // If all student signup fields are not empty then we can only signup
    if (isNotEmpty) {
      console.log("isNotEmpty: ", isNotEmpty);
      if (isAgreed) {
        dispatch(signup(studentData));
      } else {
        Alert.alert("Please agree to the terms and conditions");
        return;
      }
    } else {
      Alert.alert("Fill all fields to signup");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: Colors.black }}
            size={28}
          />
        </Pressable>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/512-fithubs.png")}
          />
        </View>
      </View>
      <View
        style={{
          width: "90%",
          alignItems: "flex-start",
          gap: 5,
        }}
      ></View>
      <View style={{ width: "90%", alignItems: "center", gap: 25 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.black }}>
          Register As
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox
              color={isStudent ? Colors.primaryDark : Colors.primaryNormal}
              style={{
                borderWidth: isStudent ? 3 : 1,
                borderRadius: 12,
                transform: [{ scale: 1.1 }],
              }}
              value={isStudent}
              onValueChange={handleIsStudent}
            />
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                textDecorationLine: "none",
              }}
            >
              Student
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox
              color={isStudent ? Colors.primaryNormal : Colors.primaryDark}
              style={{
                borderWidth: isInstructor ? 3 : 1,

                borderRadius: 12,
                transform: [{ scale: 1.1 }],
              }}
              value={isInstructor}
              onValueChange={handleIsInstructor}
            />
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                textDecorationLine: "none",
              }}
            >
              Instructor
            </Text>
          </View>
        </View>
      </View>
      {/* Instructors */}
      {isInstructor && (
        <>
          {/* Step 1 */}
          {step === 1 && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
              style={{
                backgroundColor: Colors.white,
                width: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  flex: 1,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "90%",
                    alignItems: "center",
                    gap: 22,
                    marginTop: 30,
                  }}
                >
                  {/* Multi step */}
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 18,
                      }}
                    >
                      <UnderlinedText
                        active={true}
                        handleEveryStep={handleEveryStep}
                        myVal={1}
                      >
                        Personal Info
                      </UnderlinedText>
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={2}
                      >
                        Specialization
                      </UnderlinedText>
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={3}
                      >
                        Experience
                      </UnderlinedText>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                    }}
                  >
                    Enter your details
                  </Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="First Name"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.FirstName}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, FirstName: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Last Name"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.LastName}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, LastName: text })
                    }
                  />
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setInstructorData({ ...instructorData, Gender: value });
                      }}
                      items={pickerGender}
                      placeholder={{
                        label: "Select Gender",
                        value: "",
                      }}
                      value={instructorData.Gender}
                    />
                  </View>
                  <TextInput
                    style={
                      isEmailValid ? styles.invalidEmail : styles.inputStyle
                    }
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.Email}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, Email: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    placeholderTextColor={Colors.primaryColor}
                    autoCapitalize="none"
                    secureTextEntry
                    value={instructorData.Password}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, Password: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Phone number"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.PhoneNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        PhoneNumber: text,
                      })
                    }
                  />
                  <Pressable style={styles.dateStyle}>
                    <Text style={{ color: Colors.primaryColor }}>
                      {instructorData.DateOfBirth.length > 0
                        ? instructorData.DateOfBirth
                        : "Select your Date of Birth"}
                    </Text>
                    <View
                      style={{
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <RNDateTimePicker
                        style={{ marginTop: 8, height: "80%" }}
                        textColor="blue"
                        mode="date"
                        display="default"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </View>
                  </Pressable>

                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Address"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.Address}
                    onPressIn={() =>
                      navigation.navigate("Address", {
                        onAddressSelect: handleInstructorAddressSelect,
                      })
                    }
                    // onChangeText={(text) =>
                    //   setInstructorData({ ...instructorData, Address: text })
                    // }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Zip Code"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.ZipCode}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, ZipCode: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="City"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.City}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, City: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Country"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.Country}
                    onChangeText={(text) =>
                      setInstructorData({ ...instructorData, Country: text })
                    }
                  />

                  {/* ------ */}
                </View>

                <View
                  style={{ width: "90%", alignItems: "center", marginTop: 5 }}
                >
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleNextStep}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 25 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#b3b3b3",
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Signin")}
                    >
                      Sign in here
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
          {/* Step 2  */}
          {step === 2 && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
              style={{
                backgroundColor: Colors.black,
                width: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  flex: 1,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "90%",
                    alignItems: "center",
                    gap: 22,
                    marginTop: 30,
                  }}
                >
                  {/* Multi step */}
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 18,
                      }}
                    >
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={1}
                      >
                        Personal Info
                      </UnderlinedText>
                      <UnderlinedText
                        active={true}
                        handleEveryStep={handleEveryStep}
                        myVal={2}
                      >
                        Specialization
                      </UnderlinedText>
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={3}
                      >
                        Experience
                      </UnderlinedText>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                    }}
                  >
                    Specializations
                  </Text>
                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Fitness Specialization"
                    placeholderTextColor={Colors.primaryColor}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        PrimaryFitnessSpecialization: text,
                      })
                    }
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        if (value === "Yoga") {
                          setShowYoga(true);
                          setShowZumba(false);
                          setShowPilates(false);
                          setInstructorData({
                            ...instructorData,
                            PrimaryFitnessSpecialization: value,
                          });
                        } else if (value === "Zumba") {
                          setShowYoga(false);
                          setShowZumba(true);
                          setShowPilates(false);
                          setInstructorData({
                            ...instructorData,
                            PrimaryFitnessSpecialization: value,
                          });
                        } else if (value === "Pilates") {
                          setShowYoga(false);
                          setShowZumba(false);
                          setShowPilates(true);
                          setInstructorData({
                            ...instructorData,
                            PrimaryFitnessSpecialization: value,
                          });
                        } else {
                          setShowYoga(false);
                          setShowZumba(false);
                          setShowPilates(false);
                          setInstructorData({
                            ...instructorData,
                            PrimaryFitnessSpecialization: value,
                          });
                        }
                      }}
                      items={pickerPrimarySpecializationItems}
                      placeholder={{
                        label: "Primary Fitness Specialization",
                        value: "",
                      }}
                      value={instructorData.PrimaryFitnessSpecialization}
                    />
                  </View>
                  {showYoga && (
                    <View style={styles.inputStyle}>
                      <RNPickerSelect
                        style={{
                          placeholder: {
                            color: Colors.primaryColor,
                          },
                          inputIOS: {
                            color: Colors.primaryColor,
                          },
                        }}
                        onValueChange={(value) => {
                          setInstructorData({
                            ...instructorData,
                            PrimarySubFitnessSpecialization: value,
                          });
                        }}
                        items={pickerPrimaryYogaItems}
                        placeholder={{
                          label: "Select your Sub fitness specialization",
                          value: "",
                        }}
                        value={instructorData.PrimarySubFitnessSpecialization}
                      />
                    </View>
                  )}
                  {showZumba && (
                    <View style={styles.inputStyle}>
                      <RNPickerSelect
                        style={{
                          placeholder: {
                            color: Colors.primaryColor,
                          },
                          inputIOS: {
                            color: Colors.primaryColor,
                          },
                        }}
                        onValueChange={(value) => {
                          setInstructorData({
                            ...instructorData,
                            PrimarySubFitnessSpecialization: value,
                          });
                        }}
                        items={pickerPrimaryZumbaItems}
                        placeholder={{
                          label: "Select your Sub fitness specialization",
                          value: "",
                        }}
                        value={instructorData.PrimarySubFitnessSpecialization}
                      />
                    </View>
                  )}
                  {showPilates && (
                    <View style={styles.inputStyle}>
                      <RNPickerSelect
                        style={{
                          placeholder: {
                            color: Colors.primaryColor,
                          },
                          inputIOS: {
                            color: Colors.primaryColor,
                          },
                        }}
                        onValueChange={(value) => {
                          setInstructorData({
                            ...instructorData,
                            PrimarySubFitnessSpecialization: value,
                          });
                        }}
                        items={pickerPrimaryPilatesItems}
                        placeholder={{
                          label: "Select your Sub fitness specialization",
                          value: "",
                        }}
                        value={instructorData.PrimarySubFitnessSpecialization}
                      />
                    </View>
                  )}
                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Group Fitness OR Individual 
                    Fitness"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.AdditionalSpecialization}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        AdditionalSpecialization: text,
                      })
                    }
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setInstructorData({
                          ...instructorData,
                          EnvironmentHoldYourClass: value,
                        });
                      }}
                      items={pickerEnvironmentClass}
                      placeholder={{
                        label: "Environment where you hold your class",
                        value: "",
                      }}
                      value={instructorData.EnvironmentHoldYourClass}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Fitness Achievements or Awards"
                    placeholderTextColor={Colors.primaryColor}
                    value={instructorData.FitnessAchievementsAwards}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        FitnessAchievementsAwards: text,
                      })
                    }
                  />

                  {/* ------ */}
                </View>

                <View
                  style={{ width: "90%", alignItems: "center", marginTop: 5 }}
                >
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleNextStep}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 25 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#b3b3b3",
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Signin")}
                    >
                      Sign in here
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
          {/* Step 3 */}
          {step === 3 && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
              style={{
                backgroundColor: Colors.black,
                width: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  flex: 1,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "90%",
                    alignItems: "center",
                    gap: 22,
                    marginTop: 30,
                  }}
                >
                  {/* Multi step */}
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 18,
                      }}
                    >
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={1}
                      >
                        Personal Info
                      </UnderlinedText>
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={2}
                      >
                        Specialization
                      </UnderlinedText>
                      <UnderlinedText
                        active={true}
                        handleEveryStep={handleEveryStep}
                        myVal={3}
                      >
                        Experience
                      </UnderlinedText>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                    }}
                  >
                    Your Experience
                  </Text>
                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Years of Experience ( 0 - 10+ )"
                    placeholderTextColor={Colors.primaryColor}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        YearsOfExperience: text,
                      })
                    }
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setInstructorData({
                          ...instructorData,
                          YearsOfExperience: value,
                        });
                      }}
                      items={pickerYearsOfExperience}
                      placeholder={{
                        label: "Select Years of Experience",
                        value: "",
                      }}
                      value={instructorData.YearsOfExperience}
                    />
                  </View>

                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Skill Level"
                    placeholderTextColor={Colors.primaryColor}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        ISkillLevel: text,
                      })
                    }
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setInstructorData({
                          ...instructorData,
                          ISkillLevel: value,
                        });
                      }}
                      items={pickerItems}
                      placeholder={{
                        label: "Select your skill level",
                        value: "",
                      }}
                      value={instructorData.ISkillLevel}
                    />
                  </View>

                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Current Employment (if applicable)"
                    placeholderTextColor={Colors.primaryColor}
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        CurrentEmployement: text,
                      })
                    }
                  /> */}

                  {/* ------ */}
                </View>

                <View
                  style={{ width: "90%", alignItems: "center", marginTop: 5 }}
                >
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    // onPress={handlePreviousStep}
                    onPress={handleInstructorSignup}
                  >
                    <Text style={styles.buttonText}>Signup</Text>
                  </TouchableOpacity>
                  <Toast
                    ref={ToastRef}
                    message="Successfully Signup as instructor"
                  />
                  <Toast ref={ErrorToastRef} message={error} />
                  <ActivityIndicator animating={isLoading} size="large" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color={isAgreed ? "#042768" : "#83a0d6"}
                    style={{
                      borderWidth: isAgreed ? 3 : 1,
                      borderRadius: 6,
                      // transform: [{ scale: 1.1 }],
                    }}
                    value={isAgreed}
                    onValueChange={handleAgreementToggle}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      textDecorationLine: "none",
                    }}
                  >
                    By Sign up, you agree to our{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Terms")}
                    >
                      Terms and Conditions.
                    </Text>
                  </Text>
                </View>
                <View style={{ marginVertical: 25 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#b3b3b3",
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Signin")}
                    >
                      Sign in here
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </>
      )}
      {/* ------------------- */}

      {/* Students*/}
      {isStudent && (
        <>
          {/* Step 1 */}
          {step === 1 && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
              style={{
                backgroundColor: Colors.white,
                width: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  flex: 1,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "90%",
                    alignItems: "center",
                    gap: 22,
                    marginTop: 30,
                  }}
                >
                  {/* Multi step */}
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 18,
                      }}
                    >
                      <UnderlinedText
                        active={true}
                        handleEveryStep={handleEveryStep}
                        myVal={1}
                      >
                        Personal Info
                      </UnderlinedText>
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={2}
                      >
                        Interest
                      </UnderlinedText>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                    }}
                  >
                    Enter your details
                  </Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="First Name"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.FirstName}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, FirstName: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Last Name"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.LastName}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, LastName: text })
                    }
                  />
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setStudentData({ ...studentData, Gender: value });
                      }}
                      items={pickerGender}
                      placeholder={{
                        label: "Select Gender",
                        value: "",
                      }}
                      value={studentData.Gender}
                    />
                  </View>
                  <TextInput
                    style={
                      isEmailValid ? styles.invalidEmail : styles.inputStyle
                    }
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.Email}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, Email: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor={Colors.primaryColor}
                    secureTextEntry
                    value={studentData.Password}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, Password: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Phone number"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.PhoneNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, PhoneNumber: text })
                    }
                  />
                  <Pressable style={styles.dateStyle}>
                    <Text style={{ color: Colors.primaryColor }}>
                      {studentData.DateOfBirth.length > 0
                        ? studentData.DateOfBirth
                        : "Select your Date of Birth"}
                    </Text>

                    <View
                      style={{
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <RNDateTimePicker
                        style={{ marginTop: 8, height: "80%" }}
                        textColor="blue"
                        mode="date"
                        display="default"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </View>
                  </Pressable>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Address"
                    placeholderTextColor={Colors.primaryColor}
                    onPressIn={() =>
                      navigation.navigate("Address", {
                        onAddressSelect: handleStudentAddressSelect,
                      })
                    }
                    value={studentData.Address}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Zip Code"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.ZipCode}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, ZipCode: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="City"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.City}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, City: text })
                    }
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Country"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.Country}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, Country: text })
                    }
                  />

                  {/* ------ */}
                </View>

                <View
                  style={{ width: "90%", alignItems: "center", marginTop: 5 }}
                >
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleNextStep}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 25 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#b3b3b3",
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Signin")}
                    >
                      Sign in here
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
          {/* Step 2  */}
          {step === 2 && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
              style={{
                backgroundColor: Colors.black,
                width: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  flex: 1,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "90%",
                    alignItems: "center",
                    gap: 22,
                    marginTop: 30,
                  }}
                >
                  {/* Multi step */}
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 18,
                      }}
                    >
                      <UnderlinedText
                        handleEveryStep={handleEveryStep}
                        myVal={1}
                      >
                        Personal Info
                      </UnderlinedText>
                      <UnderlinedText
                        active={true}
                        handleEveryStep={handleEveryStep}
                        myVal={2}
                      >
                        Interest
                      </UnderlinedText>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                    }}
                  >
                    Interest
                  </Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="About ( Tell us a little about you )"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.AboutUs}
                    onChangeText={(text) =>
                      setStudentData({ ...studentData, AboutUs: text })
                    }
                  />
                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Fitness Goal"
                    placeholderTextColor={Colors.primaryColor}
                    value={studentData.EnvironmentTakeYourClass}
                    onChangeText={(text) =>
                      setStudentData({
                        ...studentData,
                        EnvironmentTakeYourClass: text,
                      })
                    }
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setStudentData({
                          ...studentData,
                          EnvironmentTakeYourClass: value,
                        });
                      }}
                      items={pickerEnvironmentClass}
                      placeholder={{
                        label: "Environment to take your class",
                        value: "",
                      }}
                      value={studentData.EnvironmentTakeYourClass}
                    />
                  </View>
                  {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Skill Level"
                    placeholderTextColor={Colors.primaryColor}
                  /> */}
                  <View style={styles.inputStyle}>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          color: Colors.primaryColor,
                        },
                        inputIOS: {
                          color: Colors.primaryColor,
                        },
                      }}
                      onValueChange={(value) => {
                        setStudentData({ ...studentData, SkillLevel: value });
                      }}
                      items={pickerItems}
                      placeholder={{
                        label: "Select your skill level",
                        value: "",
                      }}
                      value={studentData.SkillLevel}
                    />
                  </View>

                  {/* ------ */}
                </View>

                <View
                  style={{ width: "90%", alignItems: "center", marginTop: 5 }}
                >
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    // onPress={handleNextStep}
                    // onPress={showToast}
                    onPress={handleStudentSignup}
                  >
                    <Text style={styles.buttonText}>Signup</Text>
                  </TouchableOpacity>
                  <ActivityIndicator animating={isLoading} size="large" />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color={isAgreed ? "#042768" : "#83a0d6"}
                    style={{
                      borderWidth: isAgreed ? 3 : 1,
                      borderRadius: 6,
                      // transform: [{ scale: 1.1 }],
                    }}
                    value={isAgreed}
                    onValueChange={handleAgreementToggle}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      textDecorationLine: "none",
                    }}
                  >
                    By Sign up, you agree to our{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Terms")}
                    >
                      Terms and Conditions.
                    </Text>
                  </Text>
                </View>

                <View style={{ marginVertical: 25 }}>
                  <Toast ref={ToastRef} message="Successfully Signup" />
                  <Toast ref={ErrorToastRef} message={error} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#b3b3b3",
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{ color: Colors.primaryColor }}
                      onPress={() => navigation.navigate("Signin")}
                    >
                      Sign in here
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </>
      )}
      {/* ------------------- */}
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 18,
    backgroundColor: Colors.primaryColor,
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  inputStyle: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  invalidEmail: {
    borderWidth: 2,
    borderColor: "#ff8080",

    backgroundColor: "#ffe6e6",
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  underline: {
    marginTop: 5,
    borderColor: "#b5c6e6",
    borderWidth: 2,
    borderRadius: 20,
  },
  activeUnderline: {
    marginTop: 5,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.black,
  },
  dateStyle: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    gap: 10,
    position: "relative",
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
});

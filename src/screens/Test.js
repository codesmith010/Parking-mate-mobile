import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Test = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {/* ... Additional fields for Step 1 */}
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 2: Account Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {/* ... Additional fields for Step 2 */}
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePreviousStep} />
            <Button title="Next" onPress={handleNextStep} />
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 3: Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* ... Additional fields for Step 3 */}
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePreviousStep} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  stepContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Test;

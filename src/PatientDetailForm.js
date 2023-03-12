import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

import { Keyboard } from "react-native";

import Constants from "expo-constants";

import { NewInput } from "./NewInput";

export default PatientDetailForm = ({ navigation }) => {
  const { ...methods } = useForm({
    mode: "onChange",
    defaultValues: {
      patientID: "",
      name: "",
      age: "",
    },
  });

  const onSubmit = (location) => {
    location === "open camera"
      ? navigation.navigate("Camera")
      : navigation.navigate("Gallery");
  };

  const [formError, setError] = useState(false);

  const onError = (errors, e) => {
    return console.log({ errors });
  };

  return (
    <View style={styles.container}>
      {formError ? (
        <View>
          <Text style={{ color: "red" }}>
            There was a problem with loading the form. Please try again later.
          </Text>
        </View>
      ) : (
        <ScrollView>
          <FormProvider {...methods}>
            <NewInput
              name="patientID"
              label="Patient ID"
              placeholder="ISIC 0001"
              rules={{
                required: "Patient ID is required!",
              }}
              setFormError={setError}
            />
            <NewInput
              name="firstName"
              label="First Name"
              placeholder="John"
              rules={{
                required: "First Name is required!",
                pattern: {
                  value: /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,3}$/,
                  message: "Please Enter Valid First Name",
                },
              }}
              setFormError={setError}
            />
            <NewInput
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              rules={{
                required: "Last Name is required!",
                pattern: {
                  value: /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,3}$/,
                  message: "Please Enter Valid Last Name",
                },
              }}
              setFormError={setError}
            />
            <NewInput
              name="age"
              label="Age"
              keyboardType="number-pad"
              rules={{
                required: "Age is required!",
                min: {
                  value: 1,
                  message: "Age cannot be below 1",
                },
                max: {
                  value: 120,
                  message: "Age cannot be above 120",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please Enter Valid Age",
                },
              }}
              setFormError={setError}
            />
            <NewInput
              name="gender"
              label="Gender"
              placeholder="Select gender"
              choices={["--Select gender--", "Male", "Female", "Other"]}
              rules={{
                required: "Gender is required!",
              }}
              setFormError={setError}
              onPress={Keyboard.dismiss}
            />
            <NewInput
              name="anatomicalSite"
              label="Anatomical Site"
              placeholder="Select diagnosis location"
              choices={[
                "--Select diagnosis location--",
                "head/neck",
                "upper extremity",
                "lower extremity",
                "torso",
                "unknown",
                "palms/soles",
                "oral/genital",
                "anterior torso",
                "posterior torso",
                "lateral torso",
              ]}
              rules={{
                required: "Anatomical site is required!",
              }}
              setFormError={setError}
              onPress={Keyboard.dismiss}
            />
          </FormProvider>
          <TouchableOpacity
            style={styles.button}
            onPress={methods.handleSubmit(
              () => onSubmit("open camera"),
              onError
            )}
          >
            <Text>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={methods.handleSubmit(
              () => onSubmit("open gallery"),
              onError
            )}
          >
            <Text>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Reset Form"
            style={styles.button}
            onPress={() => {
              methods.reset({
                patientID: "",
                name: "",
                age: "",
              });
            }}
          >
            <Text>Reset Form</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#efdb68",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#68b6ef",
  },
});

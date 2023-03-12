import React, { useState, useRef } from "react";

import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
} from "react-native";

import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";

import { SelectList } from "react-native-dropdown-select-list";

const ControlledInput = (props) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <RNTextInput
          autoCapitalize="none"
          textAlign="left"
          style={styles.input}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />

        <View style={styles.errorContainer}>
          {hasError && (
            <Text style={styles.error}>{formState.errors[name].message}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const ControlledSelect = (props) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const data = [];

  const { name, label, rules, defaultValue, choices, ...inputProps } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);
  const [selected, setSelected] = useState("");
  choices.map((elem, index) =>
    data.push({ key: index, value: elem, disabled: index == 0 ? true : false })
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          boxStyles={styles.selector}
          dropdownStyles={{ backgroundColor: "white" }}
          search={false}
          onSelect={() => field.onChange(selected)}
          {...inputProps}
        />

        <View style={styles.errorContainer}>
          {hasError && (
            <Text style={styles.error}>{formState.errors[name].message}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const NewInput = (props) => {
  const {
    // name,
    // rules,
    // label,
    // defaultValue,
    // setFormError,
    choices,
    ...inputProps
  } = props;

  // const formContext = useFormContext();

  // Placeholder until input name is initialized
  // if (!formContext || !name) {
  //   const msg = !formContext
  //     ? "TextInput must be wrapped by the FormProvider"
  //     : "Name must be defined";
  //   console.error(msg);
  //   setFormError(true);
  //   return null;
  // }

  return choices ? (
    <ControlledSelect {...props} />
  ) : (
    <ControlledInput {...props} />
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 5,
    marginLeft: 0,
  },
  container: {
    flex: -1,
    justifyContent: "center",
    padding: 4,
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  selector: {
    backgroundColor: "white",
    borderColor: "none",
    height: 45,
    padding: 10,
    borderRadius: 4,
  },
  errorContainer: {
    flex: -1,
    height: 25,
    margin: 10,
  },
  error: {
    color: "red",
  },
});

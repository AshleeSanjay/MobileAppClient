import React, { useState } from "react";
import { Dropdown as DropdownInput } from "react-native-element-dropdown";
import { StyleSheet, Platform } from "react-native";

const MobileDropDown = (props) => {
  const { value, onChange } = props;
  const [userType, setUserType] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <DropdownInput
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? "Select item" : "..."}
      searchPlaceholder="Search..."
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      value={value}
      onChange={onChange}
    />
  );
};

const WebDropDown = (props) => {
  const { value, onChange } = props;
  const options = [
    { value: "", text: "Search" },
    { value: "teacher", text: "Teacher" },
    { value: "student", text: "Student" },
  ];

  return (
    <div>
      <select
        style={{
          width: "100%",
          height: 40,
          borderColor: "rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgb(204, 204, 204)",
          borderBottomWidth: 1,
          paddingHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

const Dropdown = Platform.OS === "web" ? WebDropDown : MobileDropDown;

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

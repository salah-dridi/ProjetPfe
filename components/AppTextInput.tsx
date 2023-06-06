import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
interface Props extends TextInputProps {
  error?: string;
}

const AppTextInput: React.FC<Props> = ({ error, ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        style={[
          styles.input,
          focused && {
            borderWidth: 3,
            borderColor: Colors.primary,
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: Colors.primary,
            shadowOpacity: 0.2,
            shadowRadius: Spacing,
          },
        ]}
        {...otherProps}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing,
  },
  input: {
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
  },
  error: {
    color: 'red',
    fontSize: FontSize.small,
    marginTop: Spacing / 2,
  },
});

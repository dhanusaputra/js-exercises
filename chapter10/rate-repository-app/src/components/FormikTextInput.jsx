import React from 'react';
import { StyleSheet  } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    margin: 5,
    color: '#d73a4a',
  },
  input: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 3,
  },
  borderColorRed: {
    borderColor: '#d73a4a',
  },
});

const FormikTextInput = ({ name, ...props  }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyle = [
    styles.input,
    showError && styles.borderColorRed,
  ];
  return (
    <>
      <TextInput
        style={inputStyle}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;

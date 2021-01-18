import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  }
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });


  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <View style={styles.container}>
        <FormikTextInput name='username' placeholder='Username' />
        <FormikTextInput name='password' placeholder='Password' secureTextEntry />
        <TouchableOpacity onPress={onSubmit}>
          <Text fontWeight='bold' style={styles.button}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </Formik>
  );
};

export default SignIn;

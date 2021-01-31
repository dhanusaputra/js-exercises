import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const SignInForm = ({ onSubmit }) => {
	const styles = StyleSheet.create({
		container: {
			backgroundColor: 'white',
			padding: 5,
		},
	});

  return (
    <View style={styles.container}>
			<FormikTextInput name='username' placeholder='Username' testID='usernameField'/>
			<FormikTextInput secureTextEntry name='password' placeholder='Password' testID='passwordField'/>
      <TouchableOpacity onPress={onSubmit} testID='submitButton' >
          <Text type='button' fontWeight='bold'>
            Sign in
          </Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from  '../hooks/useSignUp';
import useSignIn from  '../hooks/useSignIn';

const SignUpForm = ({ onSubmit }) => {
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
			<FormikTextInput secureTextEntry name='passwordConfirmation' placeholder='Password Confirmation' testID='passwordConfirmationField'/>
      <TouchableOpacity onPress={onSubmit} testID='signUpButton' >
          <Text type='button' fontWeight='bold'>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('Password confirmation is required')
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

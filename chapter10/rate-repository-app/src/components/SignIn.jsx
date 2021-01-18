import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const SignInForm = ({ onSubmit }) => {
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

  return (
    <View style={styles.container}>
			<FormikTextInput name='username' placeholder='Username'/>
			<FormikTextInput secureTextEntry name='password' placeholder='Password'/>
      <TouchableOpacity onPress={onSubmit} >
          <Text style={styles.button} fontWeight='bold'>
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

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
			console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};
export default SignIn;

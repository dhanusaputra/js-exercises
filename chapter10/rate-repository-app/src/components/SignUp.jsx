import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useCreateReview from  '../hooks/useCreateReview';

const SignUpForm = ({ onSubmit }) => {
	const styles = StyleSheet.create({
		container: {
			backgroundColor: 'white',
			padding: 5,
		},
	});

  return (
    <View style={styles.container}>
			<FormikTextInput name='ownerName' placeholder='Repository owner name' testID='repositoryOwnerNameField'/>
			<FormikTextInput name='repositoryName' placeholder='Repository name' testID='repositoryNameField'/>
			<FormikTextInput name='rating' placeholder='Rating between 0 and 100' testID='ratingField'/>
			<FormikTextInput name='text' placeholder='Review' multiline numberOfLines={3} testID='reviewField'/>
      <TouchableOpacity onPress={onSubmit} testID='createButton' >
          <Text type='button' fontWeight='bold'>Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().required('Rating is required').min(0).max(100),
    text: yup.string(),
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
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const response = await createReview({ repositoryName, ownerName, rating, text });
      history.push(`/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

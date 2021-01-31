import React from 'react';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} showButton/>
  )
}

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository({ id });

  if (!repository) return null;

  return (
    <RepositoryInfo repository={repository}/>
  )
}

export default SingleRepository;

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { getQuestionsRequest } from '../../../store/modules/questions/actions';
import { QuestionItem } from '../../../store/modules/questions/types';

const Questions: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { questions, isLoading } = useSelector(
    ({ questions }: RootState) => questions
  );
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>(
    []
  );

  useEffect(() => {
    dispatch(getQuestionsRequest());
  }, [dispatch]);

  console.log(filteredQuestions);
  console.log(isLoading);

  useEffect(() => {
    const currentDimensionsQuestions = questions.filter(
      ({ dimension }) => dimension._id === id
    );
    setFilteredQuestions(currentDimensionsQuestions);
  }, [id, questions]);
  return <div />;
};

export default Questions;

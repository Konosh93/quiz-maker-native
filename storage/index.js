import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { convertToReduxFormat, convertToServerFormat } from '../utils';

const quizStorageKey = 'active-quiz';

const storeCurrentQuiz = store => {
  const quiz = store.getState().get('quiz');
  const { currentQuizId, quizes } = quiz || {};
  const currentQuiz = quizes ? quizes[currentQuizId] : null;
  if (!currentQuiz || !currentQuizId || !currentQuiz.title || !currentQuiz.problems) {
    return;
  }
  const _quiz = { ...currentQuiz, _id: currentQuizId}
  const _serverFormatQuiz = convertToServerFormat(_quiz);
  let data = JSON.stringify(_serverFormatQuiz);
  if (window.btoa) {
    data = btoa(data);
  }
  localStorage.setItem(quizStorageKey, data);
}

export const subscribeQuiz = store => {
  store.subscribe(()=> storeCurrentQuiz(store));
}

export const getQuizDraft = () => {
  if (!localStorage.getItem(quizStorageKey)) return;
  const quiz = JSON.parse(atob(localStorage.getItem(quizStorageKey)));
  if (!quiz) return;

  const _reduxFormatQuiz = convertToReduxFormat(quiz);
  return { currentQuizId: quiz._id, currentQuiz: _reduxFormatQuiz };
}

export const removeOneDraft = () => {
  return localStorage.removeItem(quizStorageKey);
}
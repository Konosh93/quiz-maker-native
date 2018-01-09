import * as types from '../../constants';
import { EditorState } from 'draft-js';

const initState = {
  isFetching: false,
  quizList: [],
  quiz:{},
  score: null,
 };

const quizReducer = (state = initState, action) => {
  switch (action.type) {
  	case types.REQUEST_QUIZES:
  	  return { ...state, isFetching: true };
    case types.ADD_QUIZ:
      const _quiz = quiz(undefined, action)
      return { ...state, quiz: { ..._quiz, ...action.payload.quiz}, score:null }
    case types.ADD_QUIZ_LIST:
      return { ...state, quizList: action.payload.quizList }
    case types.ADD_SCORE:
      return { ...state, score: action.payload.score}
    case types.SET_TITLE:
    case types.INVALIDATE:
    case types.PERMIT_EDIT:
    case types.ADD_PROBLEM:
    case types.REMOVE_PROBLEM:
    case types.SET_CURRENT_PROBLEM:
    case types.SET_QUESTION:
    case types.ADD_CHOICE:
    case types.SET_CHOICE:
    case types.REMOVE_CHOICE:
    case types.SET_CORRECT:
      return { ...state, quiz: quiz(state.quiz, action)}
    default:
      return state;
  }
};

const initquizState = {
  title: null,
  slug: null,
  isInvalidated: false,
  isMyQuiz: false,
  problems:{},
  currentProblemId: 0,  
  isFetching: false,
 };

const quiz = (state=initquizState, action) => {
  switch (action.type) {
  	case types.PERMIT_EDIT:
  	  return { ...state, isMyQuiz: true}
    case types.SET_TITLE:
      return { ...state, title: action.payload.title};
    case types.INVALIDATE:
      return { ...state, isInvalidated: true}
    case types.ADD_PROBLEM:
      const _k = Object.keys(state.problems).length
      return { ...state, problems: { ...state.problems, [ _k ]: problem(undefined, action)}}    
    case types.REMOVE_PROBLEM:
      const _problems = { ...state.problems }
      delete _problems[action.payload.problemId]
      return { ...state, problems: _problems }
    case types.SET_CURRENT_PROBLEM:
      return { ...state, currentProblemId: action.payload.problemId}
    case types.SET_QUESTION:
    case types.ADD_CHOICE:
    case types.SET_CHOICE:
    case types.REMOVE_CHOICE:
    case types.SET_CORRECT:
      const _key = state.currentProblemId;
      return { ...state, problems: { ...state.problems, [_key]: problem(state.problems[_key], action)}};
    default:
      return state;  
  }
}


const initProblemState = {
  question: EditorState.createEmpty(),
  choices: {},
  correct: null,
};

const problem = (state=initProblemState, action) => {
  switch(action.type) {
    case types.ADD_PROBLEM:
      return state;
    case types.SET_QUESTION:
      return { ...state, question: action.payload.editorState};
    case types.ADD_CHOICE:
      const _k = Object.keys(state.choices).length 
      return { ...state, choices: { ...state.choices, [_k]: {choice: EditorState.createEmpty()}}}
    case types.SET_CHOICE:
      return { ...state, 
        choices: { 
          ...state.choices,
          [action.payload.choiceId]: {choice: action.payload.editorState} }}
    case types.REMOVE_CHOICE:
    const _choices = { ...state.choices }
    delete _choices[action.payload.choiceId];
    return { ...state, choices: _choices};
    case types.SET_CORRECT:
      return { ...state, correct: action.payload.correctChoiceId}
    default:
      return state;  
  }
}



export default quizReducer;

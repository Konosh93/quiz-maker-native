import agent from '../agent';
import * as types from '../constants';
import * as utils from '../utils';

export const setSize = (width, height) => ({
  type: types.RESIZE,
  payload: {
    width,
    height,
  },
})


export const beginAuth = ()  => ({
  type: types.BEGIN_AUTH,
});

export const login = (email, password) => dispatch => {
  dispatch(beginAuth());
  agent.accounts.login(email, password)
    .then(res => dispatch(setAuthStatus(res.body.user, null)))
    .catch(err => {
      if (err.response) {
        dispatch(setAuthStatus(null, err.response.body.errors))
      }else{
        console.log(err);
      }
    });
};

export const recallUser = () => dispatch => {
  dispatch(beginAuth());
  const token = utils.tokenAuth.get('token');
  agent.setToken(token);
  agent.accounts.recall()
    .then(res => dispatch(setAuthStatus(res.body.user, null)))
    .catch(err => {
      if (err.response) {
        dispatch(setAuthStatus(null, err.response.body.errors))
      }else{
        console.log(err);
      }
    });
}

export const signup = (name, email, password) => dispatch => {
  dispatch(beginAuth());
  agent.accounts.signup(name, email, password)
    .then(res => dispatch(setAuthStatus(res.body.user, null)))
    .catch(err => {
      if (err.response) {
        dispatch(setAuthStatus(null, err.response.body.errors))
      }else{
        console.log(err);
      }
    });
};

export const logout = () => {
  utils.tokenAuth.remove('token', {path: '/'});
  return{
    type: types.LOGOUT,
  }
}

const setAuthStatus = (user, errors) => {
  if (user && user.token) {
    utils.tokenAuth.set('token', user.token, { path: '/', maxAge: 86400 })
    return {
      type: types.AUTHENTICATE,
      payload: { user },   
    }
  }
  return {
    type: types.AUTHENTICATE,
    payload: { errors },  
  }
};

export const requestQuizes = () => ({
  type: types.REQUEST_QUIZES,
});

export const addQuiz = quiz => {
  return {
    type: types.ADD_QUIZ,
    payload:{
      quiz,
    }
  }
}

export const addQuizList = quizList => {
  return {
    type: types.ADD_QUIZ_LIST,
    payload:{
      quizList,
    }
  }
}

export const clearQuizes = () => ({
  type: types.CLEAR_QUIZES,
});


export const permitEdit = () => ({
  type: types.PERMIT_EDIT,
});

export const setTitle =  title => ({
  type: types.SET_TITLE,
  payload: {
    title,
  }
});

export const addScore = score => {
  return {
    type: types.ADD_SCORE,
    payload: {
      score,
    }
  }
}

export const invalidate = () => ({
  type: types.INVALIDATE,
});

export const addProblem = () => ({
  type: types.ADD_PROBLEM,
});

export const removeProblem = () => ({
  type: types.REMOVE_PROBLEM,
});

export const setCurrentProblem = ( problemId) => ({
  type: types.SET_CURRENT_PROBLEM,
  payload: {
    problemId,
  }
});


export const addChoice = () => ({
  type: types.ADD_CHOICE,
});

export const removeChoice = (choiceId) => ({
  type: types.REMOVE_CHOICE,
  payload: {
    choiceId,
  }
});


export const setCorrect = (correctChoiceId) => ({
  type: types.SET_CORRECT,
  payload: {
    correctChoiceId,
  }
});


export const setQuestion = (editorState) => ({
  type: types.SET_QUESTION,
  payload: {
    editorState,
  }
});

export const setChoice = (choiceId, editorState) => ({
  type: types.SET_CHOICE,
  payload: {
    choiceId,
    editorState,
  }
});
/* actual */
export const fetchQuizes = () => dispatch => {
  dispatch(requestQuizes());
  return agent.quizes.fetchQuizes()
    .then(res => {
      dispatch(addQuizList(res.body.quizes));
    })
    .catch( err => console.log(err))
}

export const fetchOneQuiz = slug => dispatch => {
  dispatch(requestQuizes());
  return agent.quizes.fetchOneQuiz(slug)
    .then(res => {
      const quiz = utils.convertToReduxFormat(res.body.quiz);
      dispatch(addQuiz(quiz));
    })
    .catch( err => console.log(err))
}

export const fetchMyQuizes = () => dispatch => {
  dispatch(requestQuizes());
  dispatch(addQuizList([]))
  const token = utils.tokenAuth.get('token');
  agent.setToken(token);
  return agent.quizes.fetchMyQuizes()
    .then( res => dispatch(addQuizList(res.body.quizes)))
    .catch( err => console.log(err))
}
/*
//testing
export const fetchQuizes = () => dispatch => {
  dispatch(requestQuizes());
  return fetch('www.omeryourock.com').then( res => res.json()).then(json => dispatch(receiveQuizes(json.quizlist)));
}
*/


export const submitQuiz = quiz => dispatch => {
  const token = utils.tokenAuth.get('token');
  const _quiz = utils.convertToServerFormat(quiz);
  agent.setToken(token);
  return agent.quizes.submitQuiz(_quiz)
    .then( res => {
      storage.removeOneDraft();
    })
    .catch( err => console.log(err));
}

export const submitAnswers = quiz => dispatch => {
  const token = utils.tokenAuth.get('token');
  const answers = utils.extractAnswers(quiz);
  agent.setToken(token);
  return agent.quizes.submitAnswers(answers)
    .then(res => dispatch(addScore(res.body.score)))
    .catch(err => console.log(err));
}

/*
export const laterChange = {
  setTokenCookie,
  submitQuiz,
  getQuiz,
  getQuizList,
  login,
  signup,
  beginAuth,
};


export const action = param => ({
  type: types.TYPE,
  payload: {
    param,
  }
});
*/
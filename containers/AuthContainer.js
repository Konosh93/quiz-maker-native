import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from '../components/Auth';
import * as actions from '../actions';


const mapStateToProps = state => ({
  user: state.get('auth').user,
  errors: state.get('auth').errors || {},
  isFetching: state.get('auth').isFetching || false,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(actions.login(email, password)),
  logout: () =>  dispatch(actions.logout()),
  signup: (name, email, password) => dispatch(actions.signup(name, email, password)),
  beginAuth: () => dispatch(actions.beginAuth()),
});

const AuthContainer = props => <Auth { ...props } />

AuthContainer.propTypes = {
  user: propTypes.object,
  login: propTypes.func.isRequired,
  signup: propTypes.func.isRequired,
  beginAuth: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

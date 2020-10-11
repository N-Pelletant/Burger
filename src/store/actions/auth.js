import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const url = (
      "https://identitytoolkit.googleapis.com/v1/accounts:" +
      (isSignup ? "signUp" : "signInWithPassword") +
      "?key=AIzaSyC9g9F1x9JE5Lqn5qxWCT3GRW4EzAEiGoE"
    )

    axios
      .post(url, authData)
      .then(resp => {
        localStorage.setItem('token', resp.data.idToken)
        localStorage.setItem('userId', resp.data.localId)
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + resp.data.expiresIn * 1000))
        dispatch(authSuccess(resp.data.idToken, resp.data.localId))
        dispatch(checkAuthTimeout(resp.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  };
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  }
}

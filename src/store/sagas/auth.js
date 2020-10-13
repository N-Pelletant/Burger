import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from './../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('userId');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authSaga(action) {
  yield put(actions.authStart());

  const url = (
    "https://identitytoolkit.googleapis.com/v1/accounts:" +
    (action.isSignup ? "signUp" : "signInWithPassword") +
    "?key=AIzaSyC9g9F1x9JE5Lqn5qxWCT3GRW4EzAEiGoE"
  );

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }

  try {
    const resp = yield axios.post(url, authData);

    localStorage.setItem('token', resp.data.idToken);
    localStorage.setItem('userId', resp.data.localId);
    localStorage.setItem('expirationDate', new Date(new Date().getTime() + resp.data.expiresIn * 1000));

    yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
    yield put(actions.checkAuthTimeout(resp.data.expiresIn));
  } catch (e) {
    put(actions.authFail(e.response.data.error))
  }
};

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');

  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}
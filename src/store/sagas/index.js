import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { deleteOrderSaga, fetchOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.DELETE_ORDER, deleteOrderSaga);
}
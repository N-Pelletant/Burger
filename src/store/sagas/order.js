import { put } from 'redux-saga/effects';

import AxiosInstance from './../../axios-orders';
import * as actions from './../actions';

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart())

  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const resp = yield AxiosInstance.get('/orders.json' + queryParams)
    const fetchedOrders = Object.entries(resp.data).map(([key, value]) => (
      {
        ...value,
        id: key
      }
    ));

    yield put(actions.fetchOrdersSuccess(fetchedOrders))
  } catch (e) {
    yield put(actions.fetchOrdersFail(e))
  }
}

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const resp = yield AxiosInstance.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(resp.data.name, action.orderData));
  } catch (e) {
    yield put(actions.purchaseBurgerFail(e));
  }
}

export function* deleteOrderSaga(action) {
  yield AxiosInstance.delete(`/orders/${action.orderId}.json?auth=${action.token}`);
  yield put(actions.fetchOrders(action.token, action.userId));
}
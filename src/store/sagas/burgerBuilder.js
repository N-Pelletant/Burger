import { put } from 'redux-saga/effects'

import AxiosInstance from './../../axios-orders';
import * as actions from './../actions';

export function* initIngredientsSaga(action) {
  try {
    const resp = yield AxiosInstance.get('/ingredients.json');
    yield put(actions.setIngredients(resp.data));
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
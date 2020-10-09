import * as actionTypes from './../actions/actionTypes';
import updateObject from './../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  const updatedStatePurchaseSuccess = {
    loading: false,
    orders: state.orders.concat([newOrder]),
    purchased: true,
  };
  return updateObject(state, updatedStatePurchaseSuccess);
}

const fetchOrderSuccess = (state, action) => {
  const updatedStateFetchSuccess = {
    loading: false,
    orders: action.orders,
  };
  return updateObject(state, updatedStateFetchSuccess);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
    default: return state;
  }
}

export default reducer;
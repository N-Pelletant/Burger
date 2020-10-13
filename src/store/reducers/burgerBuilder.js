import * as actionTypes from "../actions/actionTypes";
import { updateObject } from './../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
  building: false
}

const addIngredient = (state, action) => {
  const updatedIngredientAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const updatedIngredientsAdd = updateObject(state.ingredients, updatedIngredientAdd);
  const updatedStateAdd = {
    ingredients: updatedIngredientsAdd,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  }
  return updateObject(state, updatedStateAdd);
}

const removeIngredient = (state, action) => {
  const updatedIngredientSub = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredientsSub = updateObject(state.ingredients, updatedIngredientSub);
  const updatedStateSub = {
    ingredients: updatedIngredientsSub,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedStateSub)
}

const setIngredient = (state, action) => {
  const updatedStateSet = {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  }
  return updateObject(state, updatedStateSet)
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true })
    default: return state;
  }
}

export default reducer;
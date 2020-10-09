import * as actionTypes from './actionTypes';
import AxiosInstance from './../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  }
}

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

const failedIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const ingredients = await AxiosInstance.get('/ingredients.json');
      dispatch(setIngredients(ingredients.data));
    } catch {
      dispatch(failedIngredientsFailed())
    }
  };
}
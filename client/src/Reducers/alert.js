import { CREATE_ALERT, DELETE_ALERT } from '../Actions/types';

const initalState = [];

export default (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ALERT:
      return [...state, payload];
    case DELETE_ALERT:
      const newState = state.filter(alert => alert.id !== payload);
      return newState;
    default:
      return state;
  }
};

import { recevieApiData } from '../actions';

const cryptoDataReducer = (state = '', action) => {
  switch (action.type) {
    case recevieApiData.type:
      return action.data;
    default:
      return state;
  }
};

export default cryptoDataReducer;
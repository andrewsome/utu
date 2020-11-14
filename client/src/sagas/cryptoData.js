import { call, put, takeLatest } from 'redux-saga/effects';
import { recevieApiData, submitForm } from '../actions';
import { cryptoData } from '../utils/api';
import { currencyInformation } from '../utils/helper';

export function* watchCryptoDataSagas() {
  yield takeLatest(submitForm.type, submitDateForm);
}

function* submitDateForm(action) {
  const selectedDate = action.form;
  try {
    const data = yield call(cryptoData);
    yield put(recevieApiData.create(
      currencyInformation(data, selectedDate)
    ));
  } catch (err) {
    console.log(err);
  }
}
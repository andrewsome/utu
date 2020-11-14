import { all, call } from 'redux-saga/effects';
import { watchCryptoDataSagas } from './cryptoData';

export default function* rootSaga() {
  yield all([
    call(watchCryptoDataSagas),
  ]);
}
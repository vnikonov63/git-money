import { all } from 'redux-saga/effects';
import addCategorySaga from './addCategorySaga.js';
import addMoneySaga from './addMoneySaga.js';
import getUserInfoSaga from './getUserInfoSaga';
import deleteCategorySaga from './deleteCategorySaga';

export default function* () {
  yield all([
    addCategorySaga(),
    addMoneySaga(),
    getUserInfoSaga(),
    deleteCategorySaga(),
  ]);
}

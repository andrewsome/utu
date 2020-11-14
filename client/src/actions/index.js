import { makeActionCreator as mac } from '../utils/helper';

export const requestApiData = mac('REQUEST_API_DATA');
export const recevieApiData = mac('RECEVIE_API_DATA', 'data');

export const submitForm = mac('SUBMIT_FORM', 'form');
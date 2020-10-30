import app from 'firebase/app';
import {database} from 'firebase/database';
import key from './key'

 
const config = {
  apiKey: key,
  authDomain: 'quizzlse.firebaseapp.com/',
  databaseURL: 'https://quizzlse.firebaseio.com',
};

app.initializeApp(config);

export const db = app.database();

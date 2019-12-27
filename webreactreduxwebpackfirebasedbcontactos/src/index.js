import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware}  from 'redux';
import rootReducer from './rootReducer';
import {Provider} from 'react-redux';
import firebaseConfig from "./config/firebaseConfig";
import { ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import * as firebase from "firebase/app";
import thunk from 'redux-thunk';

const middlewares = [
  thunk.withExtraArgument(getFirebase)
]

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  //Inicializa la instancía de Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, 
  initialState,
  compose(
    applyMiddleware(...middlewares)
  ));

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

ReactDOM.render(
<Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps} >
        <App />
    </ReactReduxFirebaseProvider>
</Provider>
, document.getElementById('root')
);

serviceWorker.unregister();

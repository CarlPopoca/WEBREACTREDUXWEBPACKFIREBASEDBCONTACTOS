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
    useFirestoreForProfile: true 
  }

  //Inicializa la instancía de Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

//Se inicializa el estado
const initialState = {};
//Se crea el store añadiendose el contenedor de reducers
const store = createStore(rootReducer, 
  initialState,
  compose(
    applyMiddleware(...middlewares)
  ));

//Configuración de firestore con redux, perfil de autenticación y store
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

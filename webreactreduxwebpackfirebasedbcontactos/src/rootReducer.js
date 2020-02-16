import {combineReducers} from 'redux';
import contactos from './reducers/contactos';
import usuarios from './reducers/usuarios';
import sexo from './reducers/sexo';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    contactos,
    usuarios,
    sexo, 
    firestore: firestoreReducer,
    firebase: firebaseReducer  
});

export default rootReducer;
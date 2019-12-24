import  {combineReducers} from 'redux';
import   contactos from './reducers/contactos';
import   usuarios from './reducers/usuarios';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    contactos,
    usuarios,
    firestore: firestoreReducer,
    firebase: firebaseReducer  
});

export default rootReducer;
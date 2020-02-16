import * as firebase from "firebase";
import {MESSAGE_ERROR_SAVE, MESSAGE_ERROR_UPDATE, MESSAGE_ERROR_DELETE, MESSAGE_ERROR_GET_INFO} from "../utils/constantes";
export const SET_CONTACTOS = 'SET_CONTACTOS';
export const ADD_CONTACTOS = 'ADD_CONTACTOS';
export const UPDATE_CONTACTOS = 'UPDATE_CONTACTOS';
export const DELETE_CONTACTOS = 'DELETE_CONTACTOS';
export const ERROR_CONTACTOS = 'ERROR_CONTACTOS';

const setContactos = contactos =>{
    return {
        type: SET_CONTACTOS,
        contactos
    }
}
const addContactos = contacto =>{
    return {
        type: ADD_CONTACTOS,
        contacto
    }
}

const updContactos = contacto => {
    return {
        type: UPDATE_CONTACTOS,
        contacto
    }
}

const delContactos = id => {
    return {
        type: DELETE_CONTACTOS,
        id
    }
}

const errorContactos = error =>{
    return {
        type: ERROR_CONTACTOS,
        error
    }
}

export const getContactos = () =>
{
    var db = firebase.firestore();
    return dispatch =>{
        db
        .collection("contactos")
        .get()
        .then(snapshot => {
            console.log(snapshot);
          dispatch(setContactos(snapshot));
        })
        .catch(error => {
          dispatch(errorContactos(MESSAGE_ERROR_GET_INFO + error));
        });
    }
} 

export const saveContactos = data => {
    var db = firebase.firestore();
    return dispatch =>{
        db
        .collection("contactos")
        .add({
          nombre: data.nombre,
          celular: data.celular,
          sexo: data.sexo
        })
        .then(response => {
            var dato = {
                id : response.id,
                nombre: data.nombre,
                celular: data.celular,
                sexo: data.sexo
            }
          dispatch(addContactos(dato));
        })
        .catch(error => {
          dispatch(errorContactos(MESSAGE_ERROR_SAVE + error));
        });
    }
}

export const updateContactos = data => {
    var db = firebase.firestore();
    return dispatch =>{ 
        db
        .collection("contactos")
        .doc(data.id)
        .update(data)
        .then(() => {
            dispatch(updContactos(data));
        })
        .catch(error => {
            dispatch(errorContactos(MESSAGE_ERROR_UPDATE + error));
        });
    }
}

export const deleteContactos = id =>{
    var db = firebase.firestore();
    return dispatch =>{ 
        db
        .collection("contactos")
        .doc(id)
        .delete()
        .then(()=>{
            dispatch(delContactos(id))
        })
        .catch(error => {
            dispatch(errorContactos(MESSAGE_ERROR_DELETE + error));
        });
    }
}

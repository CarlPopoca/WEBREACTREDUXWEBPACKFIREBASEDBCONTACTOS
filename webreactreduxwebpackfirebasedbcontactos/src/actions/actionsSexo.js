import * as firebase from "firebase";
export const SET_SEXO = 'SET_SEXO';
export const ERROR_SEXO = 'ERROR_SEXO';
import {MESSAGE_ERROR_GET_INFO} from "../utils/constantes";

const setSexo = sexo =>{
    return {
        type: SET_SEXO,
        sexo
    }
}

const errorSexo = error =>{
  return {
      type: ERROR_SEXO,
      error
  }
}

export const getSexo = () =>
{ 
    var db = firebase.firestore();
    return dispatch =>{
        db
        .collection("sexo")
        .get()
        .then(snapshot => {
          dispatch(setSexo(snapshot));
        })
        .catch(error => {
          dispatch(errorSexo(MESSAGE_ERROR_GET_INFO + error));
        });
    }
} 
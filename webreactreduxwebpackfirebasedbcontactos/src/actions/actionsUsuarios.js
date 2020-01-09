import * as firebase from "firebase/app";
import {MESSAGE_ERROR_SAVE, MESSAGE_ERROR_LOGIN, MESSAGE_ERROR_LOGOUT} from "../utils/constantes";
export const LOGIN_USUARIO = 'LOGIN_USUARIO';
export const LOGOUT_USUARIO = 'LOGOUT_USUARIO';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const ERROR_CERRARSESION = 'ERROR_CERRARSESION';
export const ADD_USUARIOS = 'ADD_USUARIOS';
export const ERROR_USUARIOS = 'ERROR_USUARIOS';

const loginUsuario = usuario=> {
  return {
      type: LOGIN_USUARIO,
      usuario
  }
} 

const logoutUsuario = usuario =>  
{
  return {
      type: LOGOUT_USUARIO,
      usuario
  }
}

const errorLogin = error =>
{
  return {
      type: ERROR_LOGIN,
      error
  }
}

const errorCerrarSesion = error =>
{
  return {
      type: ERROR_CERRARSESION,
      error
  }
}

const addUsuarios = usuarios =>{
  return {
      type: ADD_USUARIOS,
      usuarios
  }
}

const errorUsuarios = error =>
{
  return {
      type: ERROR_USUARIOS,
      error
  }
}


export const iniciarSesion = credentials => {
  return dispatch =>{
   firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => {
      dispatch(loginUsuario(data));
    })
    .catch(error => {
      dispatch(errorLogin(MESSAGE_ERROR_LOGIN));
    });
  }
};

export const cerrarSesion = () => {
  return dispatch =>{
    firebase
    .auth()
    .signOut()
    .then(data => {
      dispatch(logoutUsuario(data))
      }
    )
    .catch(error => {
      dispatch(errorCerrarSesion(MESSAGE_ERROR_LOGOUT));
    });
  }
};

//Cada función que se ejcuta de javascript por medio del then puede tener dos eventos, el satistactorio y el de fallo,
// y asu vez dentro cada then puede devolver un resultado al cual se le puede anidar otro then para especificar que hacer
// en caso de exito o fallo, y asi cada vez como se requiera
export const saveUsuarios = usuarioNuevo => {
  return dispatch =>{
    firebase
    .auth()
    .createUserWithEmailAndPassword(usuarioNuevo.email, usuarioNuevo.password)
    .then(response => {
      var db = firebase.firestore();
      db
      .collection("users")
      .doc(response.user.uid)
      .set({
          firstName: usuarioNuevo.firstName,
          lastName: usuarioNuevo.lastName,
        })
      .then(() => {
        var usuario = {
            id : response.user.uid,
            firstName: usuarioNuevo.firstName,
            lastName: usuarioNuevo.lastName
        }
        dispatch(addUsuarios(usuario));
      })
      .catch(error => {
          dispatch(errorUsuarios(MESSAGE_ERROR_SAVE))
        });
    })
    .catch(error => {
        dispatch(errorUsuarios(MESSAGE_ERROR_SAVE))
    });
  }
};
  
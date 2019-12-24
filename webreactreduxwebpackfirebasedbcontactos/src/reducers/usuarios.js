
import {LOGIN_USUARIO, LOGOUT_USUARIO, ERROR_LOGIN, ERROR_CERRARSESION, ADD_USUARIOS, ERROR_USUARIOS} from "../actions/actionsUsuarios";

const initState = {
    error: null
  };

const usuarios = (state = initState, action)=>{
    switch(action.type){
        case LOGIN_USUARIO:
            return {
                ...state,
                error: null 
            };
        case LOGOUT_USUARIO:
            return state;
        case ERROR_LOGIN:
            return {
                ...state,
                error: action.error
            }
        case ERROR_CERRARSESION:
            return {
                ...state,
                error: action.error
            };          
        case ADD_USUARIOS:
      
            return {
                ...state,
                error: null
            };
        case ERROR_USUARIOS:
       
            return {
                ...state,
                error: action.error
            };
        default: return state;
    }
}

export default usuarios;
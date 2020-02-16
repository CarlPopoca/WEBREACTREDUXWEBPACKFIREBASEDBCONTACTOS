import { SET_SEXO, ERROR_SEXO } from "../actions/actionsSexo";

const initState = {
    sexo: [],
    error: null
  };

 const sexo = (state = initState, action = {})=>{
    const array = [];  
    switch(action.type){
        case SET_SEXO:
           // Se obtienen los contactos para llenar un arreglo
          const data = action.sexo;
          array.push({
            id: "SEL",
            nombre: "--Seleccione el sexo--"
          });
          data.forEach(res => {
             array.push({
               id: res.data().id,
               nombre: res.data().nombre
             });
           });
      
          return {
          ...state,
          sexo: array
          }
            
        case ERROR_SEXO:
          //Devuelve el mensaje de error en la vista
            return {
                ...state,
                error: action.error
            };      

        default: return state;
    }
}

export default sexo;
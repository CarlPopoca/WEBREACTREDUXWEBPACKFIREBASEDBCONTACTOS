import { SET_CONTACTOS, ADD_CONTACTOS, UPDATE_CONTACTOS, DELETE_CONTACTOS, ERROR_CONTACTOS } from "../actions/actionsContactos";

const initState = {
    contactos: [],
    error: null
  };

 const contactos= (state = initState, action = {})=>{
    const array = [];  
    switch(action.type){
        case SET_CONTACTOS:
           // Se obtienen los contactos para llenar un arreglo
           const contactData = action.contactos;
           contactData.forEach(cont => {
             array.push({
               id: cont.id,
               nombre: cont.data().nombre,
               celular: cont.data().celular,
               sexo: cont.data().sexo
             });
           });
          //Se ordenan ascendentemente por nombre
           array.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });

           return {
            ...state,
            contactos: array
           }
           
        case ADD_CONTACTOS:
           //Se añaden todos los contactos almacenados en el estado
              state.contactos.forEach(cont => {
                array.push({
                  id: cont.id,
                  nombre: cont.nombre,
                  celular: cont.celular,
                  sexo: cont.sexo
                });
              });
            // Se añade el nuevo contacto devuelto por el action saveContactos
              array.push({ 
                id: action.contacto.id,
                nombre: action.contacto.nombre,
                celular: action.contacto.celular,
                sexo: action.contacto.sexo});  
            //Se ordenan de forma ascendente por el nombre
              array.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                  return 1;
                }
                if (a.nombre < b.nombre) {
                  return -1;
                }
                //Si retorna cero es que son iguales y va primero el valor de a
                return 0;
              });

            return {
                ...state,
                contactos: array
            }
        case UPDATE_CONTACTOS:
          //Toma los registros del estado y luego busca el que se actualizo por el id para actualizar
          // el estado
           var listContact = state.contactos.map(item => {
                if (item.id === action.contacto.id) 
                {
                 return action.contacto;
                }
                return item;
            });
            //Se retorna la lista de contactos actualizada y sera tomada por props en el Contactos.js por medio 
            // apStateToProps
            return {
              ...state,
              contactos: listContact
            }
            
        case DELETE_CONTACTOS:
            //Filtra el estado quitando el contacto que fue eliminado
            return {
              ...state,
              contactos: state.contactos.filter(item => item.id != action.id)
            }
            
        case ERROR_CONTACTOS:
          //Devuelve el mensaje de error en la vista
            return {
                ...state,
                error: action.error
            };      

        default: return state;
    }
}

export default contactos;
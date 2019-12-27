import React, {Component} from 'react';
import {Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import { Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {getContactos, saveContactos, updateContactos, deleteContactos} from '../actions/actionsContactos';
import AlertaError from './AlertaError';
import {ACTION_SAVE, ACTION_UPDATE} from '../utils/constantes';
/*import Navegacion from './Navegacion';*/
//Una Clase que extiende del component de React se comvierte en una etiqueta html
class Contactos extends Component  {

  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      action: '',
      loading: false,
      isError:'',
      isNullNombre: '',
      isNullCelular: '',
      isNullSexo: '',
      alert_message:'',
      datosNuevoContacto: {
        nombre: '',
        celular: '',
        sexo: ''
      },
      datosEditarContacto: {
        id: '',
        nombre: '',
        celular: '',
        sexo: ''
      },
      nuevoContactoModal: false,
      editarContactoModal: false,
      loggedIn
    }
  }
  
  componentDidMount()
  {
    this.refrescarContactos();
  }

  componentWillReceiveProps(nextProps){
    
    //En este método y dentro del render ya se pueden obtener los valores props devueltos por el mapeo del reducer
    const {error} = nextProps;
    
    if (error == null)
      this.successfulActions();
    else
      this.setState({
        alert_message: error
      });
  }

  successfulActions()
  {
    switch (this.state.action) {
      case ACTION_SAVE:
        this.saveSuccessfully();
        break;
      case ACTION_UPDATE:
        this.updateSuccessfully();
        break;
      default:
        break; 
    }
  }

  saveSuccessfully()
  {
    //Se setea la variable de state contactos, los simbolo {} permiten usarla para setearla por medio de let
    //this.state contiene los contactos que se renderizaron en el Table
    let {contactos} = this.state;
    //Se agrega al final el contacto que devolvio el metodo post de la api contactos
    //contactos.push(response.data);
    //Inicializa el estado de las variables nuevoContactoModal y el objeto datosNuevoContacto
    this.setState({
      loading: false,
      contactos, 
      nuevoContactoModal:false, 
      datosNuevoContacto: {
      nombre: '',
      celular: '',
      sexo: ''
    }, 
    alert_message: '',
    isNullNombre: '', 
    isNullCelular:'', 
    isNullSexo: ''
    });
  }

 updateSuccessfully()
 {
  //Se refresca el Table
  //this.refrescarContactos();
  //Inicializa el estado de las variables nuevoContactoModal y el objeto datosNuevoContacto
  this.setState({
  loading: false,
  editarContactoModal: false, 
  datosEditarContacto: {
  id: '',
  nombre: '',
  celular: '',
  sexo: ''
  }, 
  alert_message: '', 
  isNullNombre: '', 
  isNullCelular: '', 
  isNullSexo: ''
  });
 }

  //Se declara en el objeto state las variables que mantendran el valor
  //Contactos - Los datos que llenaran el Table
  //datosNuevoContacto - Los datos para la Alta
  //datosEditarContacto - Los datos para la modificación
  //nuevoContactoModal - Para la visualización y cierre de la ventana modal de Alta
 //editarContactoModal - Para la visualización  y cierre de la ventana modal de modificación

 //Método que refrescara el Table
  refrescarContactos(){
    this.props.getContactos();
  }
  

//Método que niega el valor de la variable nuevoContactoModal inicializada en false, esto
//permite mostrar el Modal para la Alta y inicializa los datos del objeto datosNuevoContacto, y
//Se regresa el valor de la variable nuevoContactoModal a false cuando se pulsa el botón de cerrar y
//cuando se pulsa el botón de cancelar
  toggleNuevoContactoModal() {
    this.setState({
      isError:'',
      isNullNombre:'',
      isNullCelular:'',
      isNullSexo:'',
      alert_message:'',
      nuevoContactoModal: !this.state.nuevoContactoModal,
      datosNuevoContacto: {
        nombre: '',
        celular: '',
        sexo: ''
      }
    });
  }
  //Método que niega el valor de la variable editarContactoModal inicializada en false, esto
  //permite mostrar el Modal para la Modificación y
  //se regresa el valor de la variable editarContactoModal a false cuando se pulsa el botón de cerrar y
  //cuando se pulsa el botón de cancelar
toggleEditarContactoModal() {
    //Este metodo se dispara cuando se cierra la ventana modal de editar, y cuando se pulsa el botón de Cancelar
    // convierte el valor de la variable editarContactoModal a false
  this.setState({
    editarContactoModal: !this.state.editarContactoModal
  });
}
validacionInput(e){
  if (e === 'true'){
    return {borderColor: '#dc3545'}
  }
  if (e === 'false'){
    return  {borderColor: '#28a745'}
  }
  return  {borderColor: 'none'};
}

validarContacto(contacto) {
  var nombre='false', celular='false', sexo='false', alert='', valAlert=false, valContacto= true;
  if (contacto.nombre ==='')
  {
    nombre ='true';
    valAlert=true;
  }
  if (contacto.celular ==='')
  {
    celular = 'true';
    valAlert=true;
  }
  if (contacto.sexo ==='')
  {
    sexo = 'true';
    valAlert=true;
  }
  if (valAlert) {
    alert = 'Introduzca la información que se le solicita'
    valContacto = false;
  }
  this.setState({
    isError:'',
    isNullNombre: nombre,
    isNullCelular: celular,
    isNullSexo: sexo,
    alert_message: alert
  });
  return valContacto;
}


//Método que permite guardar los datos capturados en el modal de Alta
  agregarContacto (){
    let {nombre, celular, sexo} = this.state.datosNuevoContacto;
    if (this.validarContacto(this.state.datosNuevoContacto)) {
      this.setState({
        loading: true
      });
      this.props.saveContactos({nombre, celular, sexo});
      this.setState({
        action: ACTION_SAVE,
        loading: false
      });
    }
  }

//Método que permite guardar los datos capturados en el modal de Modificación
  actualizarContacto()
  {
    let {id, nombre, celular, sexo} = this.state.datosEditarContacto;
    if (this.validarContacto(this.state.datosEditarContacto)) {
      this.setState({
        loading: true
      });
      this.props.updateContactos({id, nombre, celular, sexo});
      this.setState({
        action: ACTION_UPDATE,
        loading: false
      });
    }
  }
  
//Método para eliminar un Contacto
 eliminarContacto(id){

   confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>

          <h1 className="glyphicon glyphicon-warning-sign">
            <FontAwesomeIcon className="mr-3" icon="exclamation-triangle" />
            Esta seguro de eliminar el registro?</h1>
          <div className="btn-toolbar row" role="toolbar">
            <div className="col-sm-4"></div>
          <div className="btn-group col-sm-4">
              <Button color="secondary" size="sm" className="mr-3" onClick={onClose}>
                  <FontAwesomeIcon className="mr-2" icon="times" />
                  No
               </Button>
              <Button color="primary" size="sm" className="btn btn-default "
                    onClick={() => {
                      this.props.deleteContactos(id);
                      const {error} = this.props;
                      if (!error)
                      {
                        onClose();
                      }
                    }}
              >
                  <FontAwesomeIcon className="mr-2" icon="check" />
                   Si
              </Button>
              </div>
                <div className="col-sm-4"></div>
            </div>
          </div>
        );
      }
    });
 }

  //Nota: this.state mantiene el estado de las variables, es como un get pero para setear una  variables
  // se debe ocupar
  //Método para actualizar los datos
  editarContacto (id, nombre, celular, sexo)
  {
    //Por default la variable editarContactoModal es false pero se niega este valor seteando a verdadero,
    // y de esta manera se consigue visualizar el modal de mdificación y setearle los datos a los controles
    this.validarContacto({id, nombre, celular, sexo});
    this.setState({
     datosEditarContacto: {id, nombre, celular, sexo}, editarContactoModal:! this.state.editarContactoModal
   });
  }

  validacionControles()
  {
    if (((this.state.isNullNombre ==='true'||this.state.isNullCelular ==='true'||this.state.isNullSexo ==='true') && (this.state.alert_message!='')) ||(this.state.isError=== 'true'))
      return true;
    else
      return false;
  }
  
  render(){
    const {loading} = this.state; 
    const {auth,error} = this.props;
 
    if (!auth.uid && !error)
    return <Redirect  to="/" />
    //Se setea a la variable local contactosReg el objeto contactos que se lleno al ejecutarse el método
    //componentWillMount en automatico y se retorna las filas del Table más una columna con los botones de
    //Editar y eliminar
    let contactosReg = this.props.contactos.map((contacto)=>{
      return(
        <tr key={contacto.id}>
          <td>{contacto.nombre}</td>
          <td> {contacto.celular}</td>
          <td> {contacto.sexo}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editarContacto.bind(this, contacto.id, contacto.nombre, contacto.celular, contacto.sexo)}>Editar</Button>
            <Button color="danger" size="sm" onClick={this.eliminarContacto.bind(this,contacto.id)}>Eliminar</Button>
          </td>
        </tr>
      )
    });
    // El botón Agregar cambia a true la variable nuevoContactoModal por medio del metodo toggleNuevoContactoModal

    //Modal para modificar datos se abre en automatico cuando su atributo isOpen cambia a verdadero por medio de la variable nuevoContactoModal
    //y se cierra cuando la misma variable cambia a false al presionarse los botones cerrar (x) y cancelar

    //Modal para modificar datos  se abre en automatico cuando su atributo isOpen cambia a verdadero por medio de la variable editarContactoModal
    //y se cierra cuando la misma variable cambia a false al presionarse los botones de cerrar (x) y cancelar

    //ModalHeader: Encabezado del Modal
    //ModalBody: Contenedor de controles
    //ModalFooter:  Pie del Modal, se utiliza comunmente para añadir botones

    //FormGroup: Agrupador de Controles
    //Input propiedad value : se le puede ligar una propiedad de un objeto state, y con el método onChange asignarle
    //al value lo que se captura.
    // let {datosNuevoContacto} = this.state;,  se setea el estado y se almacena lo que se captura
    // datosNuevoContacto.nombre = e.target.value;, se setea lo que se captura en el input en la propiedad que se indica
    // this.setState({datosNuevoContacto});, se confirma el seteo de la propiedad del objeto

    //<tbody>{contactosReg}</tbody>, la variable local contactosReg proporciona los filas del Table
  
    return (
      <div id="divContactos">
      
      <div className="App container">
        <h2>Aplicación de Contactos</h2>
        <Button  className="my-3" color="primary" onClick={this.toggleNuevoContactoModal.bind(this)}>Agregar</Button>
        <Modal isOpen={this.state.nuevoContactoModal}  toggle={this.toggleNuevoContactoModal.bind(this)}>
          <ModalHeader toggle={this.toggleNuevoContactoModal.bind(this)}>Agregar un Contacto</ModalHeader>
          <ModalBody>
           {this.validacionControles()?<AlertaError mensaje={this.state.alert_message} />:null}
        
            <FormGroup>
              <Label for="Nombre">Nombre</Label>
              <Input id="Nombre" style={this.validacionInput(this.state.isNullNombre)} onChange={(e)=>{
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.nombre = e.target.value;
                this.setState({datosNuevoContacto});

                }} required="true" maxlength="100" onKeyUp onBlur={(e)=>{
                  if (e.target.value == '')
                  {
                    this.setState({isNullNombre: 'true'});
                  }else {
                    this.setState({isNullNombre: 'false'});
                  }
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Celular">Celular</Label>
              <Input  id="Celular" style={this.validacionInput(this.state.isNullCelular)} value={this.state.datosNuevoContacto.celular} onChange={(e)=>{
                var regex = /[^+\d]/g;
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.celular = e.target.value.replace(regex,"");
                this.setState({datosNuevoContacto});
                }} required = "true"  onBlur={(e)=>{
                  if (e.target.value == '')
                    {
                      this.setState({isNullCelular: 'true'});
                    }else {
                      this.setState({isNullCelular: 'false'});
                    }
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Sexo">Sexo</Label>
              <Input  id="Sexo" style={this.validacionInput(this.state.isNullSexo)} value={this.state.datosNuevoContacto.sexo} onChange={(e)=>{
                let {datosNuevoContacto} = this.state;
                datosNuevoContacto.sexo = e.target.value;
                this.setState({datosNuevoContacto});
                }} required="true" maxlength="3" minlength="3" onBlur={(e)=>{
                  if (e.target.value == '')
                  {
                    this.setState({isNullSexo: 'true'});
                  }else {
                    this.setState({isNullSexo: 'false'});
                  }
                }}/>
            </FormGroup>
          </ModalBody>
         <ModalFooter>
           <Button color="primary" onClick={this.agregarContacto.bind(this)}>
            {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="database" />}
             Guardar
           </Button>
           <Button color="secondary" onClick={this.toggleNuevoContactoModal.bind(this)}>
            <FontAwesomeIcon className="mr-2" icon="times" />
             Cancelar
           </Button>
         </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editarContactoModal}  toggle={this.toggleEditarContactoModal.bind(this)}>
         <ModalHeader toggle={this.toggleEditarContactoModal.bind(this)}>Editar un Contacto</ModalHeader>
         <ModalBody>
         {this.validacionControles()?<AlertaError mensaje={this.state.alert_message} />:null}
          <FormGroup>
            <Label for="Nombre">Nombre</Label>
            <Input  id="Nombre" style={this.validacionInput(this.state.isNullNombre)} value={this.state.datosEditarContacto.nombre} onChange={(e)=>{
              let {datosEditarContacto} = this.state;
              datosEditarContacto.nombre = e.target.value;
              this.setState({datosEditarContacto});
              }} required="true" maxlength="100" onBlur={(e)=>{
                if (e.target.value == '')
                {
                  this.setState({isNullNombre: 'true'});
                }else {
                  this.setState({isNullNombre: 'false'});
                }
              }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Celular">Celular</Label>
            <Input  id="Celular" style={this.validacionInput(this.state.isNullCelular)} value={this.state.datosEditarContacto.celular} onChange={(e)=>{
               var regex = /[^+\d]/g;
              let {datosEditarContacto} = this.state;
              datosEditarContacto.celular = e.target.value.replace(regex,"");
              this.setState({datosEditarContacto});
              }} required="true" onBlur={(e)=>{
                if (e.target.value == '')
                {
                  this.setState({isNullCelular: 'true'});
                }else {
                  this.setState({isNullCelular: 'false'});
                }
              }}/>
          </FormGroup>
          <FormGroup>
            <Label for="Sexo">Sexo</Label>
            <Input id="Sexo" style={this.validacionInput(this.state.isNullSexo)}  value={this.state.datosEditarContacto.sexo} onChange={(e)=>{
              let {datosEditarContacto} = this.state;
              datosEditarContacto.sexo = e.target.value;
              this.setState({datosEditarContacto});
              }} required="true"  maxlength="3" minlength="3" onBlur={(e)=>{
                if (e.target.value == '')
                {
                  this.setState({isNullSexo: 'true'});
                }else {
                  this.setState({isNullSexo: 'false'});
                }
              }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.actualizarContacto.bind(this)}>
            {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="database" />}
            Guardar
          </Button>
          <Button color="secondary" onClick={this.toggleEditarContactoModal.bind(this)}>
            <FontAwesomeIcon className="mr-2" icon="times" />
            Cancelar
          </Button>
        </ModalFooter>
       </Modal>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Sexo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactosReg}
          </tbody>
        </Table>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state =>
{
  //Permite que el estado(contienen objetos que se devolveran) de los reducer sean mapeados al props
  // state: representa el estado de los objetos.
  // contactos: Este nombre delante de state es el nombre del reducer y que se agrego en el rootReducer para que pueda ser consumido
  //    por la vista(un archivo js).
  //contactos: Este nombre que va delante de contactos(reducer de contactos) es el objeto que contendra  (el, los) contactos que se
  //    devolveran a la vista.
  //error: Este nombre que va delante de contactos(reducer de contactos) es el objeto que contendra el error que 
  //    sera eniviado a la vista para que se pueda mostrar
  //auth: Este nombre que va delante del reducer firebase es el objeto que proporcionara el id del usuario autenticado,
  //  si tiene un valor permitira al usuario acceder
  return {
    auth: state.firebase.auth,
    contactos: state.contactos.contactos,
    error: state.contactos.error   
  }
}

export default connect(mapStateToProps, {getContactos, saveContactos, updateContactos, deleteContactos})(Contactos);
	
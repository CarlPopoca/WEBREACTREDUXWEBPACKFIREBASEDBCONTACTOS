import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import AlertaError from '../../componentes/AlertaError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {saveUsuarios, iniciarSesion} from '../../actions/actionsUsuarios';
import {connect} from 'react-redux';
import {INIT_SESION, ADD_USERS} from "../../utils/constantes";

class RegistrarUsuario extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      event:'',
      loading: false,
      alert_message:'',
      datosUsuario: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      },
      loggedIn,
      isNullEmail: '',
      isNullPassword: '',
      isNullComfirmPassword: '',
      isNullFirsName: '',
      isNullLastName: ''
    }
  }

  componentWillReceiveProps(nextProps){
    //En este método y dentro del render ya se pueden obtener los valores props devueltos por el mapeo del reducer
    const {error, auth} = nextProps;
     if (error == null)
     {
       if (auth.uid != null)
       {
          localStorage.setItem("token", "jasdajalkcecklwcljekwej");
          //Se setea que ingreso
          this.setState({
            loggedIn: true,
            alert_message: '',
            datosUsuario: {
              email: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: ''
            }
          });
       }else
       {
         if (this.state.iniciarSesion == ADD_USERS)
          this.iniciarSesion();
       }
     }else
     {
      this.setState({
        alert_message: error
      });
     }
   }

   iniciarSesion ()
  {
   return  this.props.iniciarSesion(this.state.datosUsuario);
  }

  submitForm()
  {
    let valControles = this.validacionControles();
    if (valControles){
      this.setState({
        loading: true
      });

      this.props.saveUsuarios(this.state.datosUsuario); 
      
      this.setState({
        loading: false,
        event: ADD_USERS
      });
    }
  }

  validacionControles() {
    if (this.state.datosUsuario.email=='') 
    {
      this.setState({
        alert_message: 'Introduzca el email',
        isNullEmail: 'true'
      });
      return false;
    }

  if (this.state.datosUsuario.firstName== '')
  {
    this.setState({
      alert_message: 'Introduzca el nombre',
      isNullFirstName: 'true'
    });
    return false;
  }

  if (this.state.datosUsuario.lastName== '')
  {
    this.setState({
      alert_message: 'Introduzca el apellido',
      isNullLastName: 'true'
    });
    return false;
  }

  if (this.state.datosUsuario.password.length < 10)
  {
    this.setState({
      alert_message: 'El password debe tener diez caracteres',
      isNullPassword: 'true',
    });
    return false;
  }

  if (this.state.datosUsuario.confirmPassword.length < 10)
  {
    this.setState({
      alert_message: 'La confirmación del password debe tener diez caracteres',
      isNullComfirmPassword: 'true',
    });
      return false;
  }
  if (this.state.datosUsuario.password != this.state.datosUsuario.confirmPassword)
  {
    this.setState({
      alert_message: 'El password y la confirmación del password deben ser indenticos',
      isNullPassword: 'true',
      isNullComfirmPassword: 'true'
    });
    return false;
  }
    return true;
}

validacionBoton(e){
  if (e == 'true'){
    return 'red-icon'
  }
  if (e == 'false'){
    return 'green-icon'
  }
  return '';
}

render(){
  const {loading} = this.state;
  const {auth, error} = this.props;
  
  if (auth.uid && error==null) {
    //Otra forma de hacer redirect
    // this.props.history.push("/")
    return <Redirect  to="/" />
  }
  return (

    <div id="cover-caption">
        
        {this.state.alert_message!=""?<AlertaError mensaje={this.state.alert_message} />:null}
        <div id="container" className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-4 text-center">
                    <h1 className="col-sm-7 display-5  my-4">Registrar</h1>
                    <div className="info-form col-sm-7">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text bg-white">
                                  <i className= {this.validacionBoton(this.state.isNullEmail)}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                </div>
                              </div>
                              <input type="email" className="form-control" placeholder="email" name="emailUsuario" value={this.state.datosUsuario.email} onChange={(e)=>{
                                let {datosUsuario} = this.state;
                                datosUsuario.email = e.target.value;
                                this.setState({datosUsuario});
                              }} required="true"
                              onBlur={(e)=>{
                                if (e.target.value == '')
                                  {
                                    this.setState({isNullEmail: 'true'});
                                  }else {
                                    this.setState({isNullEmail: 'false', alert_message: ''});
                                  }
                                }} />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {this.validacionBoton(this.state.isNullPassword)}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input className="form-control" type= "password" placeholder="Password" name="password" value={this.state.datosUsuario.password} onChange={(e)=>{
                                  let {datosUsuario} = this.state;
                                  datosUsuario.password = e.target.value;
                                  this.setState({datosUsuario});
                                }}  required="true" maxlength="10" minlength="10"
                                onBlur={(e)=>{
                                  if (e.target.value == '')
                                    {
                                      this.setState({isNullPassword: 'true'});
                                    }else {
                                      this.setState({isNullPassword: 'false', alert_message: ''});
                                    }
                                  }}/>
                              </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {this.validacionBoton(this.state.isNullComfirmPassword)}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input className="form-control" type= "password" placeholder="Confirmar password" name="confirmarPassword" value={this.state.datosUsuario.confirmPassword} onChange={(e)=>{
                                  let {datosUsuario} = this.state;
                                  datosUsuario.confirmPassword = e.target.value;
                                  this.setState({datosUsuario});
                                }}  required="true" maxlength="10" minlength="10"
                                onBlur={(e)=>{
                                  if (e.target.value == '')
                                    {
                                      this.setState({isNullComfirmPassword: 'true'});
                                    }else {
                                      this.setState({isNullComfirmPassword: 'false', alert_message: ''});
                                    }
                                  }}/>
                              </div>
                            </div>

                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text bg-white">
                                  <i className= {this.validacionBoton(this.state.isNullFirstName)}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                </div>
                              </div>
                              <input className="form-control" type= "text" placeholder="Nombre" name="firstName" value={this.state.datosUsuario.firstName} onChange={(e)=>{
                                let {datosUsuario} = this.state;
                                datosUsuario.firstName = e.target.value;
                                this.setState({datosUsuario});
                              }} required="true"
                              onBlur={(e)=>{
                                if (e.target.value == '')
                                  {
                                    this.setState({isNullFirstName: 'true'});
                                  }else {
                                    this.setState({isNullFirstName: 'false', alert_message: ''});
                                  }
                                }} />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text bg-white">
                                  <i className= {this.validacionBoton(this.state.isNullLastName)}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                </div>
                              </div>
                              <input className="form-control" type= "text" placeholder="Apellido" name="lastName" value={this.state.datosUsuario.lastName} onChange={(e)=>{
                                let {datosUsuario} = this.state;
                                datosUsuario.lastName = e.target.value;
                                this.setState({datosUsuario});
                              }} required="true"
                              onBlur={(e)=>{
                                if (e.target.value == '')
                                  {
                                    this.setState({isNullLastName: 'true'});
                                  }else {
                                    this.setState({isNullLastName: 'false', alert_message: ''});
                                  }
                                }} />
                            </div>
                          </div>

                            <div className="form-group">
                              <button className="btn btn-success" onClick={this.submitForm.bind(this)}>
                                {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="database" />}
                                Guardar
                              </button>
                            </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
}
const mapStateToProps = state =>
{
  return {
    //Se obtiene el reducer sesion que se definio en el rootReducer para pasar el valor de la variable error al props
    error: state.usuarios.error,
    //Se obtiene el valor de la varible auth de firebase que contiene el valor del usuario autenticado
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps, {saveUsuarios, iniciarSesion})(RegistrarUsuario);

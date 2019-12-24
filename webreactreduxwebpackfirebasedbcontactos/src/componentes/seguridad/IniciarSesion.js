import React, {Component, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import AlertaError from '../AlertaError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {iniciarSesion} from '../../actions/actionsUsuarios';
import {connect} from 'react-redux';

class IniciarSesion extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      loading: false,
      alert_message:'',
      datosUsuario: {
        email: '',
        password: ''
      },
      loggedIn,
      isNullEmail: '',
      isNullPassword: ''
    }
  }
  componentWillReceiveProps(nextProps){
    //En este método y dentro del render ya se pueden obtener los valores props devueltos por el mapeo del reducer
    const {error, auth} = nextProps;
     if (error == null)
     {
       if (auth.uid != null)
       {
           //Se genera el token
           localStorage.setItem("token", "jasdajalkcecklwcljekwej");
           //Se setea que ingreso
           this.setState({
             loading:false,
             loggedIn: true,
             alert_message: '',
             datosUsuario: {
               email: '',
               password: ''
             }
           });
       }
     }else
     {
      this.setState({
        alert_message: error
      });
     }
   }

  validacionControles() {
    if (this.state.datosUsuario.email=='' && this.state.datosUsuario.password=='')
    {
      this.setState({
        alert_message: 'Introduzca el usuario y el password',
        isNullEmail: 'true',
        isNullPassword: 'true'
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
    return  true;
  }

  submitForm()
  {
  
    let valControles = this.validacionControles();
    
    if (valControles){
      
      this.setState({
        loading:true
      });
      this.props.iniciarSesion(this.state.datosUsuario);
      this.setState({
        loading:false
      });
    }
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
    
    if (auth.uid){
      //Otra forma de hacer redirect
      // this.props.history.push("/")
      return <Redirect  to="/" />
      //  window.location.href='/';
    }
    return (

      <div id="cover-caption">
          {this.state.alert_message!=""?<AlertaError mensaje={this.state.alert_message} />:null}
          <div id="container" className="container">
              <div className="row">
                  <div className="col-sm-6 offset-sm-4 text-center">
                    <h1 className="col-sm-7 display-5  my-4">Iniciar sesión</h1>
                    <div className="info-form col-sm-7">
                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <div className="input-group-text bg-white">
                                    <i className= {this.validacionBoton(this.state.isNullEmail)}>  <FontAwesomeIcon className="mr-1" icon="user-circle" /></i>
                                  </div>
                                </div>
                                <input type="email" className="form-control" type= "text" placeholder="Email" name="Email" value={this.state.datosUsuario.email} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.email = e.target.value;
                                    this.setState({datosUsuario});
                                  }} required="true" onBlur={(e)=>{
                                    if (e.target.value == '')
                                      {
                                        this.setState({isNullEmail: 'true'});
                                      }else {
                                        this.setState({isNullEmail: 'false', alert_message: ''});
                                      }
                                    }}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                               <div className="input-group-prepend">
                                 <div className="input-group-text bg-white">
                                   <i className= {this.validacionBoton(this.state.isNullPassword)}>  <FontAwesomeIcon className="mr-1" icon="key" /></i>
                                 </div>
                               </div>
                                <input  className="form-control" type= "password" placeholder="Password" name="password" value={this.state.datosUsuario.password} onChange={(e)=>{
                                    let {datosUsuario} = this.state;
                                    datosUsuario.password = e.target.value;
                                    this.setState({datosUsuario});
                                  }}  required="true" maxlength="10" minLength="10" onBlur={(e)=>{
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
                             <button className="btn btn-success" onClick={this.submitForm.bind(this)}>
                             {loading?<FontAwesomeIcon className="mr-2" icon="sync-alt" spin />: <FontAwesomeIcon className="mr-2" icon="sign-in-alt" />}
                               Ingresar</button>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      )
    }
}

//mapea el state Redux a variables que podran ser consumidas por props
const mapStateToProps = state =>
{
  return {
    //Se obtiene el reducer sesion que se definio en el rootReducer para pasar el valor de la variable error al props
    error: state.usuarios.error,
    //Se obtiene el valor de la varible auth de firebase que contiene el valor del usuario autenticado
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps, {iniciarSesion})(IniciarSesion);


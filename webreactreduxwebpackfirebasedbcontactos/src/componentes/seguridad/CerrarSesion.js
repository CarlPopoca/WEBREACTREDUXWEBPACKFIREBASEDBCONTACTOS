import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AlertaError from '../../componentes/AlertaError';
import {cerrarSesion} from '../../actions/actionsUsuarios';
import {connect} from 'react-redux';

class CerrarSesion extends Component{
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token==null){
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      alert_message:''
    }
    this.Salir();
  }

  componentWillReceiveProps(nextProps){
    const {error, auth} = nextProps;
    //Otra forma de hacer redirect
    // this.props.history.push("/")
    if (!auth.uid) 
      this.props.history.push("/");
    
    if (error==null)
    {
      localStorage.removeItem("token");
      this.setState({
        loggedIn: false
      });
    } else
    this.setState({
      alert_message: error
    });
   
  }

  Salir()
  {
    this.props.cerrarSesion();
  }
  render(){
    const {error} = this.props;
    return (
      <div id="cover-caption">
        <hr/>
          {this.state.alert_message?<AlertaError mensaje={this.state.alert_message} />:null}
      </div>
    )
  }
}

const mapStateToProps = state =>
{
  return {
    error: state.usuarios.error,
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps, {cerrarSesion})(CerrarSesion);

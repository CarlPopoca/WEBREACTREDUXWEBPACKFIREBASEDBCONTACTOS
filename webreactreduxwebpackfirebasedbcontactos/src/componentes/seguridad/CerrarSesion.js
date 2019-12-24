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
      loggedIn
    }
    this.Salir();
  }

  componentWillReceiveProps(nextProps){
    const {error} = nextProps;
    if (error==null)
    {
      localStorage.removeItem("token");
      this.setState({
        loggedIn: false
      });
    }
  }

  Salir()
  {
    this.props.cerrarSesion();
  }
  render(){
    const {auth, error} = this.props;

      // this.props.history.push("/")
     if (auth.uid == null && error==null) {
      return <Redirect  to="/" />
     }

    //  window.location.href='/';
    return (
      <div id="cover-caption">
        <hr/>
          {error?<AlertaError mensaje={error} />:null}
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

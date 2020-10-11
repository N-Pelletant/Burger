import React, { Component } from 'react';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';

import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address',
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      }
    },
    isSignup: true,
  }

  checkValidity = (value = "", rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }

    if (rules.isEmail) {
      isValid = isValid && value.match(/\S+@\S+\.\S+/)
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }


  switchAuthModeHandler = () => {
    this.setState(oldState => {
      return { isSignup: !oldState.isSignup }
    })
  }

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementArray.map(elem => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        touched={elem.config.touched}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation}
        changed={(event) => this.inputChangedHandler(event, elem.id)} />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

    let authRedirect = null
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button BtnType="Success">{this.state.isSignup ? "SIGN-UP" : "SIGN-IN"}</Button>
        </form>
        <Button
          BtnType="Danger"
          clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? "SIGN-IN" : "SIGN-UP"}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: !!state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
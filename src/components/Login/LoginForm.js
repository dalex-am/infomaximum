import React, { useState } from 'react';
import {Field, reduxForm} from "redux-form";
import classes from './LoginForm.module.css'
import { NavLink } from 'react-router-dom';
import {required, email} from '../../utils/valid/validators';
import { InputLogin } from '../../common/FormsControl/FormsControl';
import { Logos } from "../../assets/logo/Logos.js"

const LoginForm = (props) => {

    let [showPassword, setShowPassword] = useState(false)
  
    const openCloseEye = () => { setShowPassword(!showPassword) }
    
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field className={classes.input + " " + classes.inputEmail} component={InputLogin} 
                    name={'email'} placeholder='Электронная почта' validate={[required, email]} /> 
            </div>
            <div className={classes.passwordField}>
                <Field className={classes.input + " " + classes.inputPassword} type={showPassword ? "input" : "password"} component={InputLogin} 
                    name={'password'} placeholder='Пароль' validate={[required]} />
                <span className={classes.eye} onClick={() => openCloseEye() }>{showPassword ? Logos.openedEye : Logos.closedEye}</span>
            </div>
            <div>
                <button className={classes.inputBtn} disabled={props.isFetching} >
                    Войти в систему
                </button>
            </div>
            <div className={classes.registrationBtn} >
                <NavLink to={"/registration"}> Зарегестрироваться </NavLink>
            </div>
            {props.error && <div className={classes.summaryFormError}> 
                <span className={classes.errorImg}>
                    {Logos.errorImg}
                </span>
                <span className={classes.errorText}>
                    {props.error}
                </span>                
            </div>}
        </form>
    )
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default LoginReduxForm
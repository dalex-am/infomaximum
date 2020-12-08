import React from 'react';
import { reduxForm} from "redux-form";
import classes from './RegistrationForm.module.css'
import { NavLink } from 'react-router-dom';
import AllFields from '../../Fields/AllFields';
import { Logos } from "../../assets/logo/Logos.js"

const RegistrationForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit} >
            <h3>Регистрация</h3>

            <AllFields mode={"registration"}
                placeholderFirstName={"Имя"} 
                placeholderSecondName={"Фамилия"}
                placeholderEmail={"Электронная почта"}/>

            <div className={classes.authorizationBtn} >
                Уже зарегистрированы? <NavLink to={"/login"}> Вход </NavLink>
            </div>

            {props.errors && <div className={classes.summaryFormError}> 
                <span className={classes.errorImg}>
                    {Logos.errorImg}
                </span>
                <span className={classes.errorText}>
                    {props.errors}
                </span>                
            </div>}
        </form>
    )
}

let RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm)

export default RegistrationReduxForm
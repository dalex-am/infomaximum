import React from "react";
import logo from '../../assets/logo/logo.png'
import classes from './Registration.module.css'
import RegistrationForm from './RegistrationForm'
import { connect } from "react-redux";
import { signUp } from '../../redux/registerReducer'
import { Redirect } from "react-router-dom";



const Registration = (props) => {

    document.title = 'Регистрация нового пользователя | proceset'

    let onSubmit = (formData) => {
        props.signUp(formData.firstName, formData.secondName, formData.email, formData.password)
    }

    if (props.isAuth) {
        return <Redirect to={"/main"} />
    }

    return (
        <div>
            <img className={classes.logo} src={logo} alt=""/>
            <div className={classes.loginFormWrapper}>
                <RegistrationForm onSubmit={onSubmit} errors={props.errors} isFetching={props.isFetching} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    errors: state.register.errors,
    isFetching: state.register.isFetching
})

export default connect(mapStateToProps, {signUp})(Registration)
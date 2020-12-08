import React from "react";
import logo from '../../assets/logo/logo.png'
import classes from './Login.module.css'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import { login, getUserData } from '../../redux/authReducer'
import { Redirect } from "react-router-dom";


const Login = (props) => {
    
    document.title = 'Вход в личный кабинет | proceset'
    
    if (props.isAuth) {
        return <Redirect to={'/main'} />
    }
    props.getUserData()
    console.log("Просим юзера со страницы Login")

    let onSubmit = (formData) => {
        props.login(formData.email, formData.password )
        console.log(formData)
    }

    return (  
        <div>
            <img className={classes.logo} src={logo} alt=""/>
            <div className={classes.loginFormWrapper}>
                <LoginForm onSubmit={onSubmit} isFetching={props.isFetching} />
            </div>
        </div>
    )    
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {login, getUserData})(Login)
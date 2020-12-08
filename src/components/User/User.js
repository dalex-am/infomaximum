import React from "react";
import classes from './User.module.css'
import UserForm from './UserForm'
import { connect } from "react-redux";
import { editUser } from '../../redux/authReducer'


const User = (props) => {

    let onSubmit = (formData) => {
        props.editUser(props.id, 
            formData.email, 
            formData.firstName, 
            formData.secondName, 
            formData.password )
        let button = document.getElementById("edit-user-btn")
        button.innerHTML = "Сохранено"
        setTimeout(() => {button.innerHTML = "Сохранить"}, 3000)
    }

    return (   
        <div>
            <div className={classes.userFormWrapper}>
                <UserForm onSubmit={onSubmit} firstName={props.firstName} 
                    secondName={props.secondName} email={props.email} />
            </div>
        </div>
    )    
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    firstName: state.auth.firstName,
    secondName: state.auth.secondName,
    email: state.auth.email,
})

export default connect(mapStateToProps, {editUser})(User)
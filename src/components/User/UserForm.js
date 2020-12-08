import React from 'react';
import {reduxForm, Field, reset} from "redux-form";
import classes from './UserForm.module.css';
import AllFields from '../../Fields/AllFields';

const UserForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <h1>{props.firstName + " " + props.secondName}. Редактирование</h1>
            <div className={classes.inputDataWrapper}> 
                <div>
                    <div className={classes.labelData}>Имя</div>
                    <div className={classes.labelData}>Фамилия</div>
                    <div className={classes.labelData}>Электронная почта</div>
                    <div className={classes.labelData}>Пароль</div>
                    <div className={classes.labelData}>Повторите пароль</div>
                </div>

                <div>
                    <AllFields mode={"user"} 
                        placeholderFirstName={props.firstName} 
                        placeholderSecondName={props.secondName}
                        placeholderEmail={props.email} />
                </div>
            </div>
        </form>
    )
}

// const afterSubmit = (result, dispatch) =>
//         dispatch(reset('user'));

let UserReduxForm = reduxForm({form: 'user', 
    // onSubmitSuccess: afterSubmit
})(UserForm)

export default UserReduxForm
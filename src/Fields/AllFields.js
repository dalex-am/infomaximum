import React, {useState} from 'react';
import {Field} from "redux-form";
import classes from "./Fields.module.css";
import {Logos} from "../assets/logo/Logos.js";
import cn from "classnames";

const AllFields = (props) => {

    // Хуки и функция для проверки имени
    let [firstNameOk, setFirstNameOk] = useState(false)

    function checkFirstName() {
        let firstName = document.getElementsByName("firstName")[0].value
        setFirstNameOk( firstName.length > 0 )
    }
    
    // Хуки и функция для проверки фамилии
    let [secondNameOk, setSecondNameOk] = useState(false)

    function checkSecondName() {
        let secondName = document.getElementsByName("secondName")[0].value
        setSecondNameOk( secondName.length > 0 )
    }

    // Хуки и функция для проверки email'а
    let [emailOk, setEmailOk] = useState(false)
    let [emailCorrect, setEmailCorrect] = useState(false)

    function checkEmail() {
        let email = document.getElementsByName("email")[0].value
        setEmailCorrect( /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) )
        setEmailOk( email.length > 0 )
    }

    // Хуки и функция для проверки пароля
    let [lengthOk, setLengthOk] = useState(false)
    let [upperCaseOk, setUpperCaseOk] = useState(false)
    let [lowerCaseOk, setLowerCaseOk] = useState(false)
    let [numbersOk, setNumbersOk] = useState(false)
    let [symbolsOk, setSymbolsOk] = useState(false)

    function checkPassword() {
        let password = document.getElementsByName("password")[0].value
        setLengthOk(password.length > 8)
        setUpperCaseOk(/[A-Z]/.test(password))
        setLowerCaseOk(/[a-z]/.test(password))
        setNumbersOk(/[0-9]/.test(password))
        setSymbolsOk(/[._%+-/!/$/#/&]/.test(password))
    }

    // Хуки и функция для проверки одинаковости паролей
    let [passwordEqual, setPasswordEqual] = useState(false)

    function checkPasswordEqual() {
        let password = document.getElementsByName("password")[0].value
        let checkingPassword = document.getElementsByName("checkPassword")[0].value
        setPasswordEqual( password === checkingPassword )
    }    
    
    // Хуки и функция для глаза у паролей
    let [showPasswordOne, setShowPasswordOne] = useState(false)
    let [showPasswordTwo, setShowPasswordTwo] = useState(false)

    const openCloseEye = (number) => {
        number === 1 ? setShowPasswordOne(!showPasswordOne) : setShowPasswordTwo(!showPasswordTwo) 
        }

    // Списки всех хуков (для паролей отдельно) и функция для мьюта кнопки
    let hooksNoPassword = [firstNameOk, secondNameOk, emailCorrect, emailOk] 
    let hooksPassword = [lengthOk, upperCaseOk, lowerCaseOk, numbersOk, symbolsOk, passwordEqual]


    return (
        <div>
            <div className={classes.input} onFocus={() => {document.getElementById("firstNameHint").style.visibility = "visible"}}
                onBlur={() => {document.getElementById("firstNameHint").style.visibility = "hidden"}}>
                <Field className={classes.inputData} style={props.mode === "user" ? {"width": "435px"} : {"width": "328px", "marginLeft": "48px"} }
                    component={"input"} name={'firstName'} 
                    placeholder={props.placeholderFirstName} onChange={() => checkFirstName() } /> 
                <div id="firstNameHint" style={{"visibility": "hidden"}}>
                    <div className={cn(classes.squarePassword, {[classes.squareUser]: props.mode === "user", [classes.squareRegistration]: props.mode === "registration"}) } ></div>
                    <div className={cn(classes.oneStringInfo, {[classes.hintUser]: props.mode === "user", [classes.hintRegistration]: props.mode === "registration" }) } id="firstNameInfo">
                        <span className={classes.iconValid} style={{"top": "14px"}}>{firstNameOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "12px"}}>обязательно для ввода</span>
                    </div>
                </div>
            </div>

            <div className={classes.input} onFocus={() => {document.getElementById("secondNameHint").style.visibility = "visible"}}
                onBlur={() => {document.getElementById("secondNameHint").style.visibility = "hidden"}}>
                <Field className={classes.inputData} style={props.mode === "user" ? {"width": "435px"} : {"width": "328px", "marginLeft": "48px"} }
                    component={"input"} name={'secondName'} 
                    placeholder={props.placeholderSecondName} onChange={() => checkSecondName() } /> 
                <div id="secondNameHint" style={{"visibility": "hidden"}}>
                    <div className={cn(classes.squarePassword, {[classes.squareUser]: props.mode === "user", [classes.squareRegistration]: props.mode === "registration"}) } ></div>
                    <div className={cn(classes.oneStringInfo, {[classes.hintUser]: props.mode === "user", [classes.hintRegistration]: props.mode === "registration" }) } id="secondNameInfo">
                        <span className={classes.iconValid} style={{"top": "14px"}}>{secondNameOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "12px"}}>обязательно для ввода</span>
                    </div>
                </div>
            </div>

            <div className={classes.input} onFocus={() => {document.getElementById("emailHint").style.visibility = "visible"}}
                onBlur={() => {document.getElementById("emailHint").style.visibility = "hidden"}}>
                <Field className={classes.inputData} style={props.mode === "user" ? {"width": "435px"} : {"width": "328px", "marginLeft": "48px"} }
                    component={"input"} name={'email'} 
                    placeholder={props.placeholderEmail} onChange={() => checkEmail() } /> 
                <div id="emailHint" style={{"visibility": "hidden"}}>
                    <div className={cn(classes.squarePassword, {[classes.squareUser]: props.mode === "user", [classes.squareRegistration]: props.mode === "registration"}) } ></div>
                    <div className={cn(classes.twoStringInfo, {[classes.hintUser2]: props.mode === "user", [classes.hintRegistration2]: props.mode === "registration" }) } id="emailInfo">
                        <span className={classes.iconValid} style={{"top": "14px"}}>{emailCorrect ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "12px"}}>корректный email,</span>
                    
                        <span className={classes.iconValid} style={{"top": "42px"}}>{emailOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "40px"}}>обязательно для ввода</span>
                    </div>
                </div>
            </div>

            <div className={classes.input} onFocus={() => {document.getElementById("passwordHint").style.visibility = "visible"}}
                onBlur={() => {document.getElementById("passwordHint").style.visibility = "hidden"}}>
                <Field className={classes.inputData} style={props.mode === "user" ? {"width": "435px"} : {"width": "328px", "marginLeft": "48px"} }
                    component={"input"} type={showPasswordOne ? "input" : "password"}  
                    name={'password'} placeholder='Введите пароль' onChange={ () => {checkPassword()} } />
                <span className={props.mode === "user" ? classes.eyeUser : classes.eyeRegistration} onClick={() => openCloseEye(1) }>{showPasswordOne ? Logos.openedEye : Logos.closedEye}</span>

                <div id="passwordHint" style={{"visibility": "hidden"}}>
                    <div className={cn(classes.squarePassword, {[classes.squareUser]: props.mode === "user", [classes.squareRegistration]: props.mode === "registration"}) } ></div>
                    <div className={cn(classes.passwordInfo, {[classes.hintUser5]: props.mode === "user", [classes.hintRegistration5]: props.mode === "registration" }) } id="passwordInfo">
                        <span className={classes.iconValid} style={{"top": "14px"}}>{lengthOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "12px"}}>минимум 8 символов,</span>
                        
                        <span className={classes.iconValid} style={{"top": "42px"}}>{upperCaseOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "40px"}}>латинские прописные буквы (A–Z),</span>
                    
                        <span className={classes.iconValid} style={{"top": "70px"}}>{lowerCaseOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "68px"}}>латинские строчные буквы (a–z),</span>
                    
                        <span className={classes.iconValid} style={{"top": "98px"}}>{numbersOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "96px"}}>цифры (0-9),</span>
                    
                        <span className={classes.iconValid} style={{"top": "126px"}}>{symbolsOk ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "124px"}}>неалфавитные символы (!,$,#,% и т.д.)</span>
                    
                    </div>
                </div>
            </div>

            <div className={classes.input} onFocus={() => {document.getElementById("checkPasswordHint").style.visibility = "visible"}}
                onBlur={() => {document.getElementById("checkPasswordHint").style.visibility = "hidden"}}>
                <Field className={classes.inputData} style={props.mode === "user" ? {"width": "435px"} : {"width": "328px", "marginLeft": "48px"} }
                    component={"input"} type={showPasswordTwo ? "input" : "password"} 
                    name={'checkPassword'} placeholder='Повторите пароль' onChange={() => {checkPasswordEqual()}} />
                <span className={props.mode === "user" ? classes.eyeUser : classes.eyeRegistration} onClick={() => openCloseEye(2) }>{showPasswordTwo ? Logos.openedEye : Logos.closedEye}</span>
                <div id="checkPasswordHint" style={{"visibility": "hidden"}}>
                    <div className={cn(classes.squarePassword, {[classes.squareUser]: props.mode === "user", [classes.squareRegistration]: props.mode === "registration"}) } ></div>
                    <div className={cn(classes.oneStringInfo, {[classes.hintUser]: props.mode === "user", [classes.hintRegistration]: props.mode === "registration" }) } id="checkPasswordInfo">
                        <span className={classes.iconValid} style={{"top": "14px"}}>{passwordEqual ? Logos.iconOk : Logos.iconNotOk}</span>
                        <span className={classes.textValid} style={{"top": "12px"}}>пароли совпадают</span>
                    </div>
                </div>
            </div>
            <button className={ props.mode === "user" ? classes.inputBtnUser : classes.inputBtnRegistration } 
                disabled={ props.mode === "user" 
                ? ((hooksPassword.some(e => e)  
                    ? !hooksNoPassword.every(e => e) + !hooksPassword.every(e => e)
                    : !hooksNoPassword.every(e => e)) || props.isFetched) 
                : (!hooksNoPassword.every(e => e) + !hooksPassword.every(e => e) || props.isFetching) } 
                id="edit-user-btn" >{props.mode === "user" ? "Сохранить": "Применить и войти"}</button>
        </div>
    )
}

export default AllFields
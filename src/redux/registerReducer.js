import { stopSubmit } from "redux-form";
import { getUserData } from "./authReducer"

const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const SET_ERRORS = 'SET-ERRORS'


let initialState = {
    isFetching: false,
    errors: null
}

const registerReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            }
        default:
            return state;
    }
}

const setErrors = (errors) => {
    return { type: SET_ERRORS, errors: errors }
}

const toggleIsFetching = (isFetching) => {

    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}



export const signUp = (firstName, secondName, email, password) => async (dispatch) => {
    const mutation = `mutation {
        signup(firstName: "${firstName}", secondName: "${secondName}", email: "${email}", password: "${password}")
    }`
    const url = 'http://localhost:4000/api/'
    const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    }
    
    try {
        dispatch(toggleIsFetching(true))
        dispatch(setErrors(null))
        let response = await fetch(url, opt)
        let data = await response.json() 
        try {
            let message = data.errors.length > 0 ? "Сообщение сервера: \"" + data.errors[0].message + "\"" : "Непредвиденная ошибка сервера";
            dispatch(stopSubmit("registration", {_error: message}))
            dispatch(setErrors(message))
            dispatch(toggleIsFetching(false))
        } catch (error) {
            window.localStorage.setItem("token", data.data.signup)
            dispatch(toggleIsFetching(false)) 
            dispatch(getUserData())
        }
    } catch (error) {
        dispatch(stopSubmit("registration", {_error: "Непредвиденная ошибка сервера"}))
        dispatch(setErrors("Непредвиденная ошибка сервера"))
        dispatch(toggleIsFetching(false))
    } 
}

export default registerReducer;


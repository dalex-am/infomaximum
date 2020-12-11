// import {APIs} from "../api/api"
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';


let initialState = {
    id: null,
    firstName: null,
    secondName: null,
    email: null,
    isAuth: false,
    isFetching: false,
    errors: null,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                id: action.id,
                firstName: action.firstName,
                secondName: action.secondName,
                email: action.email,
                isAuth: action.isAuth
                }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}


export const setUserData = (id, firstName, secondName, email, isAuth) => {

    return {
        type: SET_USER_DATA,
        id, firstName, secondName, email, isAuth
    }
}

export const toggleIsFetching = (isFetching) => {

    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}

export const login = (email, password) => async (dispatch) => {
    const mutation = `mutation {
        login(email: "${email}", password: "${password}"),
        {token, user{id, firstName, secondName, email}}
    }`
    const url = 'http://localhost:4000/api/'
    const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    // "Authorization": "bearer " + window.localStorage.getItem("token") },
                     },
        body: JSON.stringify({ query: mutation })
    }
    try {
        dispatch(toggleIsFetching(true))
        let response = await fetch(url, opt)
        let data = await response.json()
        try {
            dispatch(setUserData(data.data.login.user.id, data.data.login.user.firstName,
                data.data.login.user.secondName, data.data.login.user.email, true))
            window.localStorage.setItem("token", data.data.login.token)
            dispatch(toggleIsFetching(false))       
        } catch (error) {
            let message = data.errors.length > 0 ? "Сообщение сервера: \"" + data.errors[0].message + "\"" : "Непредвиденная ошибка сервера";
            dispatch(stopSubmit("login", {_error: message}))
            dispatch(toggleIsFetching(false))
        }
    } catch (error) {
        dispatch(stopSubmit("login", {_error: "Непредвиденная ошибка сервера"}))
        dispatch(toggleIsFetching(false))
    }
    
}

export const getUserData = () => async (dispatch) => {
    const query = `query {
        currentUser,
        {id, firstName, secondName, email}
    }`
    const url = 'http://127.0.0.1:4000/api/'
    const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": "bearer " + window.localStorage.getItem("token") },
        body: JSON.stringify({ query: query })
    }

    let response = await fetch(url, opt)
    let data = await response.json()
    try {
        dispatch(setUserData(data.data.currentUser.id, data.data.currentUser.firstName,
            data.data.currentUser.secondName, data.data.currentUser.email, true))
    } catch (error) {
        console.log("Ошибка при getUserData")
    } 
}

export const editUser = (id, email, firstName, secondName, password) => async (dispatch) => {
    
    let query
    {password == null
    ? query = `mutation {
        editUser(id: ${id}, email: "${email}", firstName: "${firstName}", 
            secondName: "${secondName}"),
        {id, firstName, secondName, email}
    }`
    : query = `mutation {
        editUser(id: ${id}, email: "${email}", firstName: "${firstName}", 
            secondName: "${secondName}", password: "${password}"),
        {id, firstName, secondName, email}
    }`}
    
    const url = 'http://127.0.0.1:4000/api/'
    const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": "bearer " + window.localStorage.getItem("token") },
        body: JSON.stringify({ query: query })
    }

    let response = await fetch(url, opt)
    let data = await response.json()
    try {
        toggleIsFetching(true)
        dispatch(setUserData(data.data.editUser.id, data.data.editUser.firstName,
            data.data.editUser.secondName, data.data.editUser.email, true))
        toggleIsFetching(false)
    } catch (error) {
        toggleIsFetching(false)
    }
}

export default authReducer;
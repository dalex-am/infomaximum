import React, { useState, useEffect } from 'react';
import classes from './Main.module.css';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/authReducer';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu'
import ProcessList from '../Processes/ProcessList';
import User from '../User/User';

const Main = (props) => {

    let [leftMenuMode, setLeftMenuMode] = useState(false)
    let [mode, setMode] = useState("processList")

    useEffect( () => { mode === "processList" ? document.title = 'Список процессов | proceset' : document.title = 'Профиль пользователя | proceset'} )

    props.getUserData()

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }

    const openLeftMenu = () => {
        setLeftMenuMode(true)
        document.getElementsByClassName("app-wrapper")[0].style.overflowY = "hidden"
    }

    const closeLeftMenu = () => {
        setLeftMenuMode(false)
        document.getElementsByClassName("app-wrapper")[0].style.overflowY = "initial"
    }

    return (
        <div className={classes.mainWrapper}>
            <TopMenu openLeftMenu={openLeftMenu} />
            { leftMenuMode && <LeftMenu closeLeftMenu={closeLeftMenu} openLeftMenu={openLeftMenu} setMode={setMode} 
                firstName={props.firstName} secondName={props.secondName} /> }
            <div className={classes.content}> 
                {mode === "user" && <User />}
                {mode === "processList" && <ProcessList getUserData={props.getUserData} />}
            </div>
            
            {/* Для отладки
            <button style={{"position": "fixed", "top": "10px", "right": "50px", "zIndex": "1001"}}
                onClick={ () => {window.localStorage.removeItem("token")} }>выйти</button> */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    firstName: state.auth.firstName,
    secondName: state.auth.secondName
})

export default connect(mapStateToProps, {getUserData})(Main)
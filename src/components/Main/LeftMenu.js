import React from 'react';
import classes from './Main.module.css';
import { Logos } from "../../assets/logo/Logos.js"

const LeftMenu = (props) => {

    return (
        <div>
            <div className={classes.topLeftMenu}>
                <span className={classes.menuIcon + " " + classes.pointer} onClick={props.closeLeftMenu}>
                    {Logos.menuIcon}
                </span>
                <span className={classes.menuText}>
                    {Logos.menuText}
                </span>
            </div>
            <div className={classes.leftMenu}>
                <span className={classes.iconUser + " " + classes.pointer} onClick={ () => props.setMode("user") }>
                    {Logos.userIcon}
                </span>
                <span className={classes.userName + " " + classes.pointer} onClick={ () => props.setMode("user") }>
                    {props.firstName + " " + props.secondName}
                </span>
                <span className={classes.iconData + " " + classes.pointer} onClick={ () => props.setMode("processList") } >
                    {Logos.processesIcon}
                </span>
                <span className={classes.processesList + " " + classes.pointer} onClick={ () => props.setMode("processList") }>
                    Список процессов
                </span>
            </div>
            <div className={classes.haze} onClick={props.closeLeftMenu}></div>
        </div>
    )
}

export default LeftMenu
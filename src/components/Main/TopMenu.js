import React from 'react';
import classes from './Main.module.css';
import { Logos } from "../../assets/logo/Logos.js"

const TopMenu = (props) => {

    return (
        <div className={classes.topMenu}>
            <span className={classes.menuIcon + " " + classes.pointer} onClick={props.openLeftMenu}>
                {Logos.menuIconBlue}
            </span>
            <span className={classes.menuText}>Меню</span>
        </div>
    )
}

export default TopMenu
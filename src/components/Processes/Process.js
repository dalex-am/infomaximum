import React from 'react';
import classes from './ProcessList.module.css';
import moment from 'moment'
import 'moment/locale/ru'
import { NavLink } from 'react-router-dom';
import { Logos } from "../../assets/logo/Logos.js"

const Process = (props) => {

    function declOfNum(n, text_forms) {  
        n = Math.abs(n) % 100; var n1 = n % 10;
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }

    moment.locale('ru')

    return (
        <div className={classes.processWrapper}>
            <div className={classes.title}>
                <span className={classes.processName}>{props.name}</span>
                <NavLink to={`/main/process/${props.id}`}>                
                    <span className={classes.lookProcess} >
                        {Logos.toTheProcess}
                    </span>
                </NavLink>
            </div>
            <div className={classes.infoParent}>
                <div className={classes.infoChild + " " + classes.numberOfExecutions}>
                    <span className={classes.iconNumberOfExecutions}>
                        {Logos.refresh}
                    </span>
                    <span className={classes.titleNumberOfExecutions}>{props.numberOfExecutions}</span>
                    <span className={classes.commentNumberOfExecutions}>выполнено раз</span>
                </div>
                <div className={classes.infoChild + " " + classes.averageTime}>
                    <span className={classes.iconAverageTimeTop}>
                        {Logos.clock}
                    </span>
                    <span className={classes.titleAverageTimeTop}>
                        {`${moment.duration(props.averageLeadTime).hours()}ч ${moment.duration(props.averageLeadTime).minutes()}мин`}
                    </span>
                    <span className={classes.commentAverageTimeTop}>среднее время выполнения</span>
                    <span className={classes.iconAverageTimeBottom}>
                        {Logos.runningClock}
                    </span>
                    <span className={classes.titleAverageTimeBottom}>
                        {`${moment.duration(props.averageActiveTime).hours()}ч ${moment.duration(props.averageActiveTime).minutes()}мин`} ({(props.averageActiveTime/props.averageLeadTime*100).toFixed(1)}%)
                    </span>
                    <span className={classes.commentAverageTimeBottom}>среднее активное время</span>
                </div>
                <div className={classes.infoChild + " " + classes.employees}>
                    <span className={classes.iconemployeesTop}>
                        {Logos.people}
                    </span>
                    <span className={classes.titleemployeesTop}>{props.employeesInvolvedProcess} {declOfNum(props.employeesInvolvedProcess, ["сотрудник", "сотрудника", "сотрудников"])}</span>
                    <span className={classes.commentemployeesTop}>{declOfNum(props.employeesInvolvedProcess, ["участвует", "участвуют", "участвуют"])} в процессе</span>
                    <span className={classes.iconemployeesBottom}>
                        {Logos.branches}
                    </span>
                    <span className={classes.titleemployeesBottom}>{props.numberOfScenarios} {declOfNum(props.numberOfScenarios, ["процесс", "процесса", "процессов"])}</span>
                    <span className={classes.commentemployeesBottom}>в процессе</span>
                </div>
                <div className={classes.infoChild + " " + classes.startEnd}>
                    <div className={classes.titleStartEnd}>Начало</div>
                    <div className={classes.valueStartEnd}>{moment.unix(props.start).format("D MMMM yyyy")}</div>
                    <br></br>
                    <div className={classes.titleStartEnd}>Окончание</div>
                    <div className={classes.valueStartEnd}>{moment.unix(props.end).format("D MMMM yyyy")}</div>
                    <br></br>
                    <div className={classes.titleStartEnd}>Загрузка</div>
                    <div className={classes.valueStartEnd}>{moment.unix(props.loading).format("D MMMM yyyy")}</div>
                </div>
            </div>
        </div>
    )
}

export default Process
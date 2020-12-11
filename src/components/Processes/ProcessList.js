import React, { useState } from 'react';
import Process from './Process';
import Preloader from '../Preloader/Preloader';
import { getProcessList } from "../../redux/processesReducer";
import { connect } from 'react-redux';

const ProcessList = (props) => {

    let [processesList, setProcessesList] = useState(null)

    if (processesList == null) {
        setProcessesList( props.getProcessList() )
    }
    
    let processList = props.processes.map(
        process => <Process id={process.id} name={process.name} numberOfExecutions={process.numberOfExecutions} 
            averageLeadTime={process.averageLeadTime} averageActiveTime={process.averageActiveTime} 
            employeesInvolvedProcess={process.employeesInvolvedProcess} numberOfScenarios={process.numberOfScenarios} 
            start={process.start} end={process.end} loading={process.loading} key={process.id} />
    )

    return (
        <div style={{"min-height": "100%"}}>
            
            {props.isFetching
            ? <Preloader />
            : processList
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.processes.isFetching,
    processes: state.processes.processes
})

export default connect(mapStateToProps, {getProcessList})(ProcessList) 
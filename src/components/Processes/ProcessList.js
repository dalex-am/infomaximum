import React, { useState } from 'react';
import Process from './Process';
import Preloader from '../Preloader/Preloader';

const ProcessList = (props) => {

    let [processesList, setProcessesList] = useState(null)
    let [isFetching, setIsFetching] = useState(true)

    async function getProcessesList() {

        const query = `query {
            processList,
            {id, name, numberOfExecutions, averageLeadTime, averageActiveTime, employeesInvolvedProcess, numberOfScenarios, start, end, loading}
        }`
        const url = 'http://localhost:4000/api/'
        const opt = {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": "bearer " + window.localStorage.getItem("token") },
            body: JSON.stringify({ query: query })
        }
        
        try {
            let response = await fetch(url, opt)
            let data = await response.json()
            let processes = await data.data.processList.map(
                process => <Process id={process.id} name={process.name} numberOfExecutions={process.numberOfExecutions} 
                    averageLeadTime={process.averageLeadTime} averageActiveTime={process.averageActiveTime} 
                    employeesInvolvedProcess={process.employeesInvolvedProcess} numberOfScenarios={process.numberOfScenarios} 
                    start={process.start} end={process.end} loading={process.loading} key={process.id} />
            )
            {processesList === null &&  
                setProcessesList(processes)
                setIsFetching(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsFetching(false)
        }
        
    }

    getProcessesList()

    return (
        <div style={{"min-height": "100%"}}>
            {isFetching ? 
            <Preloader /> :
            processesList
            }
        </div>
    )
}

export default ProcessList
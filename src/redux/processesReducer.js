const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const SET_PROCESSES = 'SET-PROCESSES'


let initialState = {
    isFetching: true,
    processes: []
}

const processesReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_PROCESSES:
            return {
                ...state,
                processes: [...action.processes]
            }
        default:
            return state;
    }
}


const toggleIsFetching = (isFetching) => { return { type: TOGGLE_IS_FETCHING, isFetching: isFetching } }

const setProcessList = (processes) => { return { type: SET_PROCESSES, processes: processes } }

export const getProcessList = () => async (dispatch) => {

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
        dispatch(toggleIsFetching(false))
        dispatch(setProcessList(data.data.processList))
    } catch (error) {
        console.log(error)
    }
}

export default processesReducer;


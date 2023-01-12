import flowReducer from "./flow";
import { combineReducers } from 'redux'

const VendingMachineReducer = combineReducers({
    flow: flowReducer,
})

export default VendingMachineReducer;
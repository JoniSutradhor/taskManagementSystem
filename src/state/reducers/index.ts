import {combineReducers} from "redux";
import taskMgtReducer from "./taskMgtReducer";

const reducers = combineReducers({
    task: taskMgtReducer
});

export default reducers;
export type State = ReturnType<typeof reducers>
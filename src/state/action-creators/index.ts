import { Dispatch } from "redux";
import { Task, UTask } from "../../model";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const addTask = (task: Task) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_TASK,
            payload: task
        })
    }
}
export const removeTask = (taskId: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.REMOVE_TASK,
            payload: taskId
        })
    }
}
export const updateTask = (task: UTask) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_TASK,
            payload: task
        })
    }
}
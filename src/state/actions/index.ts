import { Task, UTask } from "../../model"
import { ActionType } from "../action-types"

export interface AddTask {
    type: ActionType.ADD_TASK,
    payload: Task
}
export interface RemoveTask {
    type: ActionType.REMOVE_TASK,
    payload: Task
}
export interface UpdateTask {
    type: ActionType.UPDATE_TASK,
    payload: UTask
}

export type Action = AddTask | RemoveTask | UpdateTask
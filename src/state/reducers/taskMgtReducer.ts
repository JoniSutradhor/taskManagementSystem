import { type } from "os";
import React from "react";
import { Task, Tasks } from "../../model";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initState: Tasks = {
    tasks: []
}
const sortedState: Tasks = {
    tasks: []
}


const reducer = (state: Tasks = initState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_TASK:
            initState.tasks.push(action.payload)
            let sumNum: number = 0;
            let sortedTas2 = [];
            sortedState.tasks = []
            sortedTas2 = [...initState.tasks]
            sortedTas2.sort((a: any, b: any) => {
                return a.duration - b.duration
            })
            for (let i = 0; i < sortedTas2.length; i++) {
                if ((sumNum + Number(sortedTas2[i].duration)) <= 60) {
                    let taskData: Task = {
                        id: sortedTas2[i].id,
                        name: sortedTas2[i].name,
                        duration: sortedTas2[i].duration
                    }
                    sortedState.tasks.push(taskData);
                    sumNum = sumNum + Number(sortedTas2[i].duration)
                } else {
                    let taskData: Task = {
                        id: sortedTas2[i].id,
                        name: sortedTas2[i].name,
                        duration: sortedTas2[i].duration
                    }
                }
            }
            return [[...initState.tasks], [...sortedState.tasks]]
        case ActionType.REMOVE_TASK:
            let index: any = initState.tasks.map((item) => {
                return item.id
            }).indexOf(action.payload);
            initState.tasks.splice(index, 1);

            let index2: any = sortedState.tasks.map((item) => {
                return item.id
            }).indexOf(action.payload);
            sortedState.tasks.splice(index2, 1);
            return [[...initState.tasks], [...sortedState.tasks]];
        case ActionType.UPDATE_TASK:
            let i: any = initState.tasks.map((item) => {
                return item.id
            }).indexOf(action.payload.id);
            initState.tasks[i].duration = action.payload.duration;

            let sumNum2: number = 0;
            let sortedTas3 = [];
            sortedState.tasks = []
            sortedTas3 = [...initState.tasks]
            sortedTas3.sort((a: any, b: any) => {
                return a.duration - b.duration
            })
            for (let i = 0; i < sortedTas3.length; i++) {
                if ((sumNum2 + Number(sortedTas3[i].duration)) <= 60) {
                    let taskData: Task = {
                        id: sortedTas3[i].id,
                        name: sortedTas3[i].name,
                        duration: sortedTas3[i].duration
                    }
                    sortedState.tasks.push(taskData);
                    sumNum2 = sumNum2 + Number(sortedTas3[i].duration)
                } else {
                    let taskData: Task = {
                        id: sortedTas3[i].id,
                        name: sortedTas3[i].name,
                        duration: sortedTas3[i].duration
                    }
                }
            }
            return [[...initState.tasks], [...sortedState.tasks]]
        default:
            return state.tasks
    }
}

export default reducer;
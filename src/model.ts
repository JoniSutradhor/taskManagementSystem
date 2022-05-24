export interface Task {
    id: any;
    name: string;
    duration: string;
}

export interface Tasks {
    tasks: Array<Task>
}

export interface UTask {
    id: any;
    duration: string;
}

export interface NotifyInf {
    num: number;
    index: number;
}
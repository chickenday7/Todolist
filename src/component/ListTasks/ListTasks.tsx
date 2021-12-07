import React from "react";
import {TasksType} from "../../App";



type ListTasks = {
    tasks: TasksType
    key:number
    id:number
}

const ListTasksMap = (props:ListTasks) => {
    debugger;

    return(<li><input type="checkbox" checked={props.tasks.isDone}/> <span>{props.tasks.title}</span></li>)
}

export default ListTasksMap
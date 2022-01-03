import React from "react";
import {TasksType} from "../../App";


type ListTasks = {
    todolistID:string
    tasks: TasksType
    key: string
    deleteTasks: (keyTask:string,taskID:string) => void
    switchDone: (keyTask:string, taskID:string, done:boolean) => void
}

const ListTasksMap = (props: ListTasks) => {

    const onDeleteTask = () => {
        props.deleteTasks(props.todolistID,props.tasks.id)
    }
    const onSwitchDone = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        props.switchDone(props.todolistID, props.tasks.id, e.currentTarget.checked)
    }


    return (
        <li>
            <input type="checkbox" checked={props.tasks.isDone} onClick={onSwitchDone}/>
            <span>{props.tasks.title}</span>
            <button onClick={onDeleteTask}>x
            </button>
        </li>
    )
}

export default ListTasksMap
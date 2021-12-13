import React from "react";
import {filterValuesType, TasksType} from "../../App";


type ListTasks = {
    tasks: TasksType
    key: number
    deleteTasks: (id:number) => void
}

const ListTasksMap = (props: ListTasks) => {


    const onDeleteTask = (id:number) => {
      props.deleteTasks(id)
    }



    return (
        <li key={props.key}>
            <input type="checkbox" checked={props.tasks.isDone}/>
            <span>{props.tasks.title}</span>
            <button onClick={() => {onDeleteTask(props.tasks.id)}}>x</button>
        </li>)
}

export default ListTasksMap
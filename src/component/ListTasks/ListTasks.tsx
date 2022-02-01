import React, {useState} from "react";
import {TasksType} from "../../App";
import {ChangeNameForm} from "../AddItemForm/ChangeNameForm";


type ListTasks = {
    todolistID:string
    tasks: TasksType
    deleteTasks: (keyTask:string,taskID:string) => void
    switchDone: (keyTask:string, taskID:string, done:boolean) => void
    renameTask: (todolistID: string, taskID: string, text: string) => void
}

const ListTasksMap = (props: ListTasks) => {
    const [changeMod, setChangeMode] = useState<boolean>(false)
    const onDeleteTask = () => {
        props.deleteTasks(props.todolistID,props.tasks.id)
    }
    const onSwitchDone = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        props.switchDone(props.todolistID, props.tasks.id, e.currentTarget.checked)
    }
    const renameTask = (text:string) => {
        props.renameTask(props.todolistID,props.tasks.id,text)
    }
    const onInputMode = () => {
        setChangeMode(true)
    }

    return (
        <li key={props.tasks.id}>
            <input type="checkbox" checked={props.tasks.isDone} onClick={onSwitchDone}/>
            {changeMod
                ? <ChangeNameForm name={props.tasks.title} callback={renameTask} setChangeMode={setChangeMode} />
                : <span onClick={onInputMode}>{props.tasks.title}</span>
            }
            <button onClick={onDeleteTask}>x
            </button>
        </li>
    )
}

export default ListTasksMap
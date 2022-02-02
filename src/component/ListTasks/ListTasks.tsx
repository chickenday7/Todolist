import React, {useState} from "react";
import {TaskType} from "../../App";
import {ChangeNameForm} from "../AddItemForm/ChangeNameForm";
import DeleteIcon from "@material-ui/icons/Delete";
import {createStyles, makeStyles} from "@material-ui/core";
import s from './ListTasksStyle.module.scss'


const useStyles = makeStyles((theme) =>
    createStyles({
        delete:{
            width:'20px',
            height:'20px',
            cursor:'pointer',
            marginLeft:'auto',
            '&:hover':{
                color:'red'
            }
        }
    })
)


type ListTasks = {
    todolistID: string
    tasks: TaskType
    deleteTasks: (keyTask: string, taskID: string) => void
    switchDone: (keyTask: string, taskID: string, done: boolean) => void
    renameTask: (todolistID: string, taskID: string, text: string) => void
}
const ListTasksMap = (props: ListTasks) => {
    const [changeMod, setChangeMode] = useState<boolean>(false)
    const onDeleteTask = () => {
        props.deleteTasks(props.todolistID, props.tasks.id)
    }
    const onSwitchDone = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        props.switchDone(props.todolistID, props.tasks.id, props.tasks.isDone)
        debugger
    }
    const renameTask = (text: string) => {
        props.renameTask(props.todolistID, props.tasks.id, text)
    }
    const onInputMode = () => {
        setChangeMode(true)
    }
    const classes = useStyles()
    return (
        <li key={props.tasks.id} className={s.wrapperItemTask}>
            <input type="checkbox" checked={props.tasks.isDone} onClick={onSwitchDone}/>
            {changeMod
                ? <ChangeNameForm name={props.tasks.title} callback={renameTask} setChangeMode={setChangeMode}/>
                : <span onClick={onInputMode}>{props.tasks.title}</span>
            }
            <DeleteIcon className={classes.delete} onClick={onDeleteTask}/>

        </li>
    )
}

export default ListTasksMap
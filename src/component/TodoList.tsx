import React, {MouseEvent, ReactNode, useState} from "react";
import {filterValuesType, TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {ChangeNameForm} from "./AddItemForm/ChangeNameForm";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import s from './Todolist.module.scss'
import {ChangeNameTooltip, DeleteTooltip} from './../SuperComponents/Tooltip'
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        delete: {
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            display:'inline-block',
            '&:hover': {
                color: 'red'
            }
        },
        edit:{
            width: '20px',
            height: '20px',
            position:'absolute',
            right:'-18px',
            top:'5px',
            '&:hover':{
                color:'#2d97e7'
            }
        },
        editActive:{
            width: '20px',
            height: '20px',
            position:'absolute',
            right:'-18px',
            top:'5px',
            color:'#2d97e7'
        }
    }),
)

type TodoListProps = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    deleteTasks: (keyTask: string, taskID: string) => void
    changeFilter: (filterValue: filterValuesType, todolistID: string) => void
    addTask: (text: string, keyTask: string) => void
    switchDone: (keyTask: string, taskID: string, done: boolean) => void
    removeTodolist: (todolistID: string) => void
    renameTodolist: (text: string, keyTodolist: string) => void
    renameTask: (todolistID: string, taskID: string, text: string) => void
}
const TodoList = (props: TodoListProps) => {
    const [changeMod, setChangeMode] = useState<boolean>(false)
    let listTasks: ReactNode = props.tasks.map((elem) => <ListTasksMap tasks={elem}
                                                                       todolistID={props.todolistID}
                                                                       key={elem.id}
                                                                       deleteTasks={props.deleteTasks}
                                                                       switchDone={props.switchDone}
                                                                       renameTask={props.renameTask}
    />)

    const [hoverFroEdit,setHoverForEdit] = useState<boolean>(false)

    const onSetFilter = (e: MouseEvent<HTMLButtonElement>) => {
        props.changeFilter(e.currentTarget.name as filterValuesType, props.todolistID)
    }
    const onRemoveTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTask = (text: string) => {
        props.addTask(text, props.todolistID)
    }
    const onInputMode = () => {
        setChangeMode(true)
    }
    const renameTask = (text: string) => {
        props.renameTodolist(text, props.todolistID)
    }
    const classes = useStyles();
    return (
        <div className={s.wrapperTodo}>
            {changeMod
                ? <ChangeNameForm name={props.title} setChangeMode={setChangeMode} callback={renameTask}/>
                : <div className={s.wrapperNameTodo}>
                    <ChangeNameTooltip placement={'top-start'} title={'Change name'}>
                            <h3 className={s.titleTodo} onMouseLeave={()=>{setHoverForEdit(false)}} onMouseOver={()=>{setHoverForEdit(true)}} onClick={onInputMode}>
                                {props.title}<EditIcon className={hoverFroEdit ? classes.editActive:classes.edit }/>
                            </h3>
                    </ChangeNameTooltip>
                    <DeleteTooltip title="Delete">
                        <DeleteIcon onClick={onRemoveTodolist} className={classes.delete}/>
                    </DeleteTooltip>
                </div>
            }
            <AddItemForm label={'Task'} callback={addTask}/>
            <ul>
                {listTasks}
            </ul>
            <div>
                <button name={'all'} onClick={onSetFilter}>All</button>
                <button name={'active'} onClick={onSetFilter}>Active</button>
                <button name={'completed'} onClick={onSetFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
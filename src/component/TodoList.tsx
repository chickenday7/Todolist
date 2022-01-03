import React, {ReactNode, MouseEvent, ChangeEvent, useState} from "react";
import {filterValuesType, TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";


type TodoListProps = {
    id:string
    title: string
    tasks: Array<TasksType>
    deleteTasks: (keyTask:string,taskID:string) => void
    changeFilter: (filterValue:filterValuesType, todolistID:string) => void
    addTasks:(text:string,keyTask:string)=>void
    switchDone: (keyTask:string, taskID:string, done:boolean) => void
    removeTodolist: (todolistID:string)=>void
}


const TodoList = (props: TodoListProps) => {

    let [nameTask, setNameTask] = useState<string>('')
    const addSymbol = (symbol: string) => {
        setNameTask(symbol)
    }
    let listTasks:ReactNode = props.tasks.map((elem) => <ListTasksMap tasks={elem}
                                                                      todolistID = {props.id}
                                                                      key={elem.id}
                                                                      deleteTasks={props.deleteTasks}
                                                                      switchDone = {props.switchDone}
    />)
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        addSymbol(e.currentTarget.value)
    }
    const onAddTasks = () => {
      props.addTasks(nameTask,props.id)
    }
    const onSetFilter = (e:MouseEvent<HTMLButtonElement>) => {
        props.changeFilter(e.currentTarget.name as filterValuesType,props.id)
    }
    const onRemoveTodolist = ()=>{
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={onRemoveTodolist} >X</button></h3>
            <div>
                <input value={nameTask} onChange={onChangeInput} />
                <button onClick={onAddTasks}>+</button>
            </div>
            <ul>
                {listTasks}
            </ul>
            <div>
                <button name={'all'} onClick={onSetFilter} >All</button>
                <button name={'active'} onClick={onSetFilter} >Active</button>
                <button name={'completed'} onClick={onSetFilter} >Completed</button>
            </div>
        </div>
    )
}
export default TodoList
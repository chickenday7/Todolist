import React, {ReactNode, MouseEvent} from "react";
import {filterValuesType, TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";


type TodoListProps = {
    title: string
    nameTask:string
    tasks: Array<TasksType>
    deleteTasks: (id:number) => void
    changeFilter: (filterValue:filterValuesType) => void
    addTasks:(text:string)=>void
    addSymbolTask:(symbol:string)=>void
}


const TodoList = (props: TodoListProps) => {


    let listTasks:ReactNode = props.tasks.map((elem) => <ListTasksMap tasks={elem}
                                                                      key={elem.id}
                                                                      deleteTasks={props.deleteTasks}

    />)
    const onChangeInput = (symbol:string) => {
      props.addSymbolTask(symbol)
    }
    const onAddTasks = () => {
      props.addTasks(props.nameTask)
    }
    const onSetFilter = (e:MouseEvent<HTMLButtonElement>) => {
        props.changeFilter(e.currentTarget.name as filterValuesType)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={props.nameTask} onChange={(e)=>{onChangeInput(e.currentTarget.value)}} />
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
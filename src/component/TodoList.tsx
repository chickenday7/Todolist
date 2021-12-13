import React, {ReactNode} from "react";
import {filterValuesType, TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";


type TodoListProps = {
    title: string
    tasks: Array<TasksType>
    deleteTasks: (id:number) => void
    changeFilter: (filterValue:filterValuesType) => void
}


const TodoList = (props: TodoListProps) => {


    let listTasks:ReactNode = props.tasks.map((elem) => <ListTasksMap tasks={elem}
                                                                      key={elem.id}
                                                                      deleteTasks={props.deleteTasks}

    />)



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {listTasks}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}} >All</button>
                <button onClick={() => {props.changeFilter('active')}} >Active</button>
                <button onClick={() => {props.changeFilter('completed')}} >Completed</button>
            </div>
        </div>
    )
}
export default TodoList
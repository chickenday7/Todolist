import React from "react";
import {TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";


type TodoListProps = {
    title: string
    tasks: Array<TasksType>
}


const TodoList = (props: TodoListProps) => {


    let listTasks = props.tasks.map((elem,index) => <ListTasksMap tasks={elem} key={props.tasks[index].id} id={index} />)

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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
export default TodoList
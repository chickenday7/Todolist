import React, {MouseEvent, ReactNode, useState} from "react";
import {filterValuesType, TasksType} from "../App";
import ListTasksMap from "./ListTasks/ListTasks";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {ChangeNameForm} from "./AddItemForm/ChangeNameForm";


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
    return (
        <div>
            {changeMod
                ? <ChangeNameForm setChangeMode={setChangeMode} callback={renameTask}/>
                : <h3 onClick={onInputMode}>{props.title}
                    <button onClick={onRemoveTodolist}>X</button>
                </h3>
            }
            <AddItemForm callback={addTask}
            />
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
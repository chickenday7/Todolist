import React, {useEffect} from 'react';
import './AppStyle.module.scss';
import TodoList from "./component/TodoList";
import {AddItemForm} from "./component/AddItemForm/AddItemForm";
import s from './AppStyle.module.scss'
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {
    addTaskAC,
    addTodoAC,
    changeDoneTaskAC,
    changeFilterTodoAC,
    deleteTaskAC,
    removeTodoAC,
    renameTaskAC,
    renameTodoAC,
    setTasksAC,
    setTodoAC,
    StateType
} from "./state/todolist-reducer";


export type filterValuesType = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string,
    title: string,
    filter: filterValuesType
}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

function App(props: AppPropsType) {


    useEffect(() => {
        let prevTasks = localStorage.getItem('tasks')
        let prevTodoList = localStorage.getItem('todolist')
        if (prevTasks) {
            props.setTasks(JSON.parse(prevTasks))
        }
        if (prevTodoList) {
            props.setTodos(JSON.parse(prevTodoList))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(props.tasks))
        localStorage.setItem('todolist', JSON.stringify(props.todo))
    }, [props.tasks, props.todo])


    let AllTodoLists = props.todo.map((item) => {
        let filteredTasks = props.tasks[item.id]
        if (item.filter === 'completed') {
            filteredTasks = filteredTasks.filter((task: TaskType) => task.isDone)
        }
        if (item.filter === 'active') {
            filteredTasks = filteredTasks.filter((task: TaskType) => !task.isDone)
        }


        return <TodoList
            key={item.id}
            todolistID={item.id}
            title={item.title}
            tasks={filteredTasks}
            deleteTasks={props.deleteTask}
            changeFilter={props.changeFilterTodo}
            addTask={props.addTask}
            switchDone={props.changeDoneTask}
            removeTodolist={props.removeTodo}
            renameTodolist={props.renameTodo}
            renameTask={props.renameTask}
        />
    })

    return (
        <div className={s.App}>
            <div className={s.wrapperAddForm}>
                <AddItemForm label={'Todolist'} callback={props.addTodo}/>
            </div>
            <div className={s.wrapperTodolists}>
                {AllTodoLists}
            </div>

        </div>
    );
}

type MapStateToPropsType = {
    todo: TodoListType[],
    tasks: { [key: string]: TaskType[] }
}
const mapStateToProps = (state: StateType): MapStateToPropsType => {
    return {
        todo: state.todo,
        tasks: state.tasks
    }
}

type MapDispatchToPropsType = {
    addTodo: (nameTask: string) => void
    removeTodo: (id: string) => void
    renameTodo: (id: string, newName: string) => void
    deleteTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, taskTitle: string) => void
    renameTask: (todoListID: string, taskID: string, newName: string) => void
    changeDoneTask: (todolistID: string, taskID: string, valueDone: boolean) => void
    changeFilterTodo: (todolistID: string, filter: filterValuesType) => void
    setTasks:(allTasks:{[key:string]:TaskType[]})=>void
    setTodos:(allTodo:TodoListType[])=>void
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addTodo: (nameTask: string) => {
            dispatch(addTodoAC(nameTask))
        },
        removeTodo: (id: string) => {
            dispatch(removeTodoAC(id))
        },
        renameTask: (todoListID, taskID, newName) => {
            dispatch(renameTaskAC(todoListID, taskID, newName))
        },
        deleteTask: (todoListID, taskID) => {
            dispatch(deleteTaskAC(todoListID, taskID))
        },
        addTask: (todoListID, taskTitle) => {
            dispatch(addTaskAC(todoListID, taskTitle))
        },
        renameTodo: (id, newName) => {
            dispatch(renameTodoAC(id, newName))
        },
        changeDoneTask: (todolistId, taskID, valueDone) => {
            dispatch(changeDoneTaskAC(todolistId, taskID, valueDone))
        },
        changeFilterTodo: (todolistID, filter) => {
            dispatch(changeFilterTodoAC(todolistID, filter))
        },
        setTasks:(alltasks)=>{
            dispatch(setTasksAC(alltasks))
        },
        setTodos:(allTodo:TodoListType[])=>{
            dispatch(setTodoAC(allTodo))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(App);

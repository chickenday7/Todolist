import React, {useEffect, useLayoutEffect, useState} from 'react';
import './App.css';
import TodoList from "./component/TodoList";
import {v4 as uuid_v4} from "uuid";
import {AddTodoList} from "./component/AddTodoList/AddTodoList";


export type filterValuesType = 'all' | 'completed' | 'active'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let todolistID1: string = uuid_v4()
    let todolistID2: string = uuid_v4()

    type TodoListType = Array<{ id: string, title: string, filter: filterValuesType }>
    let [todoList, setTodoList] = useState<TodoListType>([
        {id: todolistID1, title: 'What to learn?', filter: 'all'},
        {id: todolistID2, title: 'What to buy?', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
            [todolistID1]: [
                {id: uuid_v4(), title: 'React', isDone: true},
                {id: uuid_v4(), title: 'JS', isDone: false},
                {id: uuid_v4(), title: 'HTML', isDone: true},
                {id: uuid_v4(), title: 'CSS', isDone: true},
            ],
            [todolistID2]: [
                {id: uuid_v4(), title: 'Milk', isDone: true},
                {id: uuid_v4(), title: 'Bread', isDone: false},
                {id: uuid_v4(), title: 'Egg', isDone: true},
                {id: uuid_v4(), title: 'Chocolate', isDone: true},]
        }
    )
    let onSetTasksFromLS = () => {
        let prevTasks = localStorage.getItem('allTasks')
        if (prevTasks){
            setTasks(JSON.parse(prevTasks))
        }
    }

    useEffect(()=>{
        return ()=>{
            localStorage.setItem('todolist',JSON.stringify(todoList))
        }
    },[])
    useEffect(()=>{
        return ()=>{
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    },[])
    useEffect(()=>{
        let prevTodoList = localStorage.getItem('todolist')
        if(prevTodoList){
            setTodoList(JSON.parse(prevTodoList))
        }
    },[])
    useEffect(()=>{
        let prevTasks = localStorage.getItem('tasks')
        if(prevTasks){
            setTasks(JSON.parse(prevTasks))
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks])
    useEffect(()=>{
        localStorage.setItem('todolist',JSON.stringify(todoList))
    },[todoList])



    let removeTodolist = (todolistID: string) => {
        let newArrayTodolists = todoList.filter(item => item.id !== todolistID)
        setTodoList(newArrayTodolists)
        delete tasks[todolistID]
        setTasks({...tasks})

    }
    let deleteTasks = (keyTask: string, taskID: string): void => {
        tasks[keyTask] = tasks[keyTask].filter(task => task.id !== taskID)
        setTasks({...tasks})

    }
    let switchDone = (keyTasks: string, taskID: string, isDone: boolean) => {
        tasks[keyTasks] = tasks[keyTasks].map(task => task.id === taskID ? {...task, isDone} : task)
        setTasks({...tasks})

    }
    let addTask = (text: string, keyTask: string): void => {
        tasks[keyTask] = [...tasks[keyTask], {id: uuid_v4(), title: text, isDone: false}]
        setTasks({...tasks})

    }
    let changeFilter = (filterValue: filterValuesType, todolistID: string) => {
        let newTodoList = todoList.map(item => item.id === todolistID ? {...item, filter: filterValue} : item)
        setTodoList(newTodoList)

    }


    let AllTodoLists = todoList.map((item) => {
        let filteredTasks = tasks[item.id]
        if (item.filter === 'completed') {
            filteredTasks = filteredTasks.filter((task:any) => task.isDone)
        }
        if (item.filter === 'active') {
            filteredTasks = filteredTasks.filter((task:any) => !task.isDone)
        }

        return <TodoList
            key={item.id}
            id={item.id}
            title={item.title}
            tasks={filteredTasks}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            addTasks={addTask}
            switchDone={switchDone}
            removeTodolist={removeTodolist}
        />
    })

    return (
        <div className="App">
            <AddTodoList
                setTasksFromLS = {onSetTasksFromLS}
            />
            {AllTodoLists}
        </div>
    );
}

export default App;

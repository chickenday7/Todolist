import React, {useEffect, useState} from 'react';
import './AppStyle.module.scss';
import TodoList from "./component/TodoList";
import {v4 as uuid_v4} from "uuid";
import {AddItemForm} from "./component/AddItemForm/AddItemForm";
import s from './AppStyle.module.scss'


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

    useEffect(() => {
        let prevTasks = localStorage.getItem('tasks')
        let prevTodoList = localStorage.getItem('todolist')
        if (prevTasks) {
            setTasks(JSON.parse(prevTasks))
        }
        if (prevTodoList) {
            setTodoList(JSON.parse(prevTodoList))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('todolist', JSON.stringify(todoList))
    }, [tasks, todoList])


    let addTodoList = (titleTodoList: string) => {
        let idNewTodo = uuid_v4()
        setTodoList([{id: idNewTodo, title: titleTodoList, filter: 'all'}, ...todoList])
        tasks[idNewTodo] = []
        setTasks({...tasks})
    }
    let removeTodolist = (todolistID: string) => {
        let newArrayTodolists = todoList.filter(item => item.id !== todolistID)
        setTodoList(newArrayTodolists)
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    let renameTodolist = (text: string, keyTodolis: string): void => {
        let newTodolist = todoList.map(item => item.id === keyTodolis ? {...item, title: text} : item)
        setTodoList(newTodolist)
    }
    let deleteTasks = (keyTodolist: string, taskID: string): void => {
        tasks[keyTodolist] = tasks[keyTodolist].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }
    let addTask = (text: string, keyTodolist: string): void => {
        tasks[keyTodolist] = [...tasks[keyTodolist], {id: uuid_v4(), title: text, isDone: false}]
        setTasks({...tasks})
    }
    let renameTask = (todolistID:string,taskID:string,text:string)=>{
        tasks[todolistID] = tasks[todolistID].map(task => task.id === taskID ? {...task,title:text}:task)
        setTasks({...tasks})
    }
    let switchDone = (keyTodolist: string, taskID: string, isDone: boolean) => {
        tasks[keyTodolist] = tasks[keyTodolist].map(task => task.id === taskID ? {...task, isDone} : task)
        setTasks({...tasks})
    }
    let changeFilter = (filterValue: filterValuesType, todolistID: string) => {
        let newTodoList = todoList.map(item => item.id === todolistID ? {...item, filter: filterValue} : item)
        setTodoList(newTodoList)
    }


    let AllTodoLists = todoList.map((item) => {
        let filteredTasks = tasks[item.id]
        if (item.filter === 'completed') {
            filteredTasks = filteredTasks.filter((task: TasksType) => task.isDone)
        }
        if (item.filter === 'active') {
            filteredTasks = filteredTasks.filter((task: TasksType) => !task.isDone)
        }


        return <TodoList
            key={item.id}
            todolistID={item.id}
            title={item.title}
            tasks={filteredTasks}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            addTask={addTask}
            switchDone={switchDone}
            removeTodolist={removeTodolist}
            renameTodolist={renameTodolist}
            renameTask={renameTask}
        />
    })

    return (
        <div className={s.App}>
            <div className={s.wrapperAddForm}>
                <AddItemForm label={'Todolist'} callback={addTodoList}/>
            </div>
            <div className={s.wrapperTodolists}>
                {AllTodoLists}
            </div>

        </div>
    );
}

export default App;

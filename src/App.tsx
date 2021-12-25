import React, {useState} from 'react';
import './App.css';
import TodoList from "./component/TodoList";


export type filterValuesType = 'all' | 'completed' | 'active'

export type TasksType = {
    id:number
    title:string
    isDone:boolean
}
function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id:1,title:'html',isDone:true},
        {id:2,title:'css',isDone:false},
        {id:3,title:'js/ts',isDone:true},
    ])


    let deleteTasks = (id:number):void => {
        let filteredTasks = tasks.filter((task) => {
            return  task.id !== id
        })
        setTasks(filteredTasks)
    }

    let addTask = (text:string):void => {
        setTasks([{id:tasks.length+1,title:text, isDone:false},...tasks])
        setNameTask('')
    }

    let [nameTask, setNameTask] = useState<string>('')
    const addSymbol = (symbol:string) => {
      setNameTask(symbol)
    }



    let [filter, setFilter] = useState<filterValuesType>('all')
    let tasksForTodoList = tasks

    const changeFilter = (filterValue:filterValuesType) => {
        setFilter(filterValue)
    }

    if (filter === 'active'){
        tasksForTodoList = tasks.filter((task) => {
            return !task.isDone
        })
    }
    if (filter === 'completed'){
        tasksForTodoList = tasks.filter((task) => {
            return task.isDone
        })
    }

    return (
        <div className="App">
            <TodoList title={'What to learn ?'}
                      tasks={tasksForTodoList}
                      deleteTasks = {deleteTasks}
                      changeFilter = {changeFilter}
                      nameTask = {nameTask}
                      addSymbolTask = {addSymbol}
                      addTasks = {addTask}



            />
        </div>
    );
}

export default App;

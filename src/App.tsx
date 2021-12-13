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


    let deleteTasks = (id:number) => {
        let filteredTasks = tasks.filter((task) => {
            return  task.id !== id
        })
        setTasks(filteredTasks)
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

            />
        </div>
    );
}

export default App;

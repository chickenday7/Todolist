import React from 'react';
import './App.css';
import TodoList from "./TodoList";

const tasks1 = [
    {id:1,title:'html',isDone:true},
    {id:2,title:'css',isDone:true},
    {id:3,title:'js/ts',isDone:true},
]

const tasks2 = [
    {id:1,title:'AC/DC',isDone:true},
    {id:2,title:'Manowar',isDone:true},
    {id:3,title:'Король и шут',isDone:true},
]

export type TasksType = {
    id:number
    title:string
    isDone:boolean
}

function App() {
    return (
        <div className="App">
            <TodoList title={'What to learn ?'} tasks={tasks1} />
            <TodoList title={'Songs'} tasks={tasks2} />
        </div>
    );
}

export default App;

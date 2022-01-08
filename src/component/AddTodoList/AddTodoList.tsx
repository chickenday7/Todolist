import React from "react";



interface IAddTodoList{
    setTasksFromLS: ()=>void
}
export const AddTodoList = (props:IAddTodoList) => {
    const onSetTasksFromLS = () => {
        props.setTasksFromLS()
    }
    return(
        <div>
            <input placeholder={'add TodoList'}/>
            <button>+</button>
            <button onClick={onSetTasksFromLS}>Set tasks from LS</button>
        </div>
    )
}
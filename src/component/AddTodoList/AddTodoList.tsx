import React from "react";



interface IAddTodoList{
    setTasksFromLS: ()=>void
}
export const AddTodoList = (props:IAddTodoList) => {
    return(
        <div>
            <input placeholder={'add TodoList'}/>
            <button>+</button>
        </div>
    )
}
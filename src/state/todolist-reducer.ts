import {createStore} from "redux";
import {v4 as uuid_v4} from "uuid";
import {filterValuesType} from "../App";

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const RENAME_TODO = 'RENAME_TODO'
const DELETE_TASK = 'DELETE_TASK'
const ADD_TASK = 'ADD_TASK'
const RENAME_TASK = 'RENAME_TASK'
const CHANGE_DONE = 'CHANGE_DONE'
const CHANGE_FILTER = 'CHANGE_FILTER'


let todolistID1 = uuid_v4()
let todolistID2 = uuid_v4()

export type StateType = {
    todo: { id: string, title: string, filter: filterValuesType }[]
    tasks: {
        [key: string]: { id: string, title: string, isDone: boolean }[]
    }
}

const initialState: StateType = {
    todo: [
        {id: todolistID1, title: 'What to learn?', filter: 'all'},
        {id: todolistID2, title: 'What to buy?', filter: 'all'},
    ],
    tasks: {
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
}

type ActionType = AddTodoACType |
    RemoveTodoACType |
    RenameTodoACType |
    DeleteTaskACType |
    AddTaskACType |
    RenameTaskACType |
    ChangeDoneTaskACType |
    ChangeFilterTodoAC

export const todolistReducer = (state = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case ADD_TODO:
            let id = uuid_v4()
            return {
                ...state,
                todo: [{id: id, title: action.nameTask, filter: 'all'}, ...state.todo],
                tasks: {
                    ...state.tasks,
                    [id]: []
                }
            }
        case RENAME_TODO:
            return {
                ...state,
                todo: state.todo.map(elem => elem.id === action.id ? {...elem, title: action.newName} : elem)
            }
        case REMOVE_TODO:
            delete state.tasks[action.id]
            return {
                ...state,
                todo: state.todo.filter(elem => elem.id !== action.id),
                tasks: {...state.tasks}
            }
        case DELETE_TASK:
            state.tasks[action.todoListID] = state.tasks[action.todoListID].filter(el => el.id !== action.taskID)
            return {
                ...state
            }
        case ADD_TASK:
            state.tasks[action.todolistID] = [{
                id: uuid_v4(),
                title: action.taskTitle,
                isDone: false
            }, ...state.tasks[action.todolistID]]
            return {
                ...state
            }
        case RENAME_TASK:
            state.tasks[action.todolistID] = state.tasks[action.todolistID].map(el => el.id === action.taskID ? {...el,title:action.newName} : el)
            return {
                ...state
            }
        case CHANGE_DONE:
            state.tasks[action.todolistID] = state.tasks[action.todolistID].map(el => el.id === action.taskID ? {...el,isDone:!action.valueDone} : el)
            return {
                ...state
            }
        case CHANGE_FILTER:
            return {
                ...state,
                todo: state.todo.map(el => el.id === action.todolistID ? {...el, filter:action.filter}: el)
            }
        default:
            return state

    }
}


type AddTodoACType = { type: typeof ADD_TODO, nameTask: string }
export const addTodoAC = (nameTask: string): AddTodoACType => {
    return {
        type: ADD_TODO,
        nameTask
    }
}

type RemoveTodoACType = { type: typeof REMOVE_TODO, id: string }
export const removeTodoAC = (id: string): RemoveTodoACType => {
    return {
        type: REMOVE_TODO,
        id
    }
}

type RenameTodoACType = { type: typeof RENAME_TODO, id: string, newName: string }
export const renameTodoAC = (id: string, newName: string): RenameTodoACType => {
    return {
        type: RENAME_TODO,
        id,
        newName
    }
}
type DeleteTaskACType = { type: typeof DELETE_TASK, todoListID: string, taskID: string }
export const deleteTaskAC = (todoListID: string, taskID: string): DeleteTaskACType => {
    return {
        type: DELETE_TASK,
        todoListID,
        taskID
    }
}
type AddTaskACType = { type: typeof ADD_TASK, todolistID: string, taskTitle: string }
export const addTaskAC = (todolistID: string, taskTitle: string): AddTaskACType => {
    return {
        type: ADD_TASK,
        todolistID,
        taskTitle
    }
}

type RenameTaskACType = { type: typeof RENAME_TASK, todolistID: string, taskID: string, newName: string }
export const renameTaskAC = (todolistID: string, taskID: string, newName: string): RenameTaskACType => {
    return {
        type: RENAME_TASK,
        todolistID,
        taskID,
        newName
    }
}
type ChangeDoneTaskACType = {type: typeof CHANGE_DONE, todolistID:string,taskID:string,valueDone:boolean}
export const changeDoneTaskAC = (todolistID:string,taskID:string,valueDone:boolean):ChangeDoneTaskACType => {
  return{
      type: CHANGE_DONE,
      todolistID,
      taskID,
      valueDone
  }
}
type ChangeFilterTodoAC = {type: typeof CHANGE_FILTER, todolistID:string, filter:filterValuesType}
export const changeFilterTodoAC = (todolistID:string,filter:filterValuesType):ChangeFilterTodoAC => {
  return{
      type: CHANGE_FILTER,
      todolistID,
      filter
  }
}


export let store = createStore(todolistReducer)

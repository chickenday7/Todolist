import {v4 as uuid_v4} from "uuid";
import {
    addTaskAC,
    addTodoAC, changeDoneTaskAC, changeFilterTodoAC,
    deleteTaskAC,
    removeTodoAC, renameTaskAC,
    renameTodoAC,
    StateType,
    todolistReducer
} from "./todolist-reducer";
import {filterValuesType} from "../App";
let todolistID1:string = uuid_v4()
let todolistID2:string = uuid_v4()

test('add todolist', ()=>{
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
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
    let nameTodo:string = 'What to sale?'
    const endState:StateType = todolistReducer(startState,addTodoAC(nameTodo))
    expect(endState.todo.length).toBe(3)
    expect(endState.todo[0].title).toBe(nameTodo)
})

test('remove todolist',()=>{
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
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
    let endState:StateType = todolistReducer(startState,removeTodoAC(todolistID1))
    expect(endState.todo.length).toBe(1)
    expect(endState.tasks[todolistID1]).toBe(undefined)
})

test('rename todolist',()=>{
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
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
    let newName = 'My quests'
    let endState:StateType = todolistReducer(startState,renameTodoAC(todolistID1,newName))
    let mutableElement = endState.todo.find(el => el.id === todolistID1)
    expect(mutableElement!.title).toBe(newName)
})

test('deleteTask',()=>{
    const taskID = uuid_v4()
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
            [todolistID1]: [
                {id: uuid_v4(), title: 'React', isDone: true},
                {id: taskID, title: 'JS', isDone: false},
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
    let endState:StateType = todolistReducer(startState,deleteTaskAC(todolistID1,taskID))
    let mutableElement = endState.tasks[todolistID1].find(el => el.id === taskID)
    expect(mutableElement).toBe(undefined)
    expect(endState.tasks[todolistID1].length).toBe(3)
})

test('add task', ()=>{

    let titleTask = 'Unit tests'
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
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
    let endState:StateType = todolistReducer(startState, addTaskAC(todolistID1,titleTask))
    expect(endState.tasks[todolistID1].length).toBe(5)
    expect(endState.tasks[todolistID1][0].title).toBe(titleTask)
})

test('rename task', ()=>{
    let taskID = uuid_v4()
    let newName = 'Yoooo'
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
            [todolistID1]: [
                {id: taskID, title: 'React', isDone: true},
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
    let endState:StateType = todolistReducer(startState,renameTaskAC(todolistID1,taskID,newName))
    expect(endState.tasks[todolistID1][0].title).toBe(newName)
})

test('switch done', ()=>{
    const taskID = uuid_v4()
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
            [todolistID1]: [
                {id: uuid_v4(), title: 'React', isDone: true},
                {id: taskID, title: 'JS', isDone: false},
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
    let endState = todolistReducer(startState, changeDoneTaskAC(todolistID1,taskID,startState.tasks[todolistID1][1].isDone))
    expect(endState.tasks[todolistID1][1].isDone).toBe(true)
})

test('change filter todo', ()=>{
    let filter:filterValuesType = 'active'
    const startState:StateType = {
        todo:[
            {id: todolistID1, title: 'What to learn?', filter: 'all'},
            {id: todolistID2, title: 'What to buy?', filter: 'all'},
        ],
        tasks:{
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
    let endState = todolistReducer(startState, changeFilterTodoAC(todolistID1, filter as filterValuesType))
    expect(endState.todo[0].filter).toBe(filter)
})
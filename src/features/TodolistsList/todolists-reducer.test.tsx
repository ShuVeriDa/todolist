import {v1} from "uuid";
import {
   addTodolistAC,
   changeTodolistEntityStatusAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   fetchTodolistsTC,
   FilterValuesType,
   removeTodolistAC,
   TodolistDomainType,
   todolistsReducer
} from "./todolists-reducer";
import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistID1: string
let todolistID2: string

let startState: Array<TodolistDomainType>

beforeEach(() => {
   todolistID1 = v1()
   todolistID2 = v1()

   startState = [
      {id: todolistID1, title: 'What did you learn?', filter: 'all', entityStatus:'idle', addedDate: '', order: 0},
      {id: todolistID2, title: 'What did you buy?', filter: 'all', entityStatus:'idle',  addedDate: '', order: 0}
   ]
})

test('correct todolist should be removed', () => {

   const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todolistID1}))

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
   const todolist: TodolistType = {
      title: 'New Todolist',
      id: 'any id',
      addedDate: '',
      order: 0
   }

   const endState = todolistsReducer(startState, addTodolistAC({todolist}))

   expect(endState.length).toBe(3)
   expect(endState[2].title).toBe(todolist.title)
   expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name.', () => {

   const newTodolistTitle = "new Todolist"
   const action = changeTodolistTitleAC({todolistId: todolistID2, title: newTodolistTitle})

   const endState = todolistsReducer(startState, action)

   expect(endState[0].title).toBe("What did you learn?")
   expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

   let newFilter: FilterValuesType = "completed";
   const action = changeTodolistFilterAC({todolistId: todolistID2, filter: newFilter})

   const endState = todolistsReducer(startState, action);

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be added', () => {

   const payload = {todolists: startState};
   const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

   const endState = todolistsReducer(startState, action);

   expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
   const newStatus : RequestStatusType = 'loading'
   const action = changeTodolistEntityStatusAC({todolistId: todolistID2, status: newStatus })

   const endState = todolistsReducer(startState, action);

   expect(endState[0].entityStatus).toBe('idle');
   expect(endState[1].entityStatus).toBe(newStatus);
});



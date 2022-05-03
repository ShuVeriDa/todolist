import {FilterValuesType, TodoListsType} from "../../../App";
import {v1} from "uuid";
import {
   addTodolistAC,
   changeFilterAC,
   removeTodolistAC,
   todolistReducer,
   updateTodolistTitle
} from "./TESTtodolists-reducer";

test('add todolist', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const action = addTodolistAC("What to less")
   const endState = todolistReducer(startState, action)

   expect(endState[2].title).toBe("What to less")
})

test('correct todolist should be removed', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const action = removeTodolistAC(todolistID1)
   const endState = todolistReducer(startState, action)

   expect(endState.length).toBe(1)
})

test('change filter', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newFilter: FilterValuesType = "completed";

   const startState: Array<TodoListsType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = todolistReducer(startState, changeFilterAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
})

test('change title', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const action = updateTodolistTitle(todolistID1, 'End')
   const endState = todolistReducer(startState, action)

   expect(endState[0].title).toBe('End')
   expect(endState[1].title).toBe('What to buy')
})
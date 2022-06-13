import {v1} from "uuid";

import {
   addTodoListAC,
   changeFilterAC,
   changeTodoListTitle,
   removeTodoListAC,
   todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodoListsType} from "../../TodoActual/App";

test('correct todolist should be removed', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const endState = todolistsReducer(startState, removeTodoListAC(todolistID1))

      expect(endState.length).toBe(1)
      expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   let newTodolistTitle = "New Todolist";

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle))

   expect(endState.length).toBe(3)
   expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name.', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const newTodolistTitle = "new Todolist"

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

   const endState = todolistsReducer(startState, changeTodoListTitle(todolistID2, newTodolistTitle))

   expect(endState[0].title).toBe("What to learn")
   expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newFilter: FilterValuesType = "completed";

   const startState: Array<TodoListsType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]


   const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});





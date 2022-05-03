import {v1} from "uuid";
import {TodoListsType} from "../App";
import {removeTodoListAC, todolistsReducer} from "./todolists-reducer";

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
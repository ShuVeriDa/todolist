import {v1} from "uuid";
import {TodoListsType} from "../../../TodoActual/App";

test('add todolist', () => {
   let todolistID1 = v1()
   let todolistID2 = v1()

   const startState: Array<TodoListsType> = [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ]

})
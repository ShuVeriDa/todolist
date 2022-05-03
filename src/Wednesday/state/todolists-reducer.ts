import {FilterValuesType, TodoListsType} from "../../App";
import {v1} from "uuid";

// export type removeTodoListACType = {
//    type: 'REMOVE-TODOLIST',
//    payload: {
//       todolistID: string
//    }
// }
// export type addTodoListACType = {
//    type: "ADD-TODOLIST",
//    payload: {
//       title: string
//    }
// }
// export type changeTodoListTitleACType = {
//    type: 'CHANGE-TODOLIST-TITLE',
//    payload: {
//       id: string,
//       title: string
//    }
// }
// export type changeFilterACACType = {
//    type: 'CHANGE-TODOLIST-FILTER',
//    payload: {
//       id: string,
//       filter: string
//    }
// }

export const todolistsReducer = (state: TodoListsType[], action: todolistsReducersType): TodoListsType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(el => el.id !== action.todolistID)
      case "ADD-TODOLIST":
         let newTodoList: TodoListsType = {id: action.payload.todolistID, title: action.payload.title, filter: "all"}
         return [...state, newTodoList]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
      case "CHANGE-TODOLIST-FILTER":
         return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
      default:
         return state
   }
}

type todolistsReducersType =
   ReturnType<typeof removeTodoListAC> |
   ReturnType<typeof changeTodoListTitle> |
   ReturnType<typeof changeFilterAC> |
   ReturnType<typeof addTodoListAC>

export const removeTodoListAC = (todolistID: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      todolistID,
   } as const
}

export const addTodoListAC = (title: string) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         title,
         todolistID: v1()
      }
   } as const
}

export const changeTodoListTitle = (id: string, title: string) => {
   return {
      type: 'CHANGE-TODOLIST-TITLE',
      payload: {
         id,
         title
      }
   } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      payload: {
         id,
         filter
      },
   } as const
}
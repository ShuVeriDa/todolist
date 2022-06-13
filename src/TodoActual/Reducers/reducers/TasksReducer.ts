import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TasksReducer = (state: TaskType[], action: TasksReducerType) => {
   switch (action.type) {
      case 'REMOVE-TASK':
         return state.filter(el => el.id !== action.payload.id)
      case "ADD-TASK":
         let task = { id: v1(), title: action.payload.title, isDone: false };
         return [task, ...state]
      default: return state
   }

}

type TasksReducerType = removeTaskACType | AddTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
   return {
      type: 'REMOVE-TASK',
      payload: {
         id: id
      }
   } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
   return {
      type: 'ADD-TASK',
      payload: {
         title: title
      }
   } as const
}
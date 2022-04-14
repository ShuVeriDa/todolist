import {TuesdayTodoList} from "./TuesdayTodoList";
import {useState} from "react";
import {v1} from "uuid";
import classes from './Tuesday.module.css'
import {TuesdayAddItemForm} from "./TuesdayAddItemForm";

export type TuesdayTaskType = {
   id: string
   name: string
   isDone: boolean
}

export type TuesdayTodoListType = {
   id: string
   title: string
   filter: TuesdayFilterValueType
}

export type TuesdayTaskObjectType = {
   [key: string]: TuesdayTaskType[]
}

export type TuesdayFilterValueType = "all" | "active" | "completed"

export const Tuesday = () => {
   const todoList1ID = v1()
   const todoList2ID = v1()

   const [todoLists, setTodoLists] = useState<TuesdayTodoListType[]>([
      {id: todoList1ID, title: 'What to learn', filter: 'all'},
      {id: todoList2ID, title: 'What to shop', filter: 'all'}
   ])

   const [tasks, setTasks] = useState<TuesdayTaskObjectType>({
      [todoList1ID]: [
         {id: v1(), name: "HTML/CSS", isDone: true},
         {id: v1(), name: "JS/ES6", isDone: false},
         {id: v1(), name: "REACT", isDone: true},
      ],
      [todoList2ID]: [
         {id: v1(), name: 'Apple', isDone: true},
         {id: v1(), name: 'Tomato', isDone: true},
         {id: v1(), name: 'Juice', isDone: false},
      ]
   })

   const removeTasks = (todoListID: string, taskID: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
   }

   const addTask = (todoListID: string, title: string) => {
      const newTask: TuesdayTaskType = {id: v1(), name: title, isDone: false}
      setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
   }


   const changeFilter = (todoListID: string, filter: TuesdayFilterValueType) => {
      setTodoLists(todoLists.map(f => f.id === todoListID ? {...f, filter: filter}: f))
   }

   const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
   }

   const addTodoListHandler = (newTitle: string) => {
      const newID = v1()
      const newTodoList: TuesdayTodoListType = {id: newID, title: newTitle, filter: 'all'}
      setTodoLists([newTodoList, ...todoLists])
      setTasks({...tasks, [newID]: []})
   }

   const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, name: newTitle} : el)})
   }

   const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(tdl => tdl.id !== todoListID))
      delete tasks[todoListID]
   }

   return (
      <div>
         <TuesdayAddItemForm callBack={addTodoListHandler} />
         {
            todoLists.map(tdl => {
               let tasksForTodoList
               switch (tdl.filter) {
                  case 'active':
                     tasksForTodoList = tasks[tdl.id].filter(f => !f.isDone)
                     break
                  case "completed":
                     tasksForTodoList = tasks[tdl.id].filter(f => f.isDone)
                     break
                  default:
                     tasksForTodoList = tasks[tdl.id]
               }
               return (
                  <TuesdayTodoList key={tdl.id}
                                   todoListID={tdl.id}
                                   TasksHeaderTitle={tdl.title}
                                   tasks={tasksForTodoList}
                                   removeTasks={removeTasks}
                                   addTask={addTask}
                                   changeFilter={changeFilter}
                                   changeTaskStatus={changeStatus}
                                   filter={tdl.filter}
                                   updateTask={updateTask}
                                   removeTodoList={removeTodoList}
                  />
               )
            })
         }

      </div>
   );
};
import {WednesdayTodoList} from "./WednesdayTodoList";
import {useState} from "react";
import {v1} from "uuid";
import classes from './Wednesday.module.css'
import {WednesdayAddItemForm} from "./WednesdayAddItemForm";

export type WednesdayTaskType = {
   id: string
   name: string
   isDone: boolean
}

export type WednesdayTodoListType = {
   id: string
   title: string
   filter: WednesdayFilterValueType
}

export type WednesdayTaskObjectType = {
   [key: string]: WednesdayTaskType[]
}

export type WednesdayFilterValueType = "all" | "active" | "completed"

export const Wednesday = () => {
   const todoList1ID = v1()
   const todoList2ID = v1()

   const [todoLists, setTodoLists] = useState<WednesdayTodoListType[]>([
      {id: todoList1ID, title: 'What to learn', filter: 'all'},
      {id: todoList2ID, title: 'What to shop', filter: 'all'}
   ])

   const [tasks, setTasks] = useState<WednesdayTaskObjectType>({
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

   //Todolist
   const addTodoListHandler = (newTitle: string) => {
      const newID = v1()
      const newTodoList: WednesdayTodoListType = {id: newID, title: newTitle, filter: 'all'}
      setTodoLists([newTodoList, ...todoLists])
      setTasks({...tasks, [newID]: []})
   }

   const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(tdl => tdl.id !== todoListID))
      delete tasks[todoListID]
   }

   const changeFilter = (todoListID: string, filter: WednesdayFilterValueType) => {
      setTodoLists(todoLists.map(f => f.id === todoListID ? {...f, filter: filter}: f))
   }

   const updateTodoListTitle = (todoListID: string, newTitle: string) => {
      setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
   }

   //addTask
   const addTask = (todoListID: string, title: string) => {
      const newTask: WednesdayTaskType = {id: v1(), name: title, isDone: false}
      setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
   }

   const removeTasks = (todoListID: string, taskID: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
   }

   const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
   }

   const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, name: newTitle} : el)})
   }

   return (
      <div>
         <WednesdayAddItemForm callBack={addTodoListHandler} />
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
                  <WednesdayTodoList key={tdl.id}
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
                                   updateTodoListTitle={updateTodoListTitle}
                  />
               )
            })
         }

      </div>
   );
};
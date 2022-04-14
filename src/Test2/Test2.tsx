import {v1} from "uuid";
import {TestTodoList2} from "./TestTodoList2";
import {useState} from "react";
import classes from './Test2.module.css'
import {TestType} from "../Monday/Test";
import {TuesdayTaskObjectType, TuesdayTodoListType} from "../Tuesday/Tuesday";
import {Test2AddItemForm} from "./Test2AddItemForm";

export type Test2TaskType = {
   id: string
   name: string
   isDone: boolean
}

export type TodoListsTaskType = {
   id: string
   title: string
   filter: Test2FilterValuesType
}

export type Test2TaskObjectType = {
   [key: string]: Test2TaskType[]
}

export type Test2FilterValuesType = "all" | "active" | "completed"

export const Test2 = () => {
   const TasksHeaderTitle: string = "What to learn: Monday"

   const todoList1ID = v1()
   const todoList2ID = v1()

   const [todoLists, setTodoLists] = useState<TodoListsTaskType[]>([
      {id: todoList1ID, title: 'What to learn', filter: 'all'},
      {id: todoList2ID, title: 'What to shop', filter: 'all'}
   ])

   const [tasks, setTasks] = useState<Test2TaskObjectType>({
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
   const removeTasks = (todoListsID: string, taskID: string) => {
      setTasks({...tasks, [todoListsID]: tasks[todoListsID].filter(t => t.id !==taskID)})
   }

   const addTask = (todoListsID: string, title: string) => {
      const newTask = {id: v1(), name: title, isDone: false}
      setTasks({...tasks, [todoListsID]: [newTask, ...tasks[todoListsID]]})

   }

   const changeFilter = (todoListsID: string, filter: Test2FilterValuesType) => {
      setTodoLists(todoLists.map(tdl => tdl.id === todoListsID ? {...tdl, filter}: tdl))
   }

   const changeStatus = (todoListsID: string, taskid: string, isDone: boolean) => {
      setTasks({...tasks, [todoListsID]: tasks[todoListsID].map(ch => ch.id === taskid ? {...ch, isDone}: ch)})
   }

   const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(tdl => tdl.id !== todoListID))
      delete tasks[todoListID]
   }

   const addTodoList = (newTitle: string) => {
      const newID = v1()
      const newTodoList: TodoListsTaskType = {id: newID, title: newTitle, filter: 'all'}
      setTodoLists([newTodoList, ...todoLists])
      setTasks({...tasks, [newID]: []})
   }

   const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, name: newTitle} : el)})
   }

   return (
      <div>
         <Test2AddItemForm callBack={addTodoList}/>
         {
            todoLists.map(tdl => {
               let tasksForTodoList
               switch (tdl.filter) {
                  case 'active':
                     tasksForTodoList = tasks[tdl.id].filter(f => !f.isDone)
                     break
                  case 'completed':
                     tasksForTodoList = tasks[tdl.id].filter(f => f.isDone)
                     break
                  default:
                     tasksForTodoList = tasks[tdl.id]
               }
               return (
                  <TestTodoList2 key={tdl.id}
                                 todoListID={tdl.id}
                                 Tasks2HeaderTitle={tdl.title}
                                 tasks={tasksForTodoList}
                                 removeTasks={removeTasks}
                                 addTask={addTask}
                                 changeFilter={changeFilter}
                                 filter={tdl.filter}
                                 changeStatus={changeStatus}
                                 removeTodoList={removeTodoList}
                                 updateTask={updateTask}
                  />
               )
            })
         }
      </div>
   );
};
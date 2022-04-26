import {useState} from "react";
import {v1} from "uuid";
import {TestTodolist2} from "./TestTodoList2";
import {Test2AddItemForm} from "./Test2AddItemForm";

export type Test2TodoListType = {
   id: string
   title: string
   filter: Test2FilterValuesType
}

export type Test2TaskType = {
   id: string
   name: string
   isDone: boolean
}

export type Test2TaskObjectType = {
   [key: string]: Test2TaskType[]
}

export type Test2FilterValuesType = 'all' | 'active' | 'completed'

export const Test2 = () => {

   const todoList1ID = v1()
   const todoList2ID = v1()

   const [todoLists, setTodoLists] = useState<Test2TodoListType[]>([
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

   //Todolist
   const addTodoList = (newTitle: string) => {
      const newID = v1()
      const newTodoList: Test2TodoListType = {id: newID, title: newTitle, filter: 'all'}
      setTodoLists([...todoLists, newTodoList])
      setTasks({...tasks, [newID]: []})
   }

   const removeTodolist = (todolistID: string) => {
      setTodoLists(todoLists.filter(tdl => tdl.id !== todolistID))
   }

   const updateTodolistTitle = (todolistID: string, newTitle: string) => {
      setTodoLists(todoLists.map(tdl => tdl.id === todolistID ? {...tdl, title: newTitle}: tdl))
   }

   //Task
   const removeTask = (todolistID: string, taskID: string) => {
      setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== taskID)})
   }
   const addTask = (todolistID: string, newTitle: string) => {
      const newTasks: Test2TaskType = {id: v1(), name: newTitle, isDone: false }
      setTasks({...tasks, [todolistID]: [newTasks, ...tasks[todolistID]]})
   }

   const changeFilter = (todolistID:string, filter: Test2FilterValuesType) => {
      setTodoLists(todoLists.map(t => t.id === todolistID ? {...t, filter}: t))
   }

   const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone}: t )})
   }

   const updateTaskHandler = (todoListID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, name: newTitle} : t)})
   }

   return (
      <div>
         <Test2AddItemForm callBack={addTodoList}/>
         {
            todoLists.map(tdl => {
               let test2TasksForTodolists
               switch (tdl.filter) {
                  case "active":
                     test2TasksForTodolists = tasks[tdl.id].filter(t => !t.isDone)
                     break
                  case "completed":
                     test2TasksForTodolists = tasks[tdl.id].filter(t => t.isDone)
                     break
                  default:
                     test2TasksForTodolists = tasks[tdl.id]
               }
               return (
                  <TestTodolist2 key={tdl.id}
                                 todoListID={tdl.id}
                                 tasks={test2TasksForTodolists}
                                 filter={tdl.filter}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeFilter={changeFilter}
                                 changeStatus={changeStatus}
                                 addTodoList={addTodoList}
                                 todolistTitle={tdl.title}
                                 removeTodolist={removeTodolist}
                                 updateTaskHandler={updateTaskHandler}
                                 updateTodolistTitle={updateTodolistTitle}
                  />
               )
            })
         }
      </div>
   );
};
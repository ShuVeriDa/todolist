import {TestTodoList} from "./TestTodoList";
import {useState} from "react";
import { v1 } from "uuid";
import classes from './Test.module.css'

export type TestType = {
   id: string
   name: string
   isDone: boolean
}

export type TestFilterValueType = "all" | "active" | "completed"

export const Test = () => {
   const TasksHeaderTitle: string = "What to learn: Monday"
   const [filter, setFilter] = useState<TestFilterValueType>("all")
   const [tasks, setTasks] = useState<Array<TestType>>([
      {id: v1(), name: "HTML/CSS", isDone: true},
      {id: v1(), name: "JS/ES6", isDone: false},
      {id: v1(), name: "REACT", isDone: true},
   ])

   const removeTasks = (id: string) => {
      const filteredTasks = tasks.filter(t => t.id !== id)
      setTasks(filteredTasks)
   }

   const addTask = (title: string) => {
      const newTask = {id: v1(), name: title, isDone: false}
      setTasks([newTask, ...tasks])
   }

   let tasksForTodoList
   switch (filter) {
      case 'active':
         tasksForTodoList = tasks.filter(f => !f.isDone)
         break
      case "completed":
         tasksForTodoList = tasks.filter(f => f.isDone)
         break
      default:
         tasksForTodoList = tasks
   }

   const changeFilter = (filter: TestFilterValueType) => {
      setFilter(filter)
   }

   const changeStatus = (id: string, isDone: boolean) => {
      setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
   }


   return (
      <div>
         <TestTodoList
            TasksHeaderTitle={TasksHeaderTitle}
            tasks={tasksForTodoList}
            removeTasks={removeTasks}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            filter={filter}
         />
      </div>
   );
};
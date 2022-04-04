import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {Test} from "./Monday/Test";
import {Test2} from "./Test2/Test2";
import {Posts} from "./Posts/Posts";
import Microtask from "./MicroTask/Microtask";

export type TaskType = {
   id: string
   title: string
   isDone: boolean //выполнено ли
}
export type TodoListsType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"
export type taskObjectType = {
   [key: string]: Array<TaskType>
}

function App() {
   //С - create
   //R - read !!!!!!
   //U - update
   //D - delete
   let todoListID1 = v1();
   let todoListID2 = v1();

   let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
      {id: todoListID1, title: 'What to learn', filter: 'all'},
      {id: todoListID2, title: 'What to buy', filter: 'all'},
   ])

   let [tasks, setTasks] = useState<taskObjectType>({
      [todoListID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todoListID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });

   const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(el => el.id !== todoListID))
      delete tasks[todoListID]
   }

   const removeTask = (todoListID: string, taskID: string) => {
      // const filteredTasks = tasks.filter(t => t.id !== id) //возвращает каждый таск с id, который не равен id из removeTasks
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
   }

   const addTask = (todoListID: string, title: string) => {
      const newTask: TaskType = {id: v1(), title: title, isDone: false}
      setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
   }

   const changeFilter = (todoListID: string, filter: FilterValuesType) => {
      setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
   }

   const changeStatus = (todoListID: string, taskID: string, isDoneValue: boolean) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: isDoneValue} : el)})
   }


   return (
      <div className="App">
         {todoLists.map((el) => {

            let tasksForTodoList = tasks[el.id]
            switch (el.filter) {
               case "active":
                  tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                  break
               case "completed":
                  tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                  break
               default:
                  tasksForTodoList = tasks[el.id]
            }
            // tasksForTodoList = el.filter === "active" ? tasks.filter(t => !t.isDone) : el.filter === "completed" ? tasks.filter(t => t.isDone) : tasks;


            return (
               <TodoList
                  key={el.id}
                  todoListID={el.id}
                  title={el.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                  changeStatus={changeStatus}
                  filter={el.filter}
                  removeTodoList={removeTodoList}
               />
            )
         })}

         <Microtask />

         {/*<Test />*/}
         {/*<Test2 />*/}
         {/*<Posts />*/}
      </div>
   );
}

export default App;
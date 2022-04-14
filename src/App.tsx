import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import AppReducers from "./Reducers/AppReducers";
import {Test2} from "./Test2/Test2";

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
         {id: v1(), title: "Milk", isDone: true},
         {id: v1(), title: "Solt", isDone: false},
      ]
   });

   const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(el => el.id !== todoListID))
      delete tasks[todoListID]
   }

   const removeTask = (todoListID: string, taskID: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
   }

   const addTask = (todoListID: string, title: string) => {
      const newTask: TaskType = {id: v1(), title: title, isDone: false}
      setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
   }

   const addTodoList = (title: string) => {
      let newId = v1()
      setTodoLists([{id: newId, title: title, filter: 'all'}, ...todoLists])
      setTasks({...tasks, [newId]: []})
   }

   const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
   }

   const updateTodoListTitle = (todoListID: string, newTitle: string) => {
      setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
   }

   const changeFilter = (todoListID: string, filter: FilterValuesType) => {
      setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
   }

   const changeStatus = (todoListID: string, taskID: string, isDoneValue: boolean) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: isDoneValue} : el)
      })
   }


   return (
      <div className="App">
         <ButtonAppBar/>

         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm callBack={addTodoList}/>
            </Grid>

            <Grid container spacing={3}>

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


                  return (<Grid item>
                        {/*<Paper style={{padding: '10px'}}>*/}
                        {/*   <TodoList*/}
                        {/*      key={el.id}*/}
                        {/*      todoListID={el.id}*/}
                        {/*      title={el.title}*/}
                        {/*      tasks={tasksForTodoList}*/}
                        {/*      removeTask={removeTask}*/}
                        {/*      addTask={addTask}*/}
                        {/*      changeFilter={changeFilter}*/}
                        {/*      changeStatus={changeStatus}*/}
                        {/*      filter={el.filter}*/}
                        {/*      removeTodoList={removeTodoList}*/}
                        {/*      updateTask={updateTask}*/}
                        {/*      updateTodoListTitle={updateTodoListTitle}*/}
                        {/*   />*/}
                        {/*</Paper>*/}
                     </Grid>
                  )

               })}

               {/*<AppReducers />*/}
               <Test2 />
            </Grid>

         </Container>
      </div>
   );
}

export default App;
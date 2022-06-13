import React, {useReducer} from 'react';
import './App.css';
// import TodoList from "./components/TodoList";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import {Container, Grid, Paper} from "@mui/material";
// import ButtonAppBar from "./components/ButtonAppBar";
// import {
//    addTodolistAC,
//
//    todolistsReducer
// } from "./state/todolists-reducer";
// import {
//    addTaskAC,
//    changeTaskStatusAC,
//    removeTaskAC,
//    tasksReducer,
//
// } from "./state/tasks-reducers";
//
// export type TaskType = {
//    id: string
//    title: string
//    isDone: boolean //выполнено ли
// }
//
// export type TodoListsType = {
//    id: string
//    title: string
//    filter: FilterValuesType
// }
// export type FilterValuesType = "all" | "active" | "completed"
//
// export type taskObjectType = {
//    [key: string]: Array<TaskType>
// }


// function AppWithReducer() {
//    //С - create
//    //R - read !!!!!!
//    //U - update
//    //D - delete
//    let todoListID1 = v1();
//    let todoListID2 = v1();
//
//    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
//       {id: todoListID1, title: 'What to learn', filter: 'all'},
//       {id: todoListID2, title: 'What to buy', filter: 'all'},
//    ])
//
//    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
//       [todoListID1]: [
//          {id: v1(), title: "HTML&CSS", isDone: true},
//          {id: v1(), title: "JS", isDone: true},
//          {id: v1(), title: "ReactJS", isDone: false},
//          {id: v1(), title: "Rest API", isDone: false},
//       ],
//       [todoListID2]: [
//          {id: v1(), title: "Milk", isDone: true},
//          {id: v1(), title: "Solt", isDone: false},
//          {id: v1(), title: "Tea", isDone: false},
//       ]
//    });
//
//    //todolists
//    const removeTodoList = (todoListID: string) => {
//       let action = removeTodoListAC(todoListID)
//       dispatchToTodoLists(action)
//       dispatchToTasks(action)
//    }
//
//    const addTodoList = (title: string) => {
//       let action = addTodolistAC(title)
//       dispatchToTodoLists(action)
//       dispatchToTasks(action)
//    }
//
//    const updateTodoListTitle = (todoListID: string, newTitle: string) => {
//       dispatchToTodoLists(changeTodoListTitle(todoListID, newTitle))
//    }
//
//    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
//       dispatchToTodoLists(changeFilterAC(todoListID, filter))
//    }
//
//    //tasks
//    const removeTask = (todoListID: string, taskID: string) => {
//       dispatchToTasks(removeTaskAC(todoListID, taskID))
//    }
//
//    const addTask = (todoListID: string, title: string) => {
//       dispatchToTasks(addTaskAC(todoListID, title))
//    }
//
//    const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
//       dispatchToTasks(updateTaskTitleAC(todoListID, taskID, newTitle))
//    }
//
//    const changeStatus = (todoListID: string, taskID: string, isDoneValue: boolean) => {
//       dispatchToTasks(changeTaskStatusAC(todoListID, taskID, isDoneValue))
//    }
//
//    return (
//       <div className="App">
//          <ButtonAppBar/>
//
//          <Container fixed>
//             <Grid container style={{padding: '20px'}}>
//                <AddItemForm callBack={addTodoList}/>
//             </Grid>
//
//             <Grid container spacing={3}>
//
//                {todoLists.map((el) => {
//
//                   let tasksForTodoList = tasks[el.id]
//                   switch (el.filter) {
//                      case "active":
//                         tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
//                         break
//                      case "completed":
//                         tasksForTodoList = tasks[el.id].filter(t => t.isDone)
//                         break
//                      default:
//                         tasksForTodoList = tasks[el.id]
//                   }
//                   // tasksForTodoList = el.filter === "active" ? tasks.filter(t => !t.isDone) : el.filter === "completed" ? tasks.filter(t => t.isDone) : tasks;
//
//
//                   return (<Grid item>
//                         <Paper style={{padding: '10px'}}>
//                            <TodoList
//                               key={el.id}
//                               todoListID={el.id}
//                               title={el.title}
//                               tasks={tasksForTodoList}
//                               removeTask={removeTask}
//                               addTask={addTask}
//                               changeFilter={changeFilter}
//                               changeStatus={changeStatus}
//                               filter={el.filter}
//                               removeTodoList={removeTodoList}
//                               updateTask={updateTask}
//                               updateTodoListTitle={updateTodoListTitle}
//                            />
//                         </Paper>
//                      </Grid>
//                   )
//
//                })}
//
//                {/*<AppReducers />*/}
//                {/*<Test2 />*/}
//                {/*<Tuesday />*/}
//                {/*<Wednesday />*/}
//             </Grid>
//
//          </Container>
//       </div>
//    );
// }

// export default AppWithReducer;
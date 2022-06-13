import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Test2AddItemForm} from "./Test2AddItemForm";
import {useCallback} from "react";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasksReducer";
import {TestTodolist2} from "./TestTodoList2";

export type Test2TodoListType = {
   id: string
   title: string
   filter: Test2FilterValuesType
}

export type Test2TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type Test2TaskObjectType = {
   [key: string]: Test2TaskType[]
}

export type Test2FilterValuesType = 'all' | 'active' | 'completed'

export const Test2 = () => {
   const todolists = useSelector<AppRootStateType, Test2TodoListType[]>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, Test2TaskObjectType>(state => state.tasks)
   const dispatch = useDispatch()

   //Todolist
   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistAC(title))
   }, [dispatch])

   const removeTodolist = useCallback((todolistID: string) => {
      dispatch(removeTodolistAC(todolistID))
   }, [dispatch])

   const changeFilter = useCallback((todolistID: string, filter: Test2FilterValuesType) => {
      dispatch(changeFilterAC(todolistID, filter))
   }, [dispatch])

   const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistID, newTitle))
   }, [dispatch])


   //Task
   const addTask = useCallback((todolistID: string, title: string) => {
      dispatch(addTaskAC(todolistID, title))
   }, [dispatch])

   const removeTask = useCallback((todolistID: string, taskID: string) => {
      dispatch(removeTaskAC(todolistID, taskID))
   }, [dispatch])

   const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDoneValue: boolean) => {
      dispatch(changeTaskStatusAC(todolistID, taskID, isDoneValue))
   }, [dispatch])

   const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
   }, [dispatch])

   return (
      <div>
         <Test2AddItemForm callBack={addTodolist}/>
         {todolists.map(tdl => {
            let allTodolistTasks = tasks[tdl.id]
            let tasksForTodolist = allTodolistTasks
            return (
               <div key={tdl.id}>
                  <TestTodolist2 key={tdl.id}
                                 todolistID={tdl.id}
                                 title={tdl.title}
                                 tasks={tasksForTodolist}
                                 addTask={addTask}
                                 filter={tdl.filter}
                                 removeTodolist={removeTodolist}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeFilter={changeFilter}
                                 changeTodolistTitle={changeTodolistTitle}
                                 changeTaskTitle={changeTaskTitle}
                  />

               </div>
            )
         })}
      </div>
   );
};
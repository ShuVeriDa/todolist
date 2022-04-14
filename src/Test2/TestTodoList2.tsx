import {Test2FilterValuesType, Test2TaskType} from "./Test2";
import {TestTodoListHeader2} from "./TestTodoListHeader2";
import {FC, useState} from "react";
import {TestInput2} from "./TestInput2";
import {TestButton2} from "./TestButton2";
import {TestTaskList2} from "./TestTaskList2";
import classes from './Test2.module.css'
import {Test2AddItemForm} from "./Test2AddItemForm";
import {FilterValuesType} from "../App";
import todoList from "../components/TodoList";

export type TestTodoList2PropsType = {
   todoListID: string
   Tasks2HeaderTitle: string
   tasks: Array<Test2TaskType>
   removeTasks: (todoListsID: string, taskID: string) => void
   addTask: (todoListsID: string, newTitle: string) => void
   changeFilter: (todoListsID: string, filter: Test2FilterValuesType) => void
   filter: Test2FilterValuesType
   changeStatus: (todoListID: string, tasksID: string, isDone: boolean) => void
   removeTodoList: (todoListID: string) => void
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
}

export const TestTodoList2: FC<TestTodoList2PropsType> = ({Tasks2HeaderTitle, tasks, removeTasks, addTask, ...props}) => {
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const newTask = () => {
      if (title.trim() !== "") {
         addTask(props.todoListID, title.trim())
         setTitle("")
      } else {
         setError('Title is required')
      }
   }

   const changeFilterHandler = (filterValues: FilterValuesType) => {
      props.changeFilter(props.todoListID, filterValues)
   }



   return (
      <div>
         <TestTodoListHeader2 todoListID={props.todoListID} title={Tasks2HeaderTitle} callBack={props.removeTodoList} />
         <TestInput2 titleNew={title} callBack={newTask} setTitleNew={setTitle} error={error} setError={setError} />
         <TestButton2 title={'+'} callBack={newTask}/>
         {error && <div className={classes.error_message}>{error}</div>}
         <>
            <TestTaskList2 tasks={tasks}
                           removeTasks={removeTasks}
                           changeStatus={props.changeStatus}
                           todoListID={props.todoListID}
                           updateTask={props.updateTask}
            />
         </>
         <div className={classes.btns}>
            <TestButton2 classBtn={props.filter === 'all' ? classes.btnActive : ''} callBack={() =>changeFilterHandler('all')} title={'All'}/>
            <TestButton2 classBtn={props.filter === 'active' ? classes.btnActive : ''} callBack={() =>changeFilterHandler('active')} title={"Active"}/>
            <TestButton2 classBtn={props.filter === 'completed' ? classes.btnActive : ''} callBack={() =>changeFilterHandler('completed')} title={'Completed'}/>
         </div>
      </div>
   )
}
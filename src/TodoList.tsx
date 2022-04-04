import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import TasksList from "./TasksList";

type TodoListPropsType = {
   todoListID: string
   title: string
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   addTask: (todoListID: string, title: string) => void
   changeFilter: (todoListID: string, filter: FilterValuesType) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   filter: FilterValuesType
   removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const addNewTask = () => {
      if (title.trim() !== '') {
         props.addTask(props.todoListID, title.trim())
         setTitle('')
      } else {
         setError('Error is required')
      }
   }

   return (
      <div>
         <TodoListHeader removeTodoList={props.removeTodoList} todoListID={props.todoListID} title={props.title}/>
         <div>
            <input
               className={error ? 'error' : ''}
               value={title}
               onChange={(e) => {
                  setTitle(e.currentTarget.value)
                  setError('')
               }}
               onKeyPress={(e) => {
                  if (e.key === "Enter") {
                     addNewTask()
                  }
               }}
            />
            <Button title={"+"} onClickHandler={addNewTask}/>
            {error && <div className='error_message'>Title is required!</div>}
         </div>
         <TasksList tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    todoListID={props.todoListID}
         />
         <div>
            <Button btnClass={props.filter === "all" ? "btn_active" : ""}
                    onClickHandler={() => props.changeFilter(props.todoListID,"all")}
                    title={"All"}
            />
            <Button btnClass={props.filter === "active" ? "btn_active" : ""}
                    onClickHandler={() => props.changeFilter(props.todoListID,"active")}
                    title={"Active"}
            />
            <Button btnClass={props.filter === "completed" ? "btn_active" : ""}
                    onClickHandler={() => props.changeFilter(props.todoListID,"completed")}
                    title={"Completed"}
            />
         </div>
      </div>
   );
};

export default TodoList;

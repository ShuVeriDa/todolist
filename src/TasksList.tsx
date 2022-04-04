import React, {FC} from 'react';
import {TaskType} from "./App";
import Button from "./Button";
import todoList from "./TodoList";

type TaskListPropsType = {
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   todoListID: string
}

const TasksList: FC<TaskListPropsType> = ({tasks, removeTask, ...props}) => {

   //const {task, names} = props
   //const name = props.name
   //const tasks = props.tasks

   const tasksJSXElements = tasks.map((t) => {
      const onClickRemoveTask = () => removeTask(props.todoListID, t.id)
      return (
         <li key={t.id} className={t.isDone ? "isDone" : ''}>
            <input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>
            <span>{t.title}</span>
            <Button title={'x'} onClickHandler={onClickRemoveTask}/>
         </li>
      )
   })

   return (
      <ul>
         {tasksJSXElements}
      </ul>
   );
};

export default TasksList;

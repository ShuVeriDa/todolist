import React, {useEffect} from 'react';
import {Task} from "../TodolistsList/Todolist/Task/Task";
import {FilterValuesType} from "../TodolistsList/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/types";
import {useActions} from "../../utils/redux-utils";
import {tasksActions} from "../TodolistsList";

type TaskListPropsType = {
   tasks: TaskType[]
   todoListID: string
   filter: FilterValuesType
   demo?: boolean
}

const TasksList = React.memo(({demo = false, tasks, todoListID, ...props}: TaskListPropsType) => {
   const {fetchTasksTC} = useActions(tasksActions)

   useEffect(() => {
      if (demo) {
         return
      }
      if (!tasks.length) {
         fetchTasksTC(todoListID)
      }
   }, [])


   let tasksForTodolist = tasks

   if (props.filter === 'active') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
   }
   if (props.filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
   }
   return (
      <div>
         {
            tasksForTodolist.map(t => {
               return (
                  <Task key={t.id} task={t} todoListID={todoListID}/>
               )
            })
         }
         {!tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
      </div>
   );
});

export default TasksList;

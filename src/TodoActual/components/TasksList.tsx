import React, {FC, useCallback} from 'react';
import {TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {UniversalCheckBox} from "./UniversalCheckBox";
import {FilterValuesType} from "../AppWithRedux";
import {Task} from "./Task";

type TaskListPropsType = {
   tasks: Array<TaskType>
   removeTask: (todoListID: string, id: string) => void
   changeStatus: (todoListID: string, id: string, isDone: boolean) => void
   todoListID: string
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   filter: FilterValuesType
}

const TasksList: FC<TaskListPropsType> = React.memo(({tasks, removeTask, ...props}) => {
   let tasksForTodoList = tasks

   if (props.filter === 'active') {
      tasksForTodoList = tasks.filter(t => !t.isDone)
   }
   if (props.filter === 'completed') {
      tasksForTodoList = tasks.filter(t => t.isDone)
   }

   return (
      <div>
         {
            tasksForTodoList.map(t => {
               return (
                  <Task key={t.id}
                        task={t}
                        updateTask={props.updateTask}
                        changeStatus={props.changeStatus}
                        todoListID={props.todoListID}
                        filter={props.filter}
                        removeTask={removeTask}
                  />
               )
            })
         }
      </div>
   );
});

export default TasksList;

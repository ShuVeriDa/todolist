import React, {ChangeEvent, FC, useCallback} from "react";
import {UniversalCheckBox} from "./UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType} from "../state/todolists-reducer";

type PropsType = {
   task: TaskType
   removeTask: (todoListID: string, id: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
   todoListID: string
   changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
   filter: FilterValuesType
}

export const Task: FC<PropsType> = React.memo(({task, removeTask, ...props}) => {

   const changeTaskTitleHandler = useCallback((taskID: string, newTitle: string) => {
      props.changeTaskTitle(props.todoListID, taskID, newTitle)
   }, [props.todoListID, props.changeTaskTitle, task.title])

   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(props.todoListID, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
   }, [props.todoListID, task.id]);

   const onClickRemoveTask = useCallback(() => removeTask(props.todoListID, task.id), [task.id, props.todoListID])

   return (
      <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
         {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         {/*<Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         <UniversalCheckBox callBack={() => onChangeHandler}
                            checked={task.status === TaskStatuses.Completed}
         />
         <EditableSpan title={task.title}
                       callBack={(newTitle: string) => changeTaskTitleHandler(task.id, newTitle)}

         />
         {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

         <IconButton aria-label="delete" onClick={onClickRemoveTask}>
            <DeleteIcon />
         </IconButton>
      </div>
   )
})
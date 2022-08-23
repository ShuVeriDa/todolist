import React, {ChangeEvent, FC, useCallback} from "react";
import {UniversalCheckBox} from "../../../../components/UniversalCheckBox/UniversalCheckBox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/types";
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";

type TaskPropsType = {
   task: TaskType
   todolistId: string
}

export const Task = React.memo(({task, todolistId, ...props}: TaskPropsType) => {
   const {updateTaskTC, removeTaskTC} = useActions(tasksActions)

   const onClickRemoveTaskHandler = useCallback(() => removeTaskTC({todolistId: todolistId, taskId: task.id}),
      [task.id, todolistId])

   const onChangeHandler = useCallback((changeItem: boolean) => {
      updateTaskTC({
         todolistId: todolistId,
         taskId: task.id,
         model: {status: changeItem ? TaskStatuses.Completed : TaskStatuses.New},
      })
   }, [task.id, todolistId])

   const onTitleChangeHandler = useCallback((newTitle: string) => {
      updateTaskTC({
         todolistId: todolistId,
         taskId: task.id,
         model: {title: newTitle},
      })
   }, [task.id, todolistId])

   return (
      <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
         {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         {/*<Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         <UniversalCheckBox callBack={onChangeHandler}
                            checked={task.status === TaskStatuses.Completed}
         />
         <EditableSpan title={task.title}
                       onChange={onTitleChangeHandler}

         />
         {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

         <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
            <DeleteIcon />
         </IconButton>
      </div>
   )
})
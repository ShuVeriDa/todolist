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
   todoListID: string
}

export const Task = React.memo(({task, todoListID, ...props}: TaskPropsType) => {
   const {updateTaskTC, removeTaskTC} = useActions(tasksActions)

   const onClickRemoveTaskHandler = useCallback(() => removeTaskTC({taskId: task.id, todolistId: todoListID}),
      [task.id, todoListID])

   const onChangeHandler = useCallback((changeItem: boolean) => {
      updateTaskTC({
         taskId: task.id,
         model: {status: changeItem ? TaskStatuses.Completed : TaskStatuses.New},
         todolistId: todoListID
      })
   }, [task.id, todoListID])

   const onTitleChangeHandler = useCallback((newValue: string) => {
      updateTaskTC({
         taskId: task.id,
         model: {title: newValue},
         todolistId: todoListID
      })
   }, [task.id, todoListID])

   return (
      <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
         {/*<input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         {/*<Checkbox  checked={t.isDone} onChange={(e) => props.changeStatus(props.todoListID, t.id, e.currentTarget.checked)}/>*/}
         <UniversalCheckBox callBack={onChangeHandler}
                            checked={task.status === TaskStatuses.Completed}
         />
         <EditableSpan title={task.title}
                       onChange={(newTitle: string) => onTitleChangeHandler(newTitle)}

         />
         {/*<ButtonTodoList title={'x'} onClickHandler={onClickRemoveTask}/>*/}

         <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
            <DeleteIcon />
         </IconButton>
      </div>
   )
})
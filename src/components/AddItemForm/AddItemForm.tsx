import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {RequestStatusType} from "../../features/Application/application-reducer";

type AddItemFormPropsType = {
   callBack: (title: string) => void
   entityStatus?: RequestStatusType
   // disabled: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({...props}) => {
   console.log('AddItemForm called')
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const addNewTask = () => {
      if (title.trim() !== '') {
         props.callBack(title.trim())
         setTitle('')
      } else {
         setError('Error is required')
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.key === "Enter") {
         addNewTask()
      }
   }

   return (
      <div>
         {/*<input*/}
         {/*   className={error ? 'error' : ''}*/}
         {/*   value={title}*/}
         {/*   onChange={onChangeHandler}*/}
         {/*   onKeyPress={onKeyPressHandler}*/}
         {/*/>*/}

         <TextField id="standard-basic"
                    error={!!error}
                    label='Outlined'
                    variant="outlined"
                    size='small'
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    disabled={props.entityStatus === 'loading'}
                  // disabled={true}
         />

         {/*<ButtonTodoList title={"+"}*/}
         {/*                onClickHandler={addNewTask}*/}
         {/*                size='small'*/}
         {/*                variant="contained"*/}
         {/*/>*/}
         <Button onClick={addNewTask} size="small" variant="contained">+</Button>
         {error && <div className='error_message'>{error}</div>}
      </div>
   );
});
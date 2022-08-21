import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {RequestStatusType} from "../../features/Application/application-reducer";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}
type AddItemFormPropsType = {
   addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
   entityStatus?: RequestStatusType
   // disabled: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({addItem, entityStatus, ...props}) => {
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = async () => {
      if (title.trim() !== '') {
         addItem(title, {setError, setTitle})
      } else {
         setError('Title is required')
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
         addItemHandler()
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
                    disabled={entityStatus === 'loading'}
                  // disabled={true}
         />

         {/*<ButtonTodoList title={"+"}*/}
         {/*                onClickHandler={addNewTask}*/}
         {/*                size='small'*/}
         {/*                variant="contained"*/}
         {/*/>*/}
         <Button onClick={addItemHandler} size="small" variant="contained">+</Button>
         {error && <div className='error_message'>{error}</div>}
      </div>
   );
});
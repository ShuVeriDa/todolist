import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsSpan = {
   title: string
   callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsSpan) => {
   const [newTitle, setNewTitle] = useState(props.title)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
   }

   const [edit, setEdit] = useState(false)
   const turnOnHandler = () => setEdit(true)
   const turnOffHandler = () => {
      setEdit(false)
      props.callBack(newTitle)
   }

   return (
         edit
            // ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={turnOffHandler}/>
            ? <TextField value={newTitle} onChange={onChangeHandler} autoFocus onBlur={turnOffHandler} id={"standard-basic"} label={"Standard"} variant={"standard"} />
            : <span onDoubleClick={turnOnHandler}>{props.title}</span>

   );
};

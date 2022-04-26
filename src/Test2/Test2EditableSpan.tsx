import React, {ChangeEvent, useState} from "react";

type Test2EditableSpanType = {
   title: string
   callBack: (newTitle: string) => void
}

export const Test2EditableSpan = (props: Test2EditableSpanType) => {
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
            ?  <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={turnOffHandler}/>
            : <span onDoubleClick={turnOnHandler}>{props.title}</span>
   );
};

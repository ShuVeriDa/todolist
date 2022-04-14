import React, {ChangeEvent, useState} from "react";

export type TuesdayEditableSpanPropsType = {
   title: string
   callBack: (newTitle: string) => void
}

export const TuesdayEditableSpan: React.FC<TuesdayEditableSpanPropsType> = ({title, ...props}) => {
   const [newTitle, setNewTitle] = useState(title)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
   }

   const [edit, setEdit] = useState(false)
   const turnOnHandler = () => {
      setEdit(true)
   }
   const turnOffHandler = () => {
      setEdit(false)
      props.callBack(newTitle)
   }

   return (
      <div>
         {
            edit
               ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={turnOffHandler}/>
               : <span onDoubleClick={turnOnHandler}>{title}</span>
         }
      </div>
   );
};
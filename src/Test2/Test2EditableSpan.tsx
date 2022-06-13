import {ChangeEvent, FC, useState} from "react";

type Test2EditableSpanType = {
   title: string
   callBack: (newTitle: string) => void
}

export const Test2EditableSpan: FC<Test2EditableSpanType> = (
   {
      title, callBack,
      ...props
   }
) => {
   const [newTitle, setNewTitle] = useState(title)
   const [edit, setEdit] = useState(false)

   const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
   }

   const turnOnHandler = () => setEdit(true)
   const turnOffHandler = () => {
      setEdit(false)
      callBack(newTitle)
   }

   return (
            edit
               ? <input value={newTitle}
                        onChange={onChangeHandler}
                        autoFocus
                        onBlur={turnOffHandler}
               />
               : <span onDoubleClick={turnOnHandler}>{title}</span>
   );
};

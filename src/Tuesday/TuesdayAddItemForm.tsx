import {TuesdayInput} from "./TuesdayInput";
import {TuesadayButton} from "./TuesadayButton";
import classes from "./Tuesday.module.css";
import {FC, useState} from "react";

export type TuesdayAddItemFormPropsType = {
   callBack: (title: string) => void
}

export const TuesdayAddItemForm: FC<TuesdayAddItemFormPropsType> = ({callBack, ...props}) => {
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const newTask = () => {
      if (title.trim() !== "") {
         callBack(title.trim())
         setTitle("")
      } else {
         setError('Title is required')
      }
   }

   return (
      <div>
         <TuesdayInput valueTitle={title} setTitle={setTitle} callBack={newTask} error={error} setError={setError}/>
         <TuesadayButton title={"+"} callback={newTask}/>
         {error && <div className={classes.error_message}>{error}</div>}
      </div>
   )
}

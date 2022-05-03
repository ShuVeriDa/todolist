import {WednesdayInput} from "./WednesdayInput";
import {WednesdayButton} from "./WednesdayButton";
import classes from "./Wednesday.module.css";
import {FC, useState} from "react";

export type WednesdayAddItemFormPropsType = {
   callBack: (title: string) => void
}

export const WednesdayAddItemForm: FC<WednesdayAddItemFormPropsType> = ({callBack, ...props}) => {
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
         <WednesdayInput valueTitle={title} setTitle={setTitle} callBack={newTask} error={error} setError={setError}/>
         <WednesdayButton title={"+"} callback={newTask}/>
         {error && <div className={classes.error_message}>{error}</div>}
      </div>
   )
}

import {useState} from "react";
import {TestInput2} from "./TestInput2";
import {TestButton2} from "./TestButton2";
import classes from "./Test2.module.css";

export type Test2AddItemFormPropsType = {
   callBack: ( newTitle: string) => void
}

export const Test2AddItemForm = (props: Test2AddItemFormPropsType) => {
   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const newTask = () => {
      if (title.trim() !== "") {
         props.callBack(title.trim())
         setTitle("")
      } else {
         setError('Title is required')
      }
   }
   return (
      <div>
         <>
            <TestInput2 titleNew={title} callBack={newTask} setTitleNew={setTitle} error={error} setError={setError} />
            <TestButton2 title={'+'} callBack={newTask}/>
            {error && <div className={classes.error_message}>{error}</div>}
         </>
      </div>
   );
};
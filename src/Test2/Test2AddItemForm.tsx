import {TestButton2} from "./TestButton2";
import {TestInput2} from "./TestInput2";
import {useState} from "react";
import classes from './Test2.module.css'

type Test2AddItemFormType = {
   callBack: (title: string) => void
}

export const Test2AddItemForm: React.FC<Test2AddItemFormType> = ({callBack, ...props}) => {
   const [title, setTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const addTaskHandler = () => {
      if (title.trim() !== '') {
         callBack(title.trim())
         setTitle('')
      } else {
         setError('title is required')
      }

   }
   return (
      <div>
         <TestInput2 title={title} callBack={addTaskHandler} setTitle={setTitle} setError={setError}/>
         <TestButton2 title={'+'} callBack={addTaskHandler}/>
         {error && <div className={classes.error}>{error}</div> }
      </div>
   );
};

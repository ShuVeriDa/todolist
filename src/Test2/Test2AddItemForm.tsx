import {TestButton2} from "./TestButton2";
import {TestInput2} from "./TestInput2";
import {ChangeEvent, KeyboardEvent, FC, useState} from "react";

type Test2AddItemFormPropsType = {
   callBack: (title: string) => void
}

export const Test2AddItemForm: FC<Test2AddItemFormPropsType> = ({callBack, ...props}) => {
   console.log('Test2AddItemForm called')

   const [title, setTitle] = useState<string>("")
   const [error, setError] = useState<string | null>(null)

   const addNewTask = () => {
      if (title.trim() !== '') {
         callBack(title.trim())
         setTitle('')
      } else {
         setError('Title is required')
      }
   }

   return (
      <div>
         <TestInput2 title={title}
                     setTitle={setTitle}
                     callBack={addNewTask}
                     error={error}
                     setError={setError}
         />
         <TestButton2 title={'+'}
                      callBack={addNewTask}/>
         {error && <div>{error}</div>}
      </div>
   );
};

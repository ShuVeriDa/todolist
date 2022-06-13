import {FC} from "react";
import {Test2EditableSpan} from "./Test2EditableSpan";
import {TestButton2} from "./TestButton2";

type TestTodoListHeader2Type = {
   title: string
   callBack: (todolistID: string) => void
   todolistID: string
   collapsedTasks: () => void
   changeTodolistTitle: (todolistID: string, title: string) => void
}

export const TestTodoListHeader2: FC<TestTodoListHeader2Type> = (
   {
      todolistID, title, callBack, collapsedTasks,
      changeTodolistTitle,
      ...props
   }

   ) => {

   const removeTodolistHandler = () => {
      callBack(todolistID)
   }

   const collapsedHandler = () => {
      collapsedTasks()
   }

   const editableSpanForH3Handler = (newTitle: string) => {
      changeTodolistTitle(todolistID, newTitle)
   }

   return (<div onClick={collapsedHandler}>
         <Test2EditableSpan title={title} callBack={editableSpanForH3Handler}/>
         <TestButton2 title={'x'} callBack={removeTodolistHandler}/>
      </div>
   );
};

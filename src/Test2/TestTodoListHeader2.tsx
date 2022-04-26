import {TestButton2} from "./TestButton2";
import {Test2EditableSpan} from "./Test2EditableSpan";

type TestTodoListHeader2Type = {
   title: string
   todolistID: string
   removeTodolist: (todolistID: string) => void
   updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const TestTodoListHeader2 = (props: TestTodoListHeader2Type) => {
   const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
   }

   const updateTodolistTitleHandler = (newTitle: string) => {
      props.updateTodolistTitle(props.todolistID, newTitle)
   }
   return (
      <h3>
         <Test2EditableSpan title={props.title} callBack={updateTodolistTitleHandler} />
         <TestButton2 title={"x"} callBack={removeTodolistHandler} />
      </h3>
   );
};

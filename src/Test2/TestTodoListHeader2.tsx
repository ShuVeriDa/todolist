import todoList from "../components/TodoList";
import {TestButton2} from "./TestButton2";

type TestTodoListHeader2PropsType = {
   title: string
   callBack: (todoListID: string) => void
   todoListID: string
}

export const TestTodoListHeader2 = (props: TestTodoListHeader2PropsType) => {
   const callBack = () => {
      props.callBack(props.todoListID)
   }

   return (
     <>
         <h3>
            {props.title}
            <TestButton2 title={"x"} callBack={callBack} />
         </h3>

     </>
   )
}
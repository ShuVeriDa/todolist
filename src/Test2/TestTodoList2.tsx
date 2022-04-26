import React from 'react';
import {TestTaskList2} from "./TestTaskList2";
import {Test2FilterValuesType, Test2TaskObjectType, Test2TaskType} from "./Test2";
import {TestButton2} from "./TestButton2";
import {Test2AddItemForm} from "./Test2AddItemForm";
import {TestTodoListHeader2} from "./TestTodoListHeader2";

export type TestTodoList2Type = {
   todoListID: string
   tasks: Test2TaskType[]
   filter: Test2FilterValuesType
   removeTask: (todoListID: string, taskID: string) => void
   addTask: (todoListID: string, taskTitle: string) => void
   changeFilter: (todoListID: string, filter: Test2FilterValuesType) => void
   changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
   addTodoList: (todolistID: string, newTitle: string) => void
   todolistTitle: string
   removeTodolist: (todolistID: string) => void
   updateTaskHandler: (todolistID: string, taskID: string, newTitle: string) => void
   updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const TestTodolist2:React.FC<TestTodoList2Type> = ({todoListID, tasks, ...props}) => {
   const addTaskHandler = (title: string) => {
      props.addTask(todoListID, title)
   }

   const changeFilterHandler = (filter: Test2FilterValuesType) => {
      props.changeFilter(todoListID, filter)
   }

   return (
      <div>
         <>
            <TestTodoListHeader2 title={props.todolistTitle}
                                 todolistID={todoListID}
                                 removeTodolist={props.removeTodolist}
                                 updateTodolistTitle={props.updateTodolistTitle}
            />
            <Test2AddItemForm callBack={addTaskHandler} />
         </>
         <>
            <TestTaskList2
               changeStatus={props.changeStatus}
               todoListID={todoListID}
               tasks={tasks}
               filter={props.filter}
               removeTask={props.removeTask}
               updateTaskHandler={props.updateTaskHandler}
            />
         </>
         <div>
            <TestButton2 title={'All'} callBack={() =>changeFilterHandler('all')} />
            <TestButton2 title={'Active'} callBack={() => changeFilterHandler('active')} />
            <TestButton2 title={'Completed'} callBack={() => changeFilterHandler('completed')} />
         </div>
      </div>
   );
};
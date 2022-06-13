import {FC, useCallback, useState} from "react";
import {Test2FilterValuesType, Test2TaskType} from "./Test2";
import {TestTodoListHeader2} from "./TestTodoListHeader2";
import {Test2AddItemForm} from "./Test2AddItemForm";
import {TestButton2} from "./TestButton2";
import {TestTaskList2} from "./TestTaskList2";

type TestTodoList2Type = {
   todolistID: string
   title: string
   tasks: Test2TaskType[]
   addTask: (todolistID: string, title: string) => void
   filter: Test2FilterValuesType
   removeTodolist: (todolistID: string) => void
   removeTask: (todolistID: string, taskID: string) => void
   changeTaskStatus: (todolistID: string, taskID: string, isDoneValue: boolean) => void
   changeFilter: (todolistID: string, filter: Test2FilterValuesType) => void
   changeTodolistTitle: (todoListID: string, title: string) => void
   changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
}

export const TestTodolist2: FC<TestTodoList2Type> = (
   {
      title, todolistID, tasks, addTask,
      filter, removeTodolist, removeTask, changeTaskStatus,
      changeFilter, changeTodolistTitle, changeTaskTitle,
      ...props
   }
   ) => {

   const [collapsed, setCollapsed] = useState<boolean>(true)
   const collapsedTasks = (b: boolean) => {
      setCollapsed(b)
   }

   const addTaskHandler = useCallback((newTitle: string) => {
      addTask(todolistID, newTitle)
   }, [addTask, todolistID])

   const onAllClickHandler = useCallback(() => changeFilter(todolistID, 'all'), [])
   const onActiveClickHandler = useCallback(() => changeFilter(todolistID, 'active'), [])
   const onCompletedClickHandler = useCallback(() => changeFilter(todolistID, 'completed'), [])

   return (
      <div>
         <TestTodoListHeader2 title={title}
                              collapsedTasks={() => collapsedTasks(!collapsed)}
                              callBack={removeTodolist}
                              todolistID={todolistID}
                              changeTodolistTitle={changeTodolistTitle}
         />
         {collapsed && <div>
             <Test2AddItemForm callBack={addTaskHandler} />
             <TestTaskList2 todolistID={todolistID}
                            tasks={tasks}
                            filter={filter}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
             />
             <>
                 <TestButton2 btnClass={filter === 'all' ? 'btn-active' : ''}
                              title={'All'}
                              callBack={onAllClickHandler}
                 />
                 <TestButton2 btnClass={filter === 'active' ? 'btn-active' : ''}
                              title={'Active'}
                              callBack={onActiveClickHandler}
                 />
                 <TestButton2 btnClass={filter === "completed" ? "btn-active" : ''}
                              title={'Completed'}
                              callBack={onCompletedClickHandler}
                 />
             </>
         </div>}

      </div>
   );
};